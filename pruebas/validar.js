/* ============================================================
   validar.js — Revisa el banco curricular y los cálculos
   Uso: node pruebas/validar.js
   Ejecútelo después de agregar o editar una competencia.
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "..");
const archivos = fs.readdirSync(path.join(raiz, "datos"))
  .sort((a, b) => (a === "catalogos.js" ? -1 : b === "catalogos.js" ? 1 : a.localeCompare(b)))
  .map((a) => path.join("datos", a))
  .concat(["js/nucleo.js", "js/instrumento.js", "js/documento.js"]);

const contexto = vm.createContext({});
archivos.forEach((a) => {
  vm.runInContext(fs.readFileSync(path.join(raiz, a), "utf8"), contexto, { filename: a });
});
const { COMPETENCIAS, NIVELES, LOGRO_COMPETENCIA, Nucleo, Instrumento, Documento } =
  vm.runInContext("({ COMPETENCIAS, NIVELES, LOGRO_COMPETENCIA, Nucleo, Instrumento, Documento })", contexto);

const MINUTOS_DEL_PLAN = 80;
const INSTRUMENTOS = ["Lista de cotejo", "Escala de rango", "Rúbrica", "Bitácora de laboratorio"];
const errores = [];
const exigir = (condicion, mensaje) => { if (!condicion) errores.push(mensaje); };
const lleno = (t) => typeof t === "string" && t.trim() !== "";
const clonar = (o) => JSON.parse(JSON.stringify(o));
const suma = (l) => l.reduce((a, b) => a + b, 0);

/* ---------- Banco curricular ---------- */
function validarIndicador(ind) {
  const c = ind.code;
  ["texto", "tema", "proposito", "apoyo", "reto", "siFalta", "siSobra"].forEach((k) =>
    exigir(lleno(ind[k]), `${c}: falta "${k}"`));
  ["recursos", "preparacion", "conceptos", "dificultades", "criterios"].forEach((k) =>
    exigir(Array.isArray(ind[k]) && ind[k].length > 0, `${c}: "${k}" está vacío`));
  exigir(INSTRUMENTOS.includes(ind.evaluacion.instrumento), `${c}: instrumento desconocido`);

  const pasos = Nucleo.pasosDe(ind);
  const minutos = suma(pasos.map((p) => p.min));
  exigir(minutos === MINUTOS_DEL_PLAN, `${c}: los pasos suman ${minutos} min`);

  const ids = ind.criterios.map((k) => k.id);
  exigir(new Set(ids).size === ids.length, `${c}: hay criterios con id repetido`);

  pasos.forEach((p) => {
    ["titulo", "docente", "estudiantes", "verifique"].forEach((k) =>
      exigir(lleno(p[k]), `${c} "${p.titulo}": falta "${k}"`));
    exigir(lleno(p.diga) || lleno(p.pregunte), `${c} "${p.titulo}": sin guion ni pregunta`);
    exigir(!lleno(p.pregunte) || lleno(p.espere), `${c} "${p.titulo}": pregunta sin respuesta esperada`);
    (p.evalua || []).forEach((id) =>
      exigir(ids.includes(id), `${c} "${p.titulo}": criterio inexistente ${id}`));
  });

  const codigos = ind.saberes.map((s) => s.code);
  ind.criterios.forEach((k) => {
    exigir(codigos.includes(k.saber), `${c} ${k.id}: saber inexistente ${k.saber}`);
    exigir(lleno(k.texto) && lleno(k.evidencia), `${c} ${k.id}: falta texto o evidencia`);
    exigir(k.niveles.length === NIVELES.length && k.niveles.every(lleno), `${c} ${k.id}: niveles incompletos`);
    exigir(pasos.some((p) => (p.evalua || []).includes(k.id)), `${c} ${k.id}: ningún paso lo observa`);
  });
  exigir(Nucleo.saberesSinCriterio(ind, codigos).length === 0, `${c}: hay saberes sin criterio`);
}

/* ---------- Cálculos ---------- */
function validarCalculos() {
  const r = Nucleo.repartir;
  exigir(suma(r(80, [10, 5, 12, 13, 20, 5, 10, 5])) === 80, "repartir: no conserva el total");
  exigir(suma(r(45, [10, 5, 12, 13, 20, 5, 10, 5], 1, 1)) === 45, "repartir: no conserva 45 min");
  exigir(r(40, [1, 79], 1, 1)[0] === 1, "repartir: no respeta el mínimo");
  exigir(suma(r(7, [2, 3, 3, 2], 0.5)) === 7, "repartir: no conserva puntos con medios");
  exigir(r(10, [2, 3, 3, 2], 0.5).join() === "2,3,3,2", "repartir: reparto de 10 puntos");
  exigir(r(10, [0, 0]).join() === "5,5", "repartir: pesos en cero");
  exigir(r(10, []).length === 0, "repartir: lista vacía");

  const ind = COMPETENCIAS[0].indicadores[0];
  const plan = clonar(ind);
  const original = Nucleo.pasosDe(plan).map((p) => p.min).join();
  Nucleo.fijarPesos(plan);
  Nucleo.ajustarTiempos(plan, 40);
  Nucleo.ajustarTiempos(plan, 120);
  Nucleo.ajustarTiempos(plan, 80);
  exigir(Nucleo.pasosDe(plan).map((p) => p.min).join() === original,
    "ajustarTiempos: subir y bajar periodos altera los minutos");

  const tiempo = Nucleo.cronograma(plan);
  exigir(tiempo[2].hasta === 80 && tiempo[1].desde === tiempo[0].hasta, "cronograma: tramos no contiguos");

  const parcial = Nucleo.criteriosActivos(plan, ["1.1.2"], 10);
  exigir(parcial.length === 2 && suma(parcial.map((c) => c.puntos)) === 10,
    "criteriosActivos: al desmarcar saberes no reparte el total");
  exigir(parcial[0].etiqueta === "C1", "criteriosActivos: etiquetas no reinician");
  exigir(parcial.every((c) => c.actividades.length && c.actividades.every((a) => a.momento)),
    "criteriosActivos: falta la actividad o el momento donde se observa");

  const niveles = Nucleo.nivelesDeLogro(10, LOGRO_COMPETENCIA);
  exigir(niveles.map((n) => n.rango).join("|") === "9 a 10|7 a menos de 9|5 a menos de 7|menos de 5",
    "nivelesDeLogro: rangos de 10 puntos incorrectos");
  exigir(niveles.filter((n) => n.lograda).pop().puntosDesde === 7, "nivelesDeLogro: mínimo para lograr");
}

/* ---------- Documento e instrumento ---------- */
function validarRender(comp, ind) {
  const plan = clonar(ind);
  plan.codigo = plan.codigo || [];
  Nucleo.fijarPesos(plan);
  const codigos = ind.saberes.map((s) => s.code);
  const criterios = Nucleo.criteriosActivos(plan, codigos, 10);
  exigir(suma(criterios.map((c) => c.puntos)) === 10, `${ind.code}: los criterios no suman 10`);

  INSTRUMENTOS.forEach((instrumento) => {
    const base = { tipo: "Formativa", tecnica: "Observación", instrumento, total: 10, criterios };
    const html = Instrumento.html({
      ...base, saberes: ind.saberes, competencia: comp, indicador: ind, tema: plan.tema, curso: "Robótica",
      establecimiento: "Centro", docente: "", grado: "", fecha: "", estudiantes: "3", cuadro: true
    });
    criterios.forEach((c) => exigir(html.includes(c.etiqueta), `${ind.code}: falta ${c.etiqueta} en ${instrumento}`));
    exigir(!/undefined|NaN|null/.test(html), `${ind.code}: valor vacío en ${instrumento}`);
    exigir(html.includes("Logro de la competencia") && html.includes(comp.texto),
      `${ind.code}: ${instrumento} no concluye sobre la competencia`);
    ["Lo que sabe", "Lo que hace", "Cómo actúa"].forEach((g) =>
      exigir(html.includes(g), `${ind.code}: ${instrumento} sin el grupo ${g}`));

    const datos = { establecimiento: "Centro", docente: "", fecha: "", curso: "Robótica", duracion: "", contexto: "" };
    const doc = Documento.html({
      ...base, datos, competencia: comp, indicador: ind, saberes: ind.saberes, plan, tiempo: Nucleo.cronograma(plan)
    });
    exigir(!/undefined|NaN/.test(doc), `${ind.code}: valor vacío en el documento`);
    ["1.</span> Datos generales", "2.</span> Competencias", "3.</span> Recursos", "4.</span> Desarrollo",
     "5.</span> Anotación", "Evaluación:", "Ideas clave"].forEach((t) =>
      exigir(doc.includes(t), `${ind.code}: el documento no tiene "${t}"`));
  });
}

COMPETENCIAS.forEach((comp) => comp.indicadores.forEach((ind) => {
  validarIndicador(ind);
  validarRender(comp, ind);
}));
validarCalculos();

const indicadores = suma(COMPETENCIAS.map((c) => c.indicadores.length));
if (errores.length) {
  console.error(`${errores.length} problema(s):\n- ` + errores.join("\n- "));
  process.exit(1);
}
console.log(`Correcto: ${COMPETENCIAS.length} competencias y ${indicadores} indicadores validados.`);

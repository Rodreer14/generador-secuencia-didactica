/* ============================================================
   app.js — Lógica del generador de secuencias didácticas
   ============================================================ */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const VACIO = '<span class="vacio">Sin especificar</span>';

  /* ---------- Referencias ---------- */
  const el = {
    establecimiento: $("establecimiento"), docente: $("docente"),
    grado: $("grado"), seccion: $("seccion"), fecha: $("fecha"),
    periodos: $("periodos"), estudiantes: $("estudiantes"), modalidad: $("modalidad"),

    departamento: $("departamento"), municipio: $("municipio"), area: $("area"),
    idioma: $("idioma"), idiomaMaterno: $("idioma-materno"),
    enfoqueLing: $("enfoque-ling"), contexto: $("contexto"),
    hintIdiomas: $("hint-idiomas"),

    competencia: $("competencia"), indicador: $("indicador"), saberes: $("saberes"),
    btnTodos: $("btn-todos-saberes"),

    actInicio: $("act-inicio"), actDesarrollo: $("act-desarrollo"), actCierre: $("act-cierre"),
    minInicio: $("min-inicio"), minDesarrollo: $("min-desarrollo"), minCierre: $("min-cierre"),
    recursos: $("recursos"),

    evalTipo: $("eval-tipo"), evalTecnica: $("eval-tecnica"),
    evalInstrumento: $("eval-instrumento"), evalPunteo: $("eval-punteo"),
    evalCriterios: $("eval-criterios"),

    btnPdf: $("btn-pdf"), btnLimpiar: $("btn-limpiar"),
    btnSugerirCtx: $("btn-sugerir-ctx"),
    aviso: $("aviso")
  };

  /* ---------- Utilidades ---------- */
  function escapar(txt) {
    return String(txt).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function valor(input) {
    const v = (input.value || "").trim();
    return v === "" ? null : v;
  }

  function pintar(nodo, texto) {
    nodo.innerHTML = texto ? escapar(texto) : VACIO;
  }

  let avisoTimer = null;
  function avisar(mensaje) {
    el.aviso.textContent = mensaje;
    el.aviso.hidden = false;
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => { el.aviso.hidden = true; }, 4200);
  }

  function fechaLarga(iso) {
    if (!iso) return null;
    const partes = iso.split("-");
    if (partes.length !== 3) return iso;
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mes = meses[Number(partes[1]) - 1] || partes[1];
    return `${Number(partes[2])} de ${mes} de ${partes[0]}`;
  }

  /* ---------- Poblar catálogos ---------- */
  function poblarSelect(select, items, placeholder) {
    select.innerHTML = "";
    const base = document.createElement("option");
    base.value = "";
    base.textContent = placeholder;
    select.appendChild(base);
    items.forEach((item) => {
      const o = document.createElement("option");
      o.value = item;
      o.textContent = item;
      select.appendChild(o);
    });
  }

  poblarSelect(el.departamento, DEPARTAMENTOS, "Seleccione…");
  poblarSelect(el.idioma, IDIOMAS, "Seleccione…");
  poblarSelect(el.idiomaMaterno, IDIOMAS, "Seleccione…");

  COMPETENCIAS.forEach((c) => {
    const o = document.createElement("option");
    o.value = String(c.num);
    o.textContent = `${c.num}. ${c.eje}`;
    el.competencia.appendChild(o);
  });

  /* ---------- Contexto lingüístico por departamento ---------- */
  el.departamento.addEventListener("change", () => {
    const depto = el.departamento.value;
    const sugeridos = IDIOMAS_POR_DEPTO[depto] || [];

    if (!depto) {
      el.hintIdiomas.hidden = true;
      return;
    }
    if (sugeridos.length === 0) {
      el.hintIdiomas.textContent =
        `En ${depto} no se registra una comunidad lingüística indígena predominante. Verifique la realidad de su centro educativo.`;
    } else {
      el.hintIdiomas.textContent =
        `Comunidades lingüísticas con presencia en ${depto}: ${sugeridos.join(", ")}. Confirme cuál corresponde a su población estudiantil.`;
    }
    el.hintIdiomas.hidden = false;
    actualizar();
  });

  /* ---------- Sugerir texto de contextualización ---------- */
  el.btnSugerirCtx.addEventListener("click", () => {
    const depto = el.departamento.value;
    const muni = valor(el.municipio);
    const area = el.area.value.toLowerCase();
    const idioma = el.idioma.value;

    if (!depto) {
      avisar("Seleccione primero el departamento.");
      el.departamento.focus();
      return;
    }
    const lugar = muni ? `${muni}, ${depto}` : depto;
    let texto = `La clase se desarrolla en un centro educativo del área ${area} de ${lugar}. `;
    texto += `Las actividades se adaptan a los materiales disponibles en el establecimiento y se vinculan con necesidades observables en la comunidad, de modo que el prototipo responda a una situación real del entorno. `;
    if (idioma && idioma !== "Español") {
      texto += `La mediación se realiza en ${idioma}, y los términos técnicos se trabajan en ambos idiomas para asegurar la comprensión sin perder la precisión del vocabulario especializado.`;
    } else {
      texto += `El vocabulario técnico se introduce de forma gradual, partiendo de los términos que los estudiantes ya utilizan en su vida cotidiana.`;
    }
    el.contexto.value = texto;
    actualizar();
  });

  /* ---------- Selección de competencia ---------- */
  function competenciaActual() {
    const num = Number(el.competencia.value);
    return COMPETENCIAS.find((c) => c.num === num) || null;
  }

  function indicadorActual() {
    const comp = competenciaActual();
    if (!comp) return null;
    return comp.indicadores.find((i) => i.code === el.indicador.value) || null;
  }

  el.competencia.addEventListener("change", () => {
    const comp = competenciaActual();
    el.indicador.innerHTML = "";

    if (!comp) {
      el.indicador.disabled = true;
      el.indicador.innerHTML = '<option value="">Primero elija una competencia</option>';
      renderSaberes(null);
      actualizar();
      return;
    }
    el.indicador.disabled = false;
    const base = document.createElement("option");
    base.value = "";
    base.textContent = "Seleccione un indicador…";
    el.indicador.appendChild(base);

    comp.indicadores.forEach((ind) => {
      const o = document.createElement("option");
      o.value = ind.code;
      o.textContent = `${ind.code} ${ind.texto}`;
      el.indicador.appendChild(o);
    });
    renderSaberes(null);
    actualizar();
  });

  /* ---------- Selección de indicador ---------- */
  el.indicador.addEventListener("change", () => {
    const ind = indicadorActual();
    renderSaberes(ind);
    if (ind) precargarClase(ind);
    actualizar();
  });

  function renderSaberes(ind) {
    el.saberes.innerHTML = "";
    if (!ind) {
      el.saberes.innerHTML = '<p class="empty">Elija un indicador de logro para ver sus saberes.</p>';
      el.btnTodos.hidden = true;
      return;
    }
    el.btnTodos.hidden = false;
    ind.saberes.forEach((s) => {
      const label = document.createElement("label");
      label.className = "saber";
      label.innerHTML =
        `<input type="checkbox" value="${escapar(s.code)}" checked>` +
        `<span class="saber-code">${escapar(s.code)}</span>` +
        `<span>${escapar(s.texto)}<span class="saber-tipo">${escapar(s.tipo)}</span></span>`;
      label.querySelector("input").addEventListener("change", actualizar);
      el.saberes.appendChild(label);
    });
  }

  el.btnTodos.addEventListener("click", () => {
    const cajas = el.saberes.querySelectorAll("input[type=checkbox]");
    const faltan = Array.from(cajas).some((c) => !c.checked);
    cajas.forEach((c) => { c.checked = faltan; });
    actualizar();
  });

  /* ---------- Precarga de actividades sugeridas ---------- */
  function precargarClase(ind) {
    const sinTocar = (campo) => campo.value.trim() === "" || campo.dataset.auto === "1";
    const poner = (campo, texto) => {
      if (sinTocar(campo)) {
        campo.value = texto;
        campo.dataset.auto = "1";
      }
    };
    poner(el.actInicio, ind.inicio);
    poner(el.actDesarrollo, ind.desarrollo);
    poner(el.actCierre, ind.cierre);
    poner(el.recursos, ind.recursos);
    poner(el.evalCriterios, ind.criterios);
  }

  // Si el docente edita un campo autocompletado, deja de sobrescribirse
  [el.actInicio, el.actDesarrollo, el.actCierre, el.recursos, el.evalCriterios]
    .forEach((campo) => {
      campo.addEventListener("input", () => { campo.dataset.auto = "0"; });
    });

  /* ---------- Saberes seleccionados ---------- */
  function saberesSeleccionados() {
    const ind = indicadorActual();
    if (!ind) return [];
    const marcados = Array.from(el.saberes.querySelectorAll("input:checked"))
      .map((c) => c.value);
    return ind.saberes.filter((s) => marcados.includes(s.code));
  }

  /* ---------- Render del documento ---------- */
  function actualizar() {
    // I. Datos generales
    pintar($("d-establecimiento"), valor(el.establecimiento) || "Establecimiento educativo");
    pintar($("d-docente"), valor(el.docente));
    pintar($("d-fecha"), fechaLarga(valor(el.fecha)));

    const grado = valor(el.grado) || GRADO_BASE;
    const seccion = valor(el.seccion);
    pintar($("d-grado"), seccion ? `${grado}, sección ${seccion}` : grado);

    const per = valor(el.periodos);
    pintar($("d-periodos"), per ? (per === "1" ? "1 periodo" : `${per} periodos`) : null);
    pintar($("d-estudiantes"), valor(el.estudiantes));
    pintar($("d-modalidad"), el.modalidad.value);

    // II. Contexto
    pintar($("d-departamento"), valor(el.departamento));
    pintar($("d-municipio"), valor(el.municipio));
    pintar($("d-area"), el.area.value);
    pintar($("d-enfoque"), el.enfoqueLing.value);
    pintar($("d-idioma"), valor(el.idioma));
    pintar($("d-idioma-materno"), valor(el.idiomaMaterno));
    pintar($("d-contexto"), valor(el.contexto));

    // III. Competencia, indicador y saberes
    const comp = competenciaActual();
    const ind = indicadorActual();

    $("d-competencia").innerHTML = comp
      ? `<span class="comp-num">Competencia ${comp.num}</span>${escapar(comp.texto)}`
      : VACIO;

    $("d-indicador").innerHTML = ind
      ? `<span class="comp-num">Indicador ${escapar(ind.code)}</span>${escapar(ind.texto)}`
      : VACIO;

    const saberes = saberesSeleccionados();
    $("d-saberes").innerHTML = saberes.length
      ? saberes.map((s) =>
          `<span class="saber-doc"><code>${escapar(s.code)}</code> ${escapar(s.texto)} <em>(${escapar(s.tipo.toLowerCase())})</em></span>`
        ).join("")
      : VACIO;

    // IV. Desarrollo
    pintar($("d-inicio"), valor(el.actInicio));
    pintar($("d-desarrollo"), valor(el.actDesarrollo));
    pintar($("d-cierre"), valor(el.actCierre));
    pintar($("d-recursos"), valor(el.recursos));

    const min = (campo) => {
      const v = valor(campo);
      return v ? `${v} min` : "—";
    };
    $("d-min-inicio").textContent = min(el.minInicio);
    $("d-min-desarrollo").textContent = min(el.minDesarrollo);
    $("d-min-cierre").textContent = min(el.minCierre);

    // V. Evaluación
    pintar($("d-eval-tipo"), el.evalTipo.value);
    pintar($("d-eval-tecnica"), el.evalTecnica.value);
    pintar($("d-eval-instrumento"), el.evalInstrumento.value);
    pintar($("d-eval-punteo"), valor(el.evalPunteo));
    pintar($("d-eval-criterios"), valor(el.evalCriterios));
  }

  /* ---------- Generar PDF ---------- */
  el.btnPdf.addEventListener("click", () => {
    const faltantes = [];
    if (!competenciaActual()) faltantes.push("la competencia");
    if (!indicadorActual()) faltantes.push("el indicador de logro");
    if (indicadorActual() && saberesSeleccionados().length === 0) faltantes.push("al menos un saber");
    if (!valor(el.departamento)) faltantes.push("el departamento");
    if (!valor(el.idioma)) faltantes.push("el idioma de instrucción");

    if (faltantes.length) {
      avisar("Falta seleccionar " + faltantes.join(", ") + ".");
      return;
    }
    const titulo = document.title;
    const comp = competenciaActual();
    const ind = indicadorActual();
    document.title = `Secuencia didáctica ${CURSO} ${ind.code}`;
    window.print();
    setTimeout(() => { document.title = titulo; }, 500);
  });

  /* ---------- Limpiar ---------- */
  el.btnLimpiar.addEventListener("click", () => {
    document.getElementById("form-sd").reset();
    el.indicador.disabled = true;
    el.indicador.innerHTML = '<option value="">Primero elija una competencia</option>';
    el.hintIdiomas.hidden = true;
    [el.actInicio, el.actDesarrollo, el.actCierre, el.recursos, el.evalCriterios]
      .forEach((c) => { c.value = ""; delete c.dataset.auto; });
    renderSaberes(null);
    actualizar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Actualización continua ---------- */
  document.getElementById("form-sd")
    .addEventListener("input", actualizar);
  document.getElementById("form-sd")
    .addEventListener("change", actualizar);

  /* ---------- Estado inicial ---------- */
  const hoy = new Date();
  el.fecha.value = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0")
  ].join("-");
  el.grado.value = GRADO_BASE;
  actualizar();
})();

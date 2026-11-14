/* ============================================================
   documento.js — Genera la secuencia didáctica impresa
   Sigue el formato institucional: 1. Datos generales,
   2. Competencias, indicadores y contenidos, 3. Recursos y materiales,
   4. Desarrollo de la secuencia, 5. Anotación de alumnos y Evaluación.
   ============================================================ */
const Documento = (() => {
  "use strict";

  const esc = Nucleo.escapar;
  const VACIO = '<span class="vacio">Sin especificar</span>';
  const FILAS_ANOTACION = 5;

  const lleno = (txt) => typeof txt === "string" && txt.trim() !== "";
  const o = (txt) => (lleno(txt) ? esc(txt) : VACIO);

  function lista(items, clase = "") {
    const filas = (items || []).filter(lleno).map((i) => `<li>${esc(i)}</li>`).join("");
    return filas ? `<ul class="${clase}">${filas}</ul>` : VACIO;
  }

  /* ---------- 1. Datos generales ---------- */
  function datosGenerales(ctx) {
    const { datos, plan } = ctx;
    const filas = [
      ["Fecha:", datos.fecha],
      ["Curso:", datos.curso],
      ["Catedrático:", datos.docente],
      ["Tema principal:", plan ? plan.tema : ""]
    ];
    if (plan) filas.push(["Propósito de la clase:", plan.proposito]);
    filas.push(["Duración:", datos.duracion]);
    if (lleno(datos.contexto)) filas.push(["Contexto:", datos.contexto]);

    const ideas = plan && plan.conceptos.length
      ? `<ul class="ideas">${plan.conceptos.map((c) => `
          <li><strong>${esc(c.termino || "")}:</strong> ${esc(c.explicacion || "")}
          ${lleno(c.ejemplo) ? `<span class="ejemplo">Ejemplo: ${esc(c.ejemplo)}</span>` : ""}</li>`).join("")}</ul>`
      : VACIO;

    return `<table class="doc-table plantilla datos">
      <colgroup><col class="c-rotulo"><col></colgroup>
      <tbody>
        ${filas.map(([rotulo, valor]) => `<tr><th>${rotulo}</th><td>${o(valor)}</td></tr>`).join("")}
        <tr><td colspan="2"><p class="rotulo-centro">Ideas clave</p>${ideas}</td></tr>
      </tbody>
    </table>`;
  }

  /* ---------- 2. Competencias, indicadores de logro y contenidos ---------- */
  function competencias(ctx) {
    const { competencia, indicador, saberes } = ctx;
    const contenido = saberes.length
      ? saberes.map((s) => `<p><span class="tipo-saber">${esc(s.tipo)}</span>${esc(s.texto)}</p>`).join("")
      : VACIO;
    return `<table class="doc-table plantilla tres">
      <thead><tr><th>Competencia</th><th>Indicador de logro</th><th>Contenido</th></tr></thead>
      <tbody><tr>
        <td>${competencia ? `<strong>${competencia.num}.</strong> ${esc(competencia.texto)}` : VACIO}</td>
        <td>${indicador ? `<strong>${esc(indicador.code)}</strong> ${esc(indicador.texto)}` : VACIO}</td>
        <td>${contenido}</td>
      </tr></tbody>
    </table>`;
  }

  /* ---------- 3. Recursos y materiales ---------- */
  function recursos(plan) {
    return `<table class="doc-table plantilla"><tbody><tr><td>
      ${lista(plan.recursos)}
      <p class="subtitulo">Preparar antes de la clase</p>
      ${lista(plan.preparacion, "chequeo")}
    </td></tr></tbody></table>`;
  }

  /* ---------- 4. Desarrollo de la secuencia ---------- */
  function evidencias(paso, criterios) {
    return criterios
      .filter((c) => (paso.evalua || []).includes(c.criterio.id))
      .map((c) => c.etiqueta);
  }

  function actividad({ paso, numero, desde, hasta }, criterios) {
    const evidencia = evidencias(paso, criterios);
    const pregunta = lleno(paso.pregunte)
      ? `<p><strong>Pregunte:</strong> ${esc(paso.pregunte)}${lleno(paso.espere)
          ? `<span class="espere"><strong>Respuesta esperada:</strong> ${esc(paso.espere)}</span>` : ""}</p>`
      : "";
    const verificar = lleno(paso.verifique) || evidencia.length
      ? `<p class="verifique">${lleno(paso.verifique) ? `<strong>Antes de avanzar:</strong> ${esc(paso.verifique)}` : ""}
          ${evidencia.length ? `<span class="tag">Evidencia para ${evidencia.join(", ")}</span>` : ""}</p>`
      : "";
    return `<div class="actividad">
      <p class="actividad-titulo">
        <span class="num">${numero}</span>${esc(paso.titulo || "Actividad sin título")}
        <span class="actividad-min">${paso.min} min · minuto ${desde} a ${hasta}</span>
      </p>
      ${lleno(paso.docente) ? `<p><strong>El docente:</strong> ${esc(paso.docente)}</p>` : ""}
      ${lleno(paso.diga) ? `<p class="guion"><strong>Diga:</strong> “${esc(paso.diga)}”</p>` : ""}
      ${pregunta}
      ${lleno(paso.estudiantes) ? `<p><strong>Los estudiantes:</strong> ${esc(paso.estudiantes)}</p>` : ""}
      ${verificar}
    </div>`;
  }

  function desarrollo(ctx) {
    const { plan, tiempo, criterios } = ctx;
    const momentos = tiempo.map((m) => `
      <tr>
        <th class="momento">${m.nombre}<span>${m.minutos} min</span></th>
        <td>${m.pasos.length ? m.pasos.map((p) => actividad(p, criterios)).join("") : VACIO}</td>
      </tr>`).join("");

    const fallas = plan.dificultades.length
      ? `<ul class="fallas">${plan.dificultades.map((d) => `
          <li><strong>${esc(d.situacion || "")}</strong>
          ${lleno(d.causa) ? `<span class="causa">Causa probable: ${esc(d.causa)}</span>` : ""}
          ${lleno(d.accion) ? `<span>Qué hacer: ${esc(d.accion)}</span>` : ""}</li>`).join("")}</ul>`
      : VACIO;

    const ajustes = [
      ["Quien necesita apoyo", plan.apoyo],
      ["Quien termina antes", plan.reto],
      ["Si falta tiempo", plan.siFalta],
      ["Si sobra tiempo", plan.siSobra]
    ].filter(([, t]) => lleno(t))
      .map(([r, t]) => `<p><strong>${r}:</strong> ${esc(t)}</p>`).join("") || VACIO;

    return `<table class="doc-table plantilla desarrollo">
      <colgroup><col class="c-momento"><col></colgroup>
      <tbody>
        ${momentos}
        <tr><th class="momento secundario">Si algo falla</th><td>${fallas}</td></tr>
        <tr><th class="momento secundario">Ajustes</th><td>${ajustes}</td></tr>
      </tbody>
    </table>`;
  }

  /* ---------- 5. Anotación de alumnos ---------- */
  function anotacion() {
    const filas = Array.from({ length: FILAS_ANOTACION },
      () => "<tr><td></td><td></td><td></td></tr>").join("");
    return `<table class="doc-table plantilla anotacion">
      <thead><tr><th>Estudiante</th><th>Qué necesita</th><th>Seguimiento</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>`;
  }

  /* ---------- Evaluación ---------- */
  function evaluacion(ctx) {
    const { criterios, total } = ctx;
    const niveles = Nucleo.nivelesDeLogro(total, LOGRO_COMPETENCIA);
    const minimo = niveles.filter((n) => n.lograda).pop();
    const tipoDe = (c) => (ctx.indicador.saberes.find((s) => s.code === c.criterio.saber) || {}).tipo || "Otro";

    const filas = criterios.map((c) => `
      <tr>
        <td class="c-et">${c.etiqueta}</td>
        <td>${esc(c.criterio.texto || "")}</td>
        <td>${esc(tipoDe(c))}</td>
        <td>${c.actividades.length
          ? c.actividades.map((a) => `${esc(a.titulo)} <span class="momento-ref">(${esc(a.momento)})</span>`).join("<br>")
          : "—"}</td>
        <td class="c-pts">${c.puntos}</td>
      </tr>`).join("");

    return `<p class="evaluacion-resumen">
        <strong>Evaluación:</strong> ${esc(ctx.tipo)} · técnica de ${esc(ctx.tecnica.toLowerCase())} ·
        instrumento: ${esc(ctx.instrumento.toLowerCase())} (anexo) · ${total} puntos.
      </p>
      <table class="doc-table plantilla criterios">
        <colgroup><col class="c-et"><col><col class="c-tipo"><col class="c-donde"><col class="c-pts"></colgroup>
        <thead><tr><th></th><th>Criterio</th><th>Saber</th><th>Dónde se observa</th><th>Puntos</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>
      <p class="regla-logro">
        La competencia se considera <strong>lograda</strong> cuando el estudiante obtiene
        <strong>${minimo.puntosDesde} puntos o más</strong> de ${total} y ningún criterio queda en el nivel más bajo.
        Quien no la logre se anota en la sección 5 para darle refuerzo.
      </p>`;
  }

  /* ---------- Anexo: código ---------- */
  function codigo(plan) {
    if (!plan.codigo.length) return "";
    const bloques = plan.codigo.map((c) => `
      <div class="codigo-bloque">
        <p class="codigo-titulo">${esc(c.titulo || "")}</p>
        <pre class="codigo">${esc(c.texto || "")}</pre>
      </div>`).join("");
    return `<section class="anexo-codigo">
      <h3 class="doc-h3">Anexo: código de referencia</h3>
      <p class="doc-nota">Ejemplos para Arduino UNO o compatible. Si usa otra placa, ajuste los pines.</p>
      ${bloques}
    </section>`;
  }

  /* ---------- Ensamble ---------- */
  const seccion = (numero, titulo, cuerpo) =>
    `<h3 class="doc-h3"><span class="sec-num">${numero}.</span> ${titulo}</h3>${cuerpo}`;

  const FIRMAS = `<div class="firmas">
    <div><span class="linea"></span><p>Firma del catedrático</p></div>
    <div><span class="linea"></span><p>Vo.Bo. Coordinación</p></div>
  </div>`;

  function html(ctx) {
    const cabecera = `<header class="doc-head">
        <p class="doc-estab">${esc(ctx.datos.establecimiento)}</p>
        <h2>Secuencia didáctica</h2>
      </header>`;
    const inicio = cabecera +
      seccion(1, "Datos generales", datosGenerales(ctx)) +
      seccion(2, "Competencias, indicadores de logro y contenidos", competencias(ctx));

    if (!ctx.plan) {
      return inicio + '<p class="doc-vacio">Elija un indicador de logro para generar el desarrollo de la secuencia y el instrumento de evaluación.</p>';
    }
    return inicio +
      seccion(3, "Recursos y materiales", recursos(ctx.plan)) +
      seccion(4, "Desarrollo de la secuencia", desarrollo(ctx)) +
      seccion(5, "Anotación de alumnos que necesitan refuerzo o seguimiento <span class=\"sec-nota\">(para trasladar a coordinador de sede al final del día)</span>", anotacion()) +
      evaluacion(ctx) +
      FIRMAS +
      codigo(ctx.plan);
  }

  return { html };
})();

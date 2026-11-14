/* ============================================================
   instrumento.js — Genera el instrumento de evaluación
   Las cuatro variantes salen de los mismos criterios, por lo que
   cambiar de instrumento nunca cambia lo que se evalúa.
   Todas terminan con la conclusión sobre el logro de la competencia.
   ============================================================ */
const Instrumento = (() => {
  "use strict";

  const esc = Nucleo.escapar;
  const FILAS_POR_DEFECTO = 25;
  const FILAS_MAXIMAS = 60;

  const INSTRUCCIONES = {
    "Lista de cotejo": "Marque Sí únicamente si observa la evidencia completa. Sí otorga los puntos del criterio; No otorga 0.",
    "Escala de rango": "Encierre el valor que corresponde al desempeño observado en cada criterio. Si no hay evidencia, asigne 0. Sume los valores encerrados.",
    "Rúbrica": "Lea los descriptores de izquierda a derecha, marque el nivel que mejor describe el desempeño y anote los puntos. Si no hay evidencia, asigne 0. Al final, complete el logro de la competencia.",
    "Bitácora de laboratorio": "El estudiante completa cada apartado durante la clase. El docente revisa el registro, marca los puntos obtenidos y escribe una observación."
  };

  /* Condición adicional al puntaje para dar por lograda la competencia. */
  const CONDICION = {
    "Lista de cotejo": "ningún criterio de lo que hace (procedimental) está marcado No",
    "Escala de rango": "ningún criterio quedó en el valor más bajo",
    "Rúbrica": "ningún criterio quedó en el nivel Inicial",
    "Bitácora de laboratorio": "ningún apartado quedó con el puntaje más bajo"
  };

  const renglones = (cantidad) => '<span class="renglon"></span>'.repeat(cantidad);
  const casilla = (texto) => `<span class="casilla"></span>${texto}`;

  function tipoDe(item, saberes) {
    const saber = saberes.find((s) => s.code === item.criterio.saber);
    return saber ? saber.tipo : null;
  }

  /* Agrupa los criterios por tipo de saber: lo que sabe, hace y cómo actúa. */
  function grupos(ctx) {
    const lista = TIPOS_SABER.map((t) => ({
      ...t,
      items: ctx.criterios.filter((c) => tipoDe(c, ctx.saberes) === t.tipo)
    }));
    const otros = ctx.criterios.filter((c) => !tipoDe(c, ctx.saberes));
    if (otros.length) lista.push({ tipo: null, titulo: "Otros criterios", detalle: "agregados por el docente", items: otros });
    return lista.filter((g) => g.items.length);
  }

  function filasAgrupadas(ctx, columnas, fila) {
    return grupos(ctx).map((g) => `
      <tr class="grupo"><th colspan="${columnas}">${esc(g.titulo)} <span>(${esc(g.detalle)})</span></th></tr>
      ${g.items.map(fila).join("")}`).join("");
  }

  function criterioCelda(item) {
    const { criterio, etiqueta, actividades } = item;
    const donde = actividades.length
      ? `<span class="crit-ref">Se observa en: ${actividades.map((a) => `${esc(a.titulo)} (${esc(a.momento.toLowerCase())})`).join("; ")}</span>`
      : "";
    return `<strong class="crit-et">${etiqueta}</strong> ${esc(criterio.texto || "")}` +
      (criterio.evidencia ? `<span class="crit-ev">Evidencia: ${esc(criterio.evidencia)}</span>` : "") +
      donde;
  }

  function total(ctx, columnas) {
    return `<tr class="inst-total"><th colspan="${columnas}">Total obtenido</th>` +
      `<td class="c-pts">____ / ${ctx.total}</td></tr>`;
  }

  /* ---------- Cuerpos ---------- */
  function listaCotejo(ctx) {
    const filas = filasAgrupadas(ctx, 5, (item) => `
      <tr>
        <td>${criterioCelda(item)}</td>
        <td class="c-pts">${item.puntos}</td>
        <td class="c-marca"></td>
        <td class="c-marca"></td>
        <td class="c-pts"></td>
      </tr>`);
    return `<table class="doc-table inst">
      <thead><tr><th>Criterio</th><th class="c-pts">Valor</th><th class="c-marca">Sí</th><th class="c-marca">No</th><th class="c-pts">Punteo</th></tr></thead>
      <tbody>${filas}${total(ctx, 4)}</tbody>
    </table>`;
  }

  function escalaRango(ctx) {
    const cabecera = NIVELES.map((n) => `<th class="c-nivel">${esc(n.nombre)}</th>`).join("");
    const filas = filasAgrupadas(ctx, NIVELES.length + 2, (item) => {
      const valores = NIVELES.map((n) =>
        `<td class="c-nivel">${Nucleo.puntosDeNivel(item.puntos, n.factor)}</td>`).join("");
      return `<tr><td>${criterioCelda(item)}</td>${valores}<td class="c-pts"></td></tr>`;
    });
    return `<table class="doc-table inst">
      <thead><tr><th>Criterio</th>${cabecera}<th class="c-pts">Punteo</th></tr></thead>
      <tbody>${filas}${total(ctx, NIVELES.length + 1)}</tbody>
    </table>`;
  }

  function rubrica(ctx) {
    const cabecera = NIVELES.map((n) => `<th>${esc(n.nombre)}</th>`).join("");
    const filas = filasAgrupadas(ctx, NIVELES.length + 2, (item) => {
      const celdas = NIVELES.map((n, i) => {
        const texto = (item.criterio.niveles || [])[i] || "";
        const pts = Nucleo.puntosDeNivel(item.puntos, n.factor);
        return `<td>${esc(texto)}<span class="nivel-pts">${pts} pts</span></td>`;
      }).join("");
      return `<tr><td>${criterioCelda(item)}</td>${celdas}<td class="c-pts"></td></tr>`;
    });
    return `<table class="doc-table inst rubrica">
      <colgroup><col class="c-crit">${NIVELES.map(() => "<col>").join("")}<col class="c-pts"></colgroup>
      <thead><tr><th>Criterio</th>${cabecera}<th>Punteo</th></tr></thead>
      <tbody>${filas}${total(ctx, NIVELES.length + 1)}</tbody>
    </table>`;
  }

  function bitacora(ctx) {
    const filas = filasAgrupadas(ctx, 2, (item) => {
      const niveles = NIVELES.map((n) =>
        `<span class="marca-pts">${Nucleo.puntosDeNivel(item.puntos, n.factor)}</span>`).join("");
      return `<tr>
        <td>${criterioCelda(item)}${renglones(3)}</td>
        <td class="c-bit">${niveles}</td>
      </tr>`;
    });
    return `<table class="doc-table inst bitacora">
      <thead><tr><th>Registro del estudiante</th><th class="c-bit">Punteo</th></tr></thead>
      <tbody>${filas}
        <tr class="inst-total"><th>Total obtenido</th><td class="c-bit">____ / ${ctx.total}</td></tr>
      </tbody>
    </table>`;
  }

  const CUERPOS = {
    "Lista de cotejo": listaCotejo,
    "Escala de rango": escalaRango,
    "Rúbrica": rubrica,
    "Bitácora de laboratorio": bitacora
  };

  /* ---------- Logro de la competencia ---------- */
  function logroCompetencia(ctx) {
    const niveles = Nucleo.nivelesDeLogro(ctx.total, LOGRO_COMPETENCIA);
    const minimo = niveles.filter((n) => n.lograda).pop();
    const condicion = CONDICION[ctx.instrumento] || CONDICION["Rúbrica"];

    const escala = niveles.map((n) => `
      <tr>
        <td class="c-casilla">${casilla("")}</td>
        <th>${esc(n.nombre)}</th>
        <td class="c-rango">${n.rango} pts</td>
        <td>${esc(n.descripcion)}</td>
      </tr>`).join("");

    const porSaber = grupos(ctx).map((g) => `
      <tr>
        <th>${esc(g.titulo)} <span>(${esc(g.detalle)})</span></th>
        <td class="c-crits">${g.items.map((i) => i.etiqueta).join(", ")}</td>
        <td class="c-si-no">${casilla("Sí")} ${casilla("No")}</td>
      </tr>`).join("");

    return `<div class="logro">
      <h4 class="inst-sub">Logro de la competencia</h4>
      <p class="logro-comp"><strong>Competencia ${ctx.competencia.num}:</strong> ${esc(ctx.competencia.texto)}</p>

      <table class="doc-table logro-saber">
        <colgroup><col><col class="c-crits"><col class="c-si-no"></colgroup>
        <thead><tr><th>¿Lo demostró?</th><th>Criterios</th><th>Logrado</th></tr></thead>
        <tbody>${porSaber}</tbody>
      </table>
      <p class="logro-ayuda">Un saber está logrado cuando sus criterios alcanzan al menos el nivel Logrado.</p>

      <table class="doc-table logro-escala">
        <colgroup><col class="c-casilla"><col class="c-nivel-logro"><col class="c-rango"><col></colgroup>
        <thead><tr><th></th><th>Resultado</th><th>Puntos</th><th>Qué significa</th></tr></thead>
        <tbody>${escala}</tbody>
      </table>
      <p class="logro-regla">
        <strong>Regla:</strong> la competencia está lograda con <strong>${minimo.puntosDesde} puntos o más</strong>
        y siempre que ${esc(condicion)}. Si no se cumple esa condición, el resultado es En proceso aunque el puntaje sea mayor.
        Si el resultado es En proceso o Aún no lograda, anote al estudiante en la sección 5 de la secuencia.
      </p>
    </div>`;
  }

  /* ---------- Cuadro del grupo ---------- */
  function cuadroGrupo(ctx) {
    const pedidas = Number(ctx.estudiantes) || FILAS_POR_DEFECTO;
    const cantidad = Math.min(Math.max(pedidas, 1), FILAS_MAXIMAS);
    const columnas = ctx.criterios.map((item) =>
      `<th class="c-cuadro">${item.etiqueta}<small>${item.puntos}</small></th>`).join("");
    const vacias = ctx.criterios.map(() => "<td></td>").join("");
    const filas = Array.from({ length: cantidad }, (_, i) =>
      `<tr><td class="c-num">${i + 1}</td><td></td>${vacias}<td></td><td></td></tr>`).join("");
    const claves = LOGRO_COMPETENCIA.map((n) => `${n.clave} = ${esc(n.nombre)}`).join(" · ");
    return `<div class="cuadro-grupo">
      <h4 class="inst-sub">Cuadro de registro del grupo</h4>
      <table class="doc-table inst cuadro">
        <thead><tr><th class="c-num">No.</th><th>Nombre del estudiante</th>${columnas}<th class="c-cuadro">Total<small>${ctx.total}</small></th><th class="c-cuadro">Logro</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>
      <p class="logro-ayuda">Logro: ${claves}.</p>
    </div>`;
  }

  /* ---------- Ensamble ---------- */
  function html(ctx) {
    const cuerpo = (CUERPOS[ctx.instrumento] || rubrica)(ctx);
    return `
      <header class="doc-head">
        <p class="doc-estab">${esc(ctx.establecimiento)}</p>
        <h2>${esc(ctx.instrumento)}</h2>
        <p class="doc-sub">Instrumento de evaluación · Curso de ${esc(ctx.curso)}</p>
      </header>

      <table class="doc-table kv">
        <tbody>
          <tr><th>Catedrático</th><td>${esc(ctx.docente)}</td><th>Grado y sección</th><td>${esc(ctx.grado)}</td></tr>
          <tr><th>Tema</th><td colspan="3">${esc(ctx.tema || "")}</td></tr>
          <tr><th>Indicador de logro</th><td colspan="3"><strong>${esc(ctx.indicador.code)}</strong> ${esc(ctx.indicador.texto)}</td></tr>
          <tr><th>Tipo y técnica</th><td>${esc(ctx.tipo)} · ${esc(ctx.tecnica)}</td><th>Fecha</th><td>${esc(ctx.fecha)}</td></tr>
          <tr><th>Estudiante o equipo</th><td colspan="3"></td></tr>
        </tbody>
      </table>

      <p class="inst-instrucciones"><strong>Instrucciones:</strong> ${esc(INSTRUCCIONES[ctx.instrumento] || "")}</p>

      ${cuerpo}

      ${logroCompetencia(ctx)}

      <div class="inst-retro">
        <p><strong>Retroalimentación para el estudiante:</strong></p>
        ${renglones(2)}
      </div>

      ${ctx.cuadro ? cuadroGrupo(ctx) : ""}`;
  }

  return { html };
})();

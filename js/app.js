/* ============================================================
   app.js — Conecta el formulario con el plan y el documento
   ============================================================ */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const { escapar } = Nucleo;
  const MINUTOS_MINIMOS = 60; // Por debajo de esto los pasos quedan muy cortos.

  /* ---------- Referencias ---------- */
  const el = {
    formulario: $("form-sd"),
    establecimiento: $("establecimiento"), docente: $("docente"),
    grado: $("grado"), seccion: $("seccion"), fecha: $("fecha"),
    periodos: $("periodos"), minutosPeriodo: $("minutos-periodo"),
    estudiantes: $("estudiantes"), modalidad: $("modalidad"),

    departamento: $("departamento"), municipio: $("municipio"), area: $("area"),
    idioma: $("idioma"), idiomaMaterno: $("idioma-materno"),
    enfoqueLing: $("enfoque-ling"), contexto: $("contexto"),
    hintIdiomas: $("hint-idiomas"),

    competencia: $("competencia"), indicador: $("indicador"), saberes: $("saberes"),
    btnTodos: $("btn-todos-saberes"),

    sinPlan: $("sin-plan"), edicionPlan: $("edicion-plan"), edicionEval: $("edicion-eval"),
    tema: $("tema"), proposito: $("proposito"), preparacion: $("preparacion"), recursos: $("recursos"),
    resumenTiempo: $("resumen-tiempo"),
    apoyo: $("apoyo"), reto: $("reto"), siFalta: $("si-falta"), siSobra: $("si-sobra"),

    evalTipo: $("eval-tipo"), evalTecnica: $("eval-tecnica"),
    evalInstrumento: $("eval-instrumento"), evalPunteo: $("eval-punteo"),
    evalCuadro: $("eval-cuadro"), cobertura: $("cobertura"),

    docSecuencia: $("doc-secuencia"), docInstrumento: $("doc-instrumento"),
    vistaPrevia: document.querySelector(".preview"),
    tabSecuencia: $("tab-secuencia"), tabInstrumento: $("tab-instrumento"),
    tabInstrumentoNombre: $("tab-instrumento-nombre"), sinPlanEval: $("sin-plan-eval"),
    grupoCurricular: $("grupo-curricular"), grupoGuia: $("grupo-guia"), grupoEvaluacion: $("grupo-evaluacion"),

    btnPdf: $("btn-pdf"), btnPdfInstrumento: $("btn-pdf-instrumento"), btnLimpiar: $("btn-limpiar"),
    btnSugerirCtx: $("btn-sugerir-ctx"),
    aviso: $("aviso")
  };

  /* ---------- Estado ----------
     "plan" es una copia editable del indicador elegido. El banco de
     datos nunca se modifica, así que siempre se puede volver a cargar. */
  const estado = {
    plan: null,
    editado: false,
    competencia: "",
    indicador: ""
  };

  /* ---------- Utilidades ---------- */
  function valor(input) {
    const v = (input.value || "").trim();
    return v === "" ? null : v;
  }

  let avisoTimer = null;
  function avisar(mensaje) {
    el.aviso.textContent = mensaje;
    el.aviso.hidden = false;
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => { el.aviso.hidden = true; }, 4200);
  }

  /* "2026-02-09" → "lunes, 9 de febrero de 2026", como en el formato institucional. */
  function fechaLarga(iso) {
    if (!iso) return null;
    const partes = iso.split("-").map(Number);
    if (partes.length !== 3 || partes.some(Number.isNaN)) return iso;
    const [anio, mes, dia] = partes;
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const semana = dias[new Date(anio, mes - 1, dia).getDay()];
    return `${semana}, ${dia} de ${meses[mes - 1] || mes} de ${anio}`;
  }

  function fechaDeHoy() {
    const hoy = new Date();
    return [
      hoy.getFullYear(),
      String(hoy.getMonth() + 1).padStart(2, "0"),
      String(hoy.getDate()).padStart(2, "0")
    ].join("-");
  }

  function aLineas(texto) {
    return texto.split("\n").map((l) => l.trim()).filter(Boolean);
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

  /* ---------- Selección curricular ---------- */
  function competenciaActual() {
    const num = Number(el.competencia.value);
    return COMPETENCIAS.find((c) => c.num === num) || null;
  }

  function indicadorActual() {
    const comp = competenciaActual();
    if (!comp) return null;
    return comp.indicadores.find((i) => i.code === el.indicador.value) || null;
  }

  function poblarIndicadores(comp) {
    el.indicador.innerHTML = "";
    if (!comp) {
      el.indicador.disabled = true;
      el.indicador.innerHTML = '<option value="">Primero elija una competencia</option>';
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
  }

  /* Evita perder los cambios del docente al cambiar de clase. */
  function puedeDescartar() {
    return !estado.editado ||
      window.confirm("Ya modificó esta clase. Si continúa, perderá esos cambios. ¿Desea continuar?");
  }

  el.competencia.addEventListener("change", () => {
    if (!puedeDescartar()) {
      el.competencia.value = estado.competencia;
      return;
    }
    estado.competencia = el.competencia.value;
    estado.indicador = "";
    poblarIndicadores(competenciaActual());
    cargarPlan(null);
  });

  el.indicador.addEventListener("change", () => {
    if (!puedeDescartar()) {
      el.indicador.value = estado.indicador;
      return;
    }
    estado.indicador = el.indicador.value;
    cargarPlan(indicadorActual());
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
      el.saberes.appendChild(label);
    });
  }

  el.btnTodos.addEventListener("click", () => {
    const cajas = el.saberes.querySelectorAll("input[type=checkbox]");
    const faltan = Array.from(cajas).some((c) => !c.checked);
    cajas.forEach((c) => { c.checked = faltan; });
    actualizar();
  });

  function saberesSeleccionados() {
    const ind = indicadorActual();
    if (!ind) return [];
    const marcados = Array.from(el.saberes.querySelectorAll("input:checked"))
      .map((c) => c.value);
    return ind.saberes.filter((s) => marcados.includes(s.code));
  }

  /* ---------- Carga del plan ---------- */
  function minutosDisponibles() {
    return (Number(el.periodos.value) || 0) * (Number(el.minutosPeriodo.value) || 0);
  }

  function cargarPlan(ind) {
    renderSaberes(ind);
    estado.editado = false;
    estado.plan = null;

    if (ind) {
      const { saberes, code, texto, ...contenido } = ind;
      const plan = JSON.parse(JSON.stringify(contenido));
      plan.codigo = plan.codigo || [];
      Nucleo.fijarPesos(plan);
      if (minutosDisponibles() > 0) Nucleo.ajustarTiempos(plan, minutosDisponibles());
      estado.plan = plan;

      el.tema.value = plan.tema;
      el.proposito.value = plan.proposito;
      el.preparacion.value = plan.preparacion.join("\n");
      el.recursos.value = plan.recursos.join("\n");
      el.apoyo.value = plan.apoyo;
      el.reto.value = plan.reto;
      el.siFalta.value = plan.siFalta;
      el.siSobra.value = plan.siSobra;

      // La evaluación sugerida solo reemplaza lo que el docente no haya elegido.
      [[el.evalTipo, plan.evaluacion.tipo],
       [el.evalTecnica, plan.evaluacion.tecnica],
       [el.evalInstrumento, plan.evaluacion.instrumento]].forEach(([campo, sugerido]) => {
        if (campo.dataset.elegido !== "1") campo.value = sugerido;
      });
      renderEditores();
    }

    el.sinPlan.hidden = Boolean(ind);
    el.sinPlanEval.hidden = Boolean(ind);
    el.edicionPlan.hidden = !ind;
    el.edicionEval.hidden = !ind;
    mostrarVista("secuencia");
    actualizar();
  }

  /* ---------- Pestañas de la vista previa ----------
     Solo afectan la pantalla: al imprimir siempre salen ambos documentos. */
  function mostrarVista(vista) {
    const instrumento = vista === "instrumento";
    const cambia = el.docInstrumento.classList.contains("oculto") === instrumento;
    el.docSecuencia.classList.toggle("oculto", instrumento);
    el.docInstrumento.classList.toggle("oculto", !instrumento);
    el.tabSecuencia.setAttribute("aria-selected", String(!instrumento));
    el.tabInstrumento.setAttribute("aria-selected", String(instrumento));
    if (cambia) el.vistaPrevia.scrollTop = 0;
  }

  /* Resalta el instrumento un momento para que se note que se regeneró. */
  function resaltarInstrumento() {
    el.docInstrumento.classList.remove("recien");
    void el.docInstrumento.offsetWidth; // reinicia la animación
    el.docInstrumento.classList.add("recien");
  }

  el.tabSecuencia.addEventListener("click", () => mostrarVista("secuencia"));
  el.tabInstrumento.addEventListener("click", () => mostrarVista("instrumento"));

  // Lo que se edita decide qué documento mostrar.
  ["input", "change"].forEach((tipo) => {
    el.grupoEvaluacion.addEventListener(tipo, () => {
      mostrarVista("instrumento");
      if (tipo === "change") resaltarInstrumento();
    });
    el.grupoGuia.addEventListener(tipo, () => mostrarVista("secuencia"));
  });

  /* ---------- Editores de listas ---------- */
  function marcarEditado() {
    estado.editado = true;
  }

  function alCambiarLista() {
    marcarEditado();
    Nucleo.fijarPesos(estado.plan);
    renderEditores();
    actualizar();
  }

  function renderEditores() {
    const { plan } = estado;
    const ind = indicadorActual();
    let numero = 0;

    Nucleo.MOMENTOS.forEach(({ clave }) => {
      const primero = numero;
      numero += plan.pasos[clave].length;
      Editor.lista({
        contenedor: $(`pasos-${clave}`),
        items: plan.pasos[clave],
        campos: Editor.CAMPOS.paso,
        resumen: (p, i) => `${primero + i + 1}. ${p.titulo || "Paso sin título"} · ${p.min} min`,
        nuevo: () => ({ titulo: "", min: 5, peso: 5, evalua: [] }),
        textoAgregar: "+ Agregar paso",
        alEditar: (_, campo) => {
          marcarEditado();
          if (campo === "min") Nucleo.fijarPesos(plan);
        },
        alCambiarLista
      });
    });

    Editor.lista({
      contenedor: $("lista-conceptos"),
      items: plan.conceptos,
      campos: Editor.CAMPOS.concepto,
      resumen: (c) => c.termino || "Concepto nuevo",
      nuevo: () => ({ termino: "", explicacion: "", ejemplo: "" }),
      textoAgregar: "+ Agregar concepto",
      alEditar: marcarEditado,
      alCambiarLista
    });

    Editor.lista({
      contenedor: $("lista-codigo"),
      items: plan.codigo,
      campos: Editor.CAMPOS.codigo,
      resumen: (c) => c.titulo || "Código nuevo",
      nuevo: () => ({ titulo: "", texto: "" }),
      textoAgregar: "+ Agregar código",
      alEditar: marcarEditado,
      alCambiarLista
    });

    Editor.lista({
      contenedor: $("lista-dificultades"),
      items: plan.dificultades,
      campos: Editor.CAMPOS.dificultad,
      resumen: (d) => d.situacion || "Dificultad nueva",
      nuevo: () => ({ situacion: "", causa: "", accion: "" }),
      textoAgregar: "+ Agregar dificultad",
      alEditar: marcarEditado,
      alCambiarLista
    });

    Editor.lista({
      contenedor: $("lista-criterios"),
      items: plan.criterios,
      campos: Editor.CAMPOS.criterio,
      saberes: ind.saberes,
      resumen: (c) => c.texto || "Criterio nuevo",
      nuevo: () => ({
        id: `propio-${Date.now()}`, saber: "", peso: 2,
        texto: "", evidencia: "", niveles: ["", "", "", ""]
      }),
      textoAgregar: "+ Agregar criterio",
      alEditar: marcarEditado,
      alCambiarLista
    });
  }

  /* ---------- Campos de texto del plan ---------- */
  [[el.tema, "tema"], [el.proposito, "proposito"], [el.apoyo, "apoyo"], [el.reto, "reto"],
   [el.siFalta, "siFalta"], [el.siSobra, "siSobra"]].forEach(([campo, clave]) => {
    campo.addEventListener("input", () => {
      estado.plan[clave] = campo.value;
      marcarEditado();
    });
  });

  [[el.preparacion, "preparacion"], [el.recursos, "recursos"]].forEach(([campo, clave]) => {
    campo.addEventListener("input", () => {
      estado.plan[clave] = aLineas(campo.value);
      marcarEditado();
    });
  });

  [el.evalTipo, el.evalTecnica, el.evalInstrumento].forEach((campo) => {
    campo.addEventListener("change", () => { campo.dataset.elegido = "1"; });
  });

  /* Cambiar el tiempo disponible reparte de nuevo los minutos de los pasos. */
  [el.periodos, el.minutosPeriodo].forEach((campo) => {
    campo.addEventListener("input", () => {
      if (!estado.plan || minutosDisponibles() <= 0) return;
      Nucleo.ajustarTiempos(estado.plan, minutosDisponibles());
      renderEditores();
    });
  });

  /* ---------- Render del documento ---------- */
  function puntosTotales() {
    return Number(el.evalPunteo.value) || 0;
  }

  function resumirTiempo(tiempo) {
    const planificado = tiempo.reduce((suma, m) => suma + m.minutos, 0);
    const disponible = minutosDisponibles();
    const detalle = tiempo.map((m) => `${m.nombre} ${m.minutos}`).join(" · ");
    let mensaje = `${detalle} · Total ${planificado} de ${disponible} min.`;
    let alerta = false;

    if (planificado !== disponible) {
      mensaje += " Ajuste los minutos de los pasos para que coincidan con el tiempo disponible.";
      alerta = true;
    } else if (disponible < MINUTOS_MINIMOS) {
      mensaje += " Los pasos quedan muy cortos: divida la clase en dos sesiones o revise la sección Si falta tiempo.";
      alerta = true;
    }
    el.resumenTiempo.textContent = mensaje;
    el.resumenTiempo.classList.toggle("alerta", alerta);
  }

  function resumirCobertura(saberes) {
    const faltan = Nucleo.saberesSinCriterio(estado.plan, saberes.map((s) => s.code));
    el.cobertura.textContent = faltan.length
      ? `Sin criterio de evaluación: saber ${faltan.join(", ")}. Agregue un criterio o desmárquelo.`
      : `Los ${saberes.length} saberes marcados tienen al menos un criterio de evaluación.`;
    el.cobertura.classList.toggle("alerta", faltan.length > 0);
  }

  function gradoYSeccion() {
    const grado = valor(el.grado) || GRADO_BASE;
    const seccion = valor(el.seccion);
    return seccion ? `${grado}, sección ${seccion}` : grado;
  }

  function duracionDeLaClase() {
    const per = Number(el.periodos.value) || 0;
    const minutos = Number(el.minutosPeriodo.value) || 0;
    if (!per) return "";
    const periodos = per === 1 ? "1 periodo" : `${per} periodos`;
    return minutos ? `${periodos} de ${minutos} minutos (${per * minutos} minutos)` : periodos;
  }

  /* Resume en una línea el contexto territorial y lingüístico, si se indicó. */
  function contextoDeLaClase() {
    const partes = [];
    const depto = valor(el.departamento);
    if (depto) {
      const muni = valor(el.municipio);
      partes.push(`${muni ? `${muni}, ` : ""}${depto}, área ${el.area.value.toLowerCase()}`);
    }
    if (valor(el.idioma)) partes.push(`idioma de instrucción: ${valor(el.idioma)}`);
    if (valor(el.idiomaMaterno)) partes.push(`idioma materno: ${valor(el.idiomaMaterno)}`);
    const linea = partes.length ? `${partes.join(" · ")}. ` : "";
    return `${linea}${valor(el.contexto) || ""}`.trim();
  }

  function actualizar() {
    const comp = competenciaActual();
    const ind = indicadorActual();
    const saberes = saberesSeleccionados();
    const { plan } = estado;

    const datos = {
      establecimiento: valor(el.establecimiento) || "Establecimiento educativo",
      docente: valor(el.docente) || "",
      fecha: fechaLarga(valor(el.fecha)) || "",
      curso: `${CURSO} · ${gradoYSeccion()}`,
      duracion: duracionDeLaClase(),
      contexto: contextoDeLaClase()
    };

    el.tabInstrumentoNombre.textContent = el.evalInstrumento.value;

    if (!plan) {
      el.docSecuencia.innerHTML = Documento.html({ datos, competencia: comp, indicador: ind, saberes, plan: null });
      el.docInstrumento.innerHTML = `<header class="doc-head"><h2>${escapar(el.evalInstrumento.value)}</h2></header>
        <p class="doc-vacio">Elija la competencia y el indicador de logro (sección 3) para generar el instrumento con sus criterios.</p>`;
      return;
    }

    const tiempo = Nucleo.cronograma(plan);
    const criterios = Nucleo.criteriosActivos(plan, saberes.map((s) => s.code), puntosTotales());
    const evaluacion = {
      tipo: el.evalTipo.value,
      tecnica: el.evalTecnica.value,
      instrumento: el.evalInstrumento.value,
      total: puntosTotales(),
      criterios
    };

    resumirTiempo(tiempo);
    resumirCobertura(saberes);

    el.docSecuencia.innerHTML = Documento.html({
      ...evaluacion, datos, competencia: comp, indicador: ind, saberes, plan, tiempo
    });
    el.docInstrumento.innerHTML = Instrumento.html({
      ...evaluacion,
      saberes: ind.saberes,
      competencia: comp,
      indicador: ind,
      tema: plan.tema,
      curso: CURSO,
      establecimiento: datos.establecimiento,
      docente: datos.docente,
      grado: gradoYSeccion(),
      fecha: datos.fecha,
      estudiantes: valor(el.estudiantes),
      cuadro: el.evalCuadro.checked
    });
  }

  /* ---------- Generar PDF ---------- */
  function revisarFaltantes(soloInstrumento) {
    const faltantes = [];
    if (!competenciaActual()) faltantes.push("la competencia");
    if (!indicadorActual()) faltantes.push("el indicador de logro");
    if (indicadorActual() && saberesSeleccionados().length === 0) faltantes.push("al menos un saber");
    if (puntosTotales() <= 0) faltantes.push("la ponderación");
    if (!soloInstrumento) {
      if (!valor(el.departamento)) faltantes.push("el departamento");
      if (!valor(el.idioma)) faltantes.push("el idioma de instrucción");
    }
    return faltantes;
  }

  function imprimir(soloInstrumento) {
    const faltantes = revisarFaltantes(soloInstrumento);
    if (faltantes.length) {
      avisar("Falta seleccionar " + faltantes.join(", ") + ".");
      return;
    }
    const titulo = document.title;
    const nombre = soloInstrumento ? el.evalInstrumento.value : "Secuencia didáctica";
    document.title = `${nombre} ${CURSO} ${indicadorActual().code}`;
    document.body.classList.toggle("solo-instrumento", soloInstrumento);
    window.addEventListener("afterprint", () => {
      document.title = titulo;
      document.body.classList.remove("solo-instrumento");
    }, { once: true });
    window.print();
  }

  el.btnPdf.addEventListener("click", () => imprimir(false));
  el.btnPdfInstrumento.addEventListener("click", () => imprimir(true));

  /* ---------- Limpiar ---------- */
  el.btnLimpiar.addEventListener("click", () => {
    if (!puedeDescartar()) return;
    el.formulario.reset();
    el.fecha.value = fechaDeHoy();
    el.hintIdiomas.hidden = true;
    [el.evalTipo, el.evalTecnica, el.evalInstrumento].forEach((c) => { delete c.dataset.elegido; });
    estado.competencia = "";
    estado.indicador = "";
    poblarIndicadores(null);
    cargarPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Actualización continua ----------
     Competencia e indicador se excluyen: el evento "input" llega antes que
     "change", cuando el plan cargado todavía no corresponde a la selección. */
  function alCambiarFormulario(evento) {
    if (evento.target === el.competencia || evento.target === el.indicador) return;
    actualizar();
  }
  el.formulario.addEventListener("input", alCambiarFormulario);
  el.formulario.addEventListener("change", alCambiarFormulario);

  /* ---------- Estado inicial ---------- */
  el.fecha.value = fechaDeHoy();
  el.grado.value = GRADO_BASE;
  actualizar();
})();

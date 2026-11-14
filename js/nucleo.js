/* ============================================================
   nucleo.js — Funciones puras compartidas
   No toca la página: reparte minutos y puntos, y relaciona los
   pasos de la clase con los criterios de evaluación.
   ============================================================ */
const Nucleo = (() => {
  "use strict";

  const MOMENTOS = [
    { clave: "inicio",     nombre: "Inicio" },
    { clave: "desarrollo", nombre: "Desarrollo" },
    { clave: "cierre",     nombre: "Cierre" }
  ];

  function escapar(txt) {
    return String(txt).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  const sumar = (lista) => lista.reduce((a, b) => a + b, 0);

  /* Reparte "total" en proporción a los pesos, en múltiplos de "paso".
     Usa el método del mayor residuo para que la suma coincida con el total.
     Si "minimo" obliga a subir un valor, se descuenta de los más grandes. */
  function repartir(total, pesos, paso = 1, minimo = 0) {
    if (pesos.length === 0) return [];
    const base = sumar(pesos) > 0 ? pesos : pesos.map(() => 1);
    const unidades = Math.round(total / paso);
    const exactos = base.map((p) => (p / sumar(base)) * unidades);
    const partes = exactos.map(Math.floor);

    exactos
      .map((valor, i) => ({ i, residuo: valor - Math.floor(valor) }))
      .sort((a, b) => b.residuo - a.residuo)
      .slice(0, unidades - sumar(partes))
      .forEach(({ i }) => { partes[i] += 1; });

    const piso = Math.ceil(minimo / paso);
    const ajustadas = partes.map((u) => Math.max(u, piso));
    let exceso = sumar(ajustadas) - unidades;
    while (exceso > 0) {
      const mayor = ajustadas.indexOf(Math.max(...ajustadas));
      if (ajustadas[mayor] <= piso) break;
      ajustadas[mayor] -= 1;
      exceso -= 1;
    }
    return ajustadas.map((u) => Number((u * paso).toFixed(2)));
  }

  /* ---------- Tiempos de la clase ---------- */
  function pasosDe(plan) {
    return MOMENTOS.flatMap(({ clave }) => plan.pasos[clave]);
  }

  /* Los pesos conservan la proporción original para que subir y bajar
     los periodos no acumule errores de redondeo. */
  function fijarPesos(plan) {
    pasosDe(plan).forEach((p) => { p.peso = Number(p.min) || 0; });
  }

  function ajustarTiempos(plan, total) {
    const pasos = pasosDe(plan);
    const minutos = repartir(total, pasos.map((p) => p.peso), 1, 1);
    pasos.forEach((p, i) => { p.min = minutos[i]; });
  }

  /* Numera los pasos y calcula en qué minuto empieza y termina cada uno. */
  function cronograma(plan) {
    let reloj = 0;
    let numero = 0;
    return MOMENTOS.map(({ clave, nombre }) => {
      const desde = reloj;
      const pasos = plan.pasos[clave].map((paso) => {
        const inicio = reloj;
        reloj += Number(paso.min) || 0;
        numero += 1;
        return { paso, numero, desde: inicio, hasta: reloj };
      });
      return { clave, nombre, desde, hasta: reloj, minutos: reloj - desde, pasos };
    });
  }

  /* ---------- Criterios de evaluación ---------- */

  /* Devuelve los criterios de los saberes marcados, con su etiqueta,
     sus puntos y los pasos de la clase donde se observan.
     Un criterio sin saber fue agregado por el docente y siempre se incluye. */
  function criteriosActivos(plan, codigosSaberes, puntosTotales) {
    const activos = plan.criterios.filter((c) => !c.saber || codigosSaberes.includes(c.saber));
    const paso = puntosTotales >= activos.length ? 0.5 : 0.25;
    const puntos = repartir(puntosTotales, activos.map((c) => Number(c.peso) || 0), paso);
    const lineaDeTiempo = cronograma(plan)
      .flatMap((m) => m.pasos.map((p) => ({ ...p, momento: m.nombre })));

    return activos.map((criterio, i) => {
      const observados = lineaDeTiempo.filter(({ paso: p }) => (p.evalua || []).includes(criterio.id));
      return {
        criterio,
        etiqueta: `C${i + 1}`,
        puntos: puntos[i],
        pasos: observados.map(({ numero }) => numero),
        actividades: observados.map(({ paso: p, momento }) => ({
          titulo: p.titulo || "Actividad sin título",
          momento
        }))
      };
    });
  }

  function puntosDeNivel(puntos, factor) {
    return Number((puntos * factor).toFixed(2));
  }

  /* Rangos de puntos de cada nivel de logro de la competencia. */
  function nivelesDeLogro(total, escala) {
    return escala.map((nivel, i) => {
      const desde = Number((total * nivel.desde).toFixed(2));
      const hasta = i === 0 ? total : Number((total * escala[i - 1].desde).toFixed(2));
      let rango;
      if (i === 0) rango = `${desde} a ${total}`;
      else if (nivel.desde === 0) rango = `menos de ${hasta}`;
      else rango = `${desde} a menos de ${hasta}`;
      return { ...nivel, puntosDesde: desde, rango };
    });
  }

  /* Saberes marcados que ningún criterio evalúa. */
  function saberesSinCriterio(plan, codigosSaberes) {
    return codigosSaberes.filter((code) => !plan.criterios.some((c) => c.saber === code));
  }

  return {
    MOMENTOS, escapar, repartir, pasosDe, fijarPesos, ajustarTiempos,
    cronograma, criteriosActivos, puntosDeNivel, nivelesDeLogro, saberesSinCriterio
  };
})();

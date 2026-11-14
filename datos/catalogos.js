/* ============================================================
   catalogos.js — Catálogos de contexto y escala de evaluación
   Debe cargarse antes que los archivos competencia-*.js.
   ============================================================ */

const CURSO = "Robótica";
const GRADO_BASE = "Cuarto Bachillerato";

/* ---- 22 departamentos de Guatemala ---- */
const DEPARTAMENTOS = [
  "Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "El Progreso",
  "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa",
  "Petén", "Quetzaltenango", "Quiché", "Retalhuleu", "Sacatepéquez",
  "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán", "Zacapa"
];

/* ---- Idiomas nacionales (Español, 22 mayas, Garífuna, Xinka) + extranjero ---- */
const IDIOMAS = [
  "Español",
  "Achi", "Akateko", "Awakateko", "Chalchiteko", "Ch'orti'", "Chuj", "Itza'",
  "Ixil", "Popti' (Jakalteko)", "Kaqchikel", "K'iche'", "Mam", "Mopan",
  "Poqomam", "Poqomchi'", "Q'anjob'al", "Q'eqchi'", "Sakapulteko",
  "Sipakapense", "Tektiteko", "Tz'utujil", "Uspanteko",
  "Garífuna", "Xinka",
  "Inglés"
];

/* ---- Idiomas con presencia comunitaria por departamento (orientativo) ---- */
const IDIOMAS_POR_DEPTO = {
  "Alta Verapaz":   ["Q'eqchi'", "Poqomchi'", "Achi"],
  "Baja Verapaz":   ["Achi", "Poqomchi'", "Q'eqchi'"],
  "Chimaltenango":  ["Kaqchikel"],
  "Chiquimula":     ["Ch'orti'"],
  "El Progreso":    [],
  "Escuintla":      [],
  "Guatemala":      ["Kaqchikel", "Poqomam"],
  "Huehuetenango":  ["Mam", "Q'anjob'al", "Chuj", "Akateko", "Popti' (Jakalteko)", "Tektiteko", "Awakateko", "Chalchiteko"],
  "Izabal":         ["Q'eqchi'", "Garífuna"],
  "Jalapa":         ["Poqomam", "Xinka"],
  "Jutiapa":        ["Xinka"],
  "Petén":          ["Q'eqchi'", "Itza'", "Mopan"],
  "Quetzaltenango": ["K'iche'", "Mam"],
  "Quiché":         ["K'iche'", "Ixil", "Uspanteko", "Sakapulteko", "Q'eqchi'"],
  "Retalhuleu":     ["K'iche'"],
  "Sacatepéquez":   ["Kaqchikel"],
  "San Marcos":     ["Mam", "Sipakapense"],
  "Santa Rosa":     ["Xinka"],
  "Sololá":         ["Kaqchikel", "K'iche'", "Tz'utujil"],
  "Suchitepéquez":  ["K'iche'", "Tz'utujil", "Kaqchikel"],
  "Totonicapán":    ["K'iche'"],
  "Zacapa":         ["Ch'orti'"]
};

/* ---- Niveles de desempeño, de mayor a menor ----
   "factor" es la parte de los puntos del criterio que otorga cada nivel. */
const NIVELES = [
  { nombre: "Destacado",  factor: 1 },
  { nombre: "Logrado",    factor: 0.75 },
  { nombre: "En proceso", factor: 0.5 },
  { nombre: "Inicial",    factor: 0.25 }
];

/* ---- Logro de la competencia ----
   "desde" es la parte mínima del total de puntos para alcanzar el nivel.
   "lograda" indica si el nivel cuenta como competencia alcanzada. */
const LOGRO_COMPETENCIA = [
  { nombre: "Lograda con excelencia", clave: "E", desde: 0.9, lograda: true,
    descripcion: "Demuestra lo que sabe, lo que hace y cómo actúa con autonomía, y puede apoyar a otros." },
  { nombre: "Lograda", clave: "L", desde: 0.7, lograda: true,
    descripcion: "Demuestra la competencia en los tres tipos de saber, con apoyo mínimo." },
  { nombre: "En proceso", clave: "P", desde: 0.5, lograda: false,
    descripcion: "Demuestra parte de la competencia; necesita refuerzo en los criterios más bajos." },
  { nombre: "Aún no lograda", clave: "N", desde: 0, lograda: false,
    descripcion: "Necesita volver a trabajar el indicador con acompañamiento del docente." }
];

/* ---- Tipos de saber, en el orden en que se evalúan ---- */
const TIPOS_SABER = [
  { tipo: "Declarativo",   titulo: "Lo que sabe",  detalle: "saber declarativo" },
  { tipo: "Procedimental", titulo: "Lo que hace",  detalle: "saber procedimental" },
  { tipo: "Actitudinal",   titulo: "Cómo actúa",   detalle: "saber actitudinal" }
];

/* ---- Malla curricular: cada archivo competencia-*.js agrega la suya ---- */
const COMPETENCIAS = [];

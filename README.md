# Generador de Secuencia Didáctica — Robótica

Herramienta web que entrega al docente una **guía de clase lista para ejecutar**
y el **instrumento de evaluación** derivado de las mismas competencias, en PDF.

Construida con HTML, CSS y JavaScript sin dependencias ni compilación.

## Qué genera

Al elegir competencia e indicador de logro se genera la secuencia con el formato
institucional:

1. **Datos generales**: fecha, curso, catedrático, tema principal, propósito,
   duración, contexto e **ideas clave** (cada concepto con su explicación y un ejemplo).
2. **Competencias, indicadores de logro y contenidos**: los saberes marcados.
3. **Recursos y materiales**, con lo que hay que preparar antes de la clase.
4. **Desarrollo de la secuencia**: inicio, desarrollo y cierre. Cada actividad
   indica sus minutos, qué hace el docente, qué dice, qué pregunta y qué respuesta
   esperar, qué hacen los estudiantes y qué verificar antes de avanzar. Cierra con
   qué hacer si algo falla y ajustes por tiempo o ritmo.
5. **Anotación de alumnos** que necesitan refuerzo o seguimiento.

Después vienen la **evaluación** (criterios, dónde se observa cada uno y la regla de
logro), las firmas y, en las competencias 2 y 3, el código de referencia para
Arduino UNO.

El **instrumento** (rúbrica por defecto; también lista de cotejo, escala de rango o
bitácora) agrupa los criterios en lo que sabe, lo que hace y cómo actúa. Indica en
qué actividad se observa cada uno y termina con el **logro de la competencia**:
lograda con excelencia, lograda, en proceso o aún no lograda, según el puntaje y
sin criterios en el nivel más bajo. Opcionalmente añade un cuadro de registro del grupo.

Los minutos se reparten según periodos × minutos por periodo, y los puntos según
los saberes marcados. Todo es editable; los cambios no alteran el banco de datos.

## Uso

Abra `index.html` en un navegador moderno. No requiere servidor.

1. Complete datos generales y contexto territorial y lingüístico.
2. Elija competencia, indicador y saberes.
3. Ajuste la guía y los criterios si lo desea.
4. **PDF completo** (guía + instrumento) o **PDF del instrumento** (solo para
   fotocopiar). En el diálogo elija *Guardar como PDF* y tamaño *Carta*.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html`, `estilos.css` | Formulario, documento y estilos de impresión |
| `datos/catalogos.js` | Departamentos, idiomas y niveles de desempeño |
| `datos/competencia-N.js` | Una competencia por archivo, con sus indicadores |
| `js/nucleo.js` | Reparto de minutos y puntos, cronograma |
| `js/documento.js` | Genera la guía de clase |
| `js/instrumento.js` | Genera los cuatro instrumentos |
| `js/editor.js` | Tarjetas de edición |
| `js/app.js` | Conecta formulario, estado y documento |
| `pruebas/validar.js` | Valida el banco curricular |

## Agregar una competencia

1. Cree `datos/competencia-4.js` con `COMPETENCIAS.push({ ... })`.
2. Añada su `<script>` en `index.html`, antes de `js/nucleo.js`.
3. Ejecute `node pruebas/validar.js`.

Cada indicador contiene `code`, `tema`, `texto`, `saberes`, `proposito`, `evaluacion`
(`tipo`, `tecnica`, `instrumento`), `recursos[]`, `preparacion[]`, `conceptos[]`
(`termino`, `explicacion`, `ejemplo`), `pasos` (`inicio`, `desarrollo`, `cierre`;
cada paso con `titulo`, `min`, `docente`, `diga`, `pregunte`, `espere`,
`estudiantes`, `verifique`, `evalua[]`), `dificultades[]`, `apoyo`, `reto`,
`siFalta`, `siSobra`, `codigo[]` (opcional) y `criterios[]` (`id`, `saber`, `peso`,
`texto`, `evidencia`, `niveles[4]`). Use `datos/competencia-1.js` como modelo.

El validador comprueba que los pasos sumen 80 minutos, que cada saber tenga
criterio, que cada criterio se observe en algún paso y que los cuatro
instrumentos se generen sin valores vacíos.

## Nota sobre los idiomas

La relación entre departamento y comunidades lingüísticas es orientativa y no
sustituye el diagnóstico sociolingüístico del centro educativo.

## Licencia

MIT

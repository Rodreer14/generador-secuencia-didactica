# Generador de Secuencia Didáctica — Robótica

Herramienta web para que un docente arme la secuencia didáctica de una clase
seleccionando competencia, indicador de logro y saberes de la malla curricular,
y la exporte en PDF lista para entregar.

Construida con HTML, CSS y JavaScript sin dependencias ni compilación.

## Qué hace

- Carga la malla curricular del curso de Robótica para cuarto bachillerato,
  estructurada según el CNB de Guatemala: competencia → indicador de logro → saberes.
- Filtra los indicadores de la competencia elegida y muestra sus saberes
  clasificados en declarativos, procedimentales y actitudinales.
- Precarga actividades de inicio, desarrollo y cierre redactadas para cada
  indicador, junto con recursos y criterios de evaluación. Todo es editable.
- Contextualiza la clase por departamento, municipio, área e idioma. Incluye los
  22 departamentos y los 25 idiomas nacionales, y sugiere las comunidades
  lingüísticas presentes en el departamento seleccionado.
- Genera el documento en PDF mediante la hoja de estilos de impresión, en
  tamaño carta y con texto seleccionable.

## Uso

Abra `index.html` en cualquier navegador moderno. No requiere servidor,
instalación ni conexión a internet.

1. Complete los datos generales y el contexto territorial y lingüístico.
2. Elija la competencia, el indicador de logro y marque los saberes de la clase.
3. Ajuste las actividades precargadas según su grupo.
4. Pulse **Generar PDF** y en el diálogo de impresión elija
   *Destino: Guardar como PDF* y *Tamaño: Carta*.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura del formulario y del documento |
| `estilos.css` | Diseño en pantalla y hoja de estilos de impresión |
| `datos.js` | Banco curricular y catálogos de departamentos e idiomas |
| `app.js` | Lógica de la aplicación |

## Agregar competencias o cambiar de curso

Todo el contenido curricular está aislado en `datos.js`. La lógica no necesita
modificarse. Cada competencia sigue esta estructura:

```js
{
  num: 4,
  eje: "Nombre corto del eje",
  texto: "Redacción completa de la competencia.",
  indicadores: [
    {
      code: "4.1",
      texto: "Redacción del indicador de logro.",
      saberes: [
        { code: "4.1.1", tipo: "Declarativo",   texto: "..." },
        { code: "4.1.2", tipo: "Procedimental", texto: "..." },
        { code: "4.1.3", tipo: "Actitudinal",   texto: "..." }
      ],
      inicio:     "Actividades sugeridas de inicio.",
      desarrollo: "Actividades sugeridas de desarrollo.",
      cierre:     "Actividades sugeridas de cierre.",
      recursos:   "Materiales previstos.",
      criterios:  "Criterios de evaluación."
    }
  ]
}
```

Para cambiar de curso, modifique la constante `CURSO` al inicio de `datos.js`.

## Nota sobre los idiomas

La relación entre departamento y comunidades lingüísticas es orientativa y sirve
para que el docente confirme cuál corresponde a su población estudiantil. No
sustituye el diagnóstico sociolingüístico del centro educativo.

## Licencia

MIT

/* ============================================================
   datos.js — Banco curricular y catálogos de contexto
   Edite este archivo para agregar competencias o cursos.
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

/* ============================================================
   Malla curricular — Robótica, nivel de aplicación (Bloom)
   ============================================================ */
const COMPETENCIAS = [
{
  num: 1,
  eje: "Montaje de circuitos",
  texto: "Aplica los principios de funcionamiento de los componentes electrónicos básicos en el montaje de circuitos, guiándose por diagramas esquemáticos, para obtener sistemas funcionales.",
  indicadores: [
    {
      code: "1.1",
      texto: "Interpreta la simbología de un diagrama esquemático al trasladarlo a un montaje físico.",
      saberes: [
        { code: "1.1.1", tipo: "Declarativo",   texto: "Simbología normalizada de resistencias, LED, capacitores, fuentes, interruptores y tierra; concepto de nodo y rama." },
        { code: "1.1.2", tipo: "Procedimental", texto: "Lectura e interpretación de esquemas y trazado de la correspondencia entre símbolo y componente físico." },
        { code: "1.1.3", tipo: "Actitudinal",   texto: "Atención al detalle en la lectura técnica." }
      ],
      inicio: "Se presentan tres esquemas sencillos en el pizarrón y se pide a los estudiantes nombrar los símbolos que ya reconocen. Se registran los aciertos y las dudas en dos columnas para hacer visible el punto de partida del grupo.",
      desarrollo: "En parejas, los estudiantes reciben una hoja con un diagrama esquemático y la caja de componentes correspondiente. Primero marcan sobre el esquema cada símbolo con el nombre del componente físico; después arman el circuito sobre la protoboard siguiendo el trazado. El docente recorre los equipos verificando la correspondencia símbolo-componente antes de autorizar la energización.",
      cierre: "Cada pareja intercambia su montaje con otra y verifica si corresponde al esquema entregado. Se cierra con la pregunta: ¿qué símbolo les costó más identificar y por qué?",
      recursos: "Protoboard, cables jumper, resistencias, LED, pulsadores, hojas con diagramas esquemáticos impresos, lápiz.",
      criterios: "Identifica correctamente al menos el 80% de los símbolos del esquema. Traslada el diagrama a la protoboard sin invertir conexiones. Revisa su trabajo antes de solicitar la verificación docente."
    },
    {
      code: "1.2",
      texto: "Conecta los componentes respetando polaridad, valores de resistencia y niveles de voltaje requeridos.",
      saberes: [
        { code: "1.2.1", tipo: "Declarativo",   texto: "Corriente, voltaje y resistencia; ley de Ohm; código de colores; componentes polarizados y no polarizados." },
        { code: "1.2.2", tipo: "Procedimental", texto: "Identificación de terminales, cálculo de resistencia limitadora y armado ordenado del circuito." },
        { code: "1.2.3", tipo: "Actitudinal",   texto: "Cuidado en el manejo de componentes y responsabilidad con el equipo del laboratorio." }
      ],
      inicio: "Se muestra un LED quemado y se plantea el problema: ¿por qué falló? Lluvia de ideas breve para recuperar lo que el grupo sabe sobre corriente y resistencia.",
      desarrollo: "El docente modela el cálculo de la resistencia limitadora con la ley de Ohm para un LED de 2 V a 20 mA alimentado con 5 V. Luego cada equipo calcula el valor para su propio caso, lo localiza por código de colores y arma el circuito respetando la polaridad del LED. Antes de energizar, cada equipo justifica ante el docente por qué eligió esa resistencia.",
      cierre: "Puesta en común de los valores calculados por cada equipo. Se discute qué pasaría con una resistencia menor y con una mayor, y se registra la conclusión en la bitácora.",
      recursos: "Protoboard, LED, resistencias surtidas, fuente de 5 V, calculadora, tabla de código de colores, bitácora de laboratorio.",
      criterios: "Calcula la resistencia limitadora con el procedimiento correcto. Respeta la polaridad de los componentes. Devuelve el material completo y en buen estado."
    },
    {
      code: "1.3",
      texto: "Comprueba la continuidad y el funcionamiento del circuito armado mediante instrumentos de medición.",
      saberes: [
        { code: "1.3.1", tipo: "Declarativo",   texto: "Función del multímetro; conceptos de continuidad, circuito abierto y cortocircuito." },
        { code: "1.3.2", tipo: "Procedimental", texto: "Uso del multímetro en sus escalas de continuidad, voltaje y resistencia, con registro de mediciones." },
        { code: "1.3.3", tipo: "Actitudinal",   texto: "Rigurosidad en la verificación previa a energizar el circuito." }
      ],
      inicio: "Demostración breve: el docente conecta un circuito con una falla deliberada y pregunta cómo podrían saber dónde está el problema sin desarmarlo.",
      desarrollo: "Se explica y modela el uso del multímetro en las escalas de continuidad, voltaje y resistencia. Cada equipo recibe un circuito armado y una tabla de registro; debe medir continuidad en cada rama, voltaje en tres puntos y el valor real de dos resistencias, anotando los datos. Se comparan los valores medidos con los valores esperados.",
      cierre: "Cada equipo reporta una discrepancia entre el valor esperado y el medido y propone una explicación. Se sistematizan las causas más frecuentes.",
      recursos: "Multímetro digital, circuitos armados, tabla de registro de mediciones, bitácora.",
      criterios: "Selecciona la escala adecuada del multímetro. Registra las mediciones con su unidad. Verifica el circuito antes de energizarlo."
    },
    {
      code: "1.4",
      texto: "Corrige los errores de conexión detectados hasta lograr el comportamiento esperado del circuito.",
      saberes: [
        { code: "1.4.1", tipo: "Declarativo",   texto: "Fallas comunes de montaje y sus síntomas." },
        { code: "1.4.2", tipo: "Procedimental", texto: "Revisión sistemática del circuito, aislamiento del punto de falla, reconexión y nueva prueba." },
        { code: "1.4.3", tipo: "Actitudinal",   texto: "Perseverancia ante el error y disposición a rehacer el trabajo." }
      ],
      inicio: "Se entrega a cada equipo un circuito con una falla introducida por el docente y se anuncia el reto: repararlo sin desarmarlo por completo.",
      desarrollo: "Los equipos aplican un protocolo de revisión en cuatro pasos: inspección visual, verificación de alimentación, prueba de continuidad por rama y aislamiento del punto de falla. Registran en la bitácora cada hipótesis y su resultado. Al corregir, documentan cuál era la falla y cómo la identificaron.",
      cierre: "Cada equipo expone en un minuto la falla encontrada y el paso del protocolo que la reveló. Se construye en el pizarrón un listado colectivo de fallas frecuentes.",
      recursos: "Circuitos con fallas preparadas, multímetro, protocolo de revisión impreso, bitácora.",
      criterios: "Aplica el protocolo en orden en lugar de reconectar al azar. Documenta la falla y la corrección. Persiste ante los intentos fallidos."
    }
  ]
},
{
  num: 2,
  eje: "Programación del microcontrolador",
  texto: "Implementa estructuras secuenciales, condicionales y repetitivas en el microcontrolador, a partir de un algoritmo dado, para automatizar el prototipo.",
  indicadores: [
    {
      code: "2.1",
      texto: "Traduce un algoritmo dado a código ejecutable en el entorno de programación del microcontrolador.",
      saberes: [
        { code: "2.1.1", tipo: "Declarativo",   texto: "Algoritmo, pseudocódigo y diagrama de flujo; sintaxis básica del lenguaje; variables y tipos de dato." },
        { code: "2.1.2", tipo: "Procedimental", texto: "Conversión de pseudocódigo a instrucciones, declaración de variables y uso del entorno de desarrollo." },
        { code: "2.1.3", tipo: "Actitudinal",   texto: "Orden y claridad en la escritura de código." }
      ],
      inicio: "Se dicta al grupo un algoritmo cotidiano en pasos desordenados y se pide reordenarlo. Sirve para recuperar la noción de secuencia antes de pasar al código.",
      desarrollo: "El docente entrega el pseudocódigo de una secuencia de encendido de tres LED. Cada estudiante lo traduce a código en el entorno de desarrollo, declarando las variables de pines y respetando la indentación. Se revisa en parejas antes de compilar: quien revisa señala errores de sintaxis sin corregirlos.",
      cierre: "Se proyectan dos soluciones distintas del mismo algoritmo y se comparan en legibilidad: nombres de variables, comentarios y estructura.",
      recursos: "Computadoras con el entorno de desarrollo, placas microcontroladoras, cables USB de datos, hoja con el pseudocódigo, LED y resistencias.",
      criterios: "Traduce cada paso del pseudocódigo sin omitir instrucciones. Declara variables con nombres significativos. Entrega código indentado y comentado."
    },
    {
      code: "2.2",
      texto: "Emplea estructuras condicionales para que el prototipo responda a distintos estados de entrada.",
      saberes: [
        { code: "2.2.1", tipo: "Declarativo",   texto: "Operadores relacionales y lógicos; estructuras if, if-else y anidadas." },
        { code: "2.2.2", tipo: "Procedimental", texto: "Construcción de condiciones y asignación de respuestas distintas según el estado de entrada." },
        { code: "2.2.3", tipo: "Actitudinal",   texto: "Pensamiento lógico y análisis previo a la codificación." }
      ],
      inicio: "Se plantea una situación del entorno escolar: una lámpara que debe encender solo cuando el aula esté ocupada. Los estudiantes enuncian en voz alta la condición en lenguaje natural.",
      desarrollo: "Se formaliza la condición en una tabla de verdad sencilla y se traduce a una estructura if-else. Cada equipo programa su placa para que un LED responda al estado de un pulsador, y luego amplía el caso con una segunda condición anidada. Se prueba cada versión antes de agregar complejidad.",
      cierre: "Cada equipo presenta su condición escrita en lenguaje natural y en código, y el grupo verifica que ambas digan lo mismo.",
      recursos: "Placas microcontroladoras, pulsadores, resistencias, LED, protoboard, computadoras.",
      criterios: "Formula la condición antes de codificar. Usa el operador relacional adecuado. El prototipo responde de forma distinta a cada estado de entrada."
    },
    {
      code: "2.3",
      texto: "Aplica estructuras repetitivas para automatizar tareas que requieren ejecución continua o cíclica.",
      saberes: [
        { code: "2.3.1", tipo: "Declarativo",   texto: "Ciclos for, while y do-while; contadores, acumuladores y condición de salida." },
        { code: "2.3.2", tipo: "Procedimental", texto: "Selección del ciclo adecuado, control de iteraciones y prevención de bucles infinitos." },
        { code: "2.3.3", tipo: "Actitudinal",   texto: "Eficiencia y economía en la solución planteada." }
      ],
      inicio: "Se muestra un código de veinte líneas que hace parpadear un LED diez veces por repetición manual. Se pregunta al grupo cómo reducirlo.",
      desarrollo: "Se presentan los tres tipos de ciclo y el criterio para elegir entre ellos. Cada equipo reescribe el código inicial con un ciclo for, luego programa una secuencia de barrido sobre cinco LED y finalmente implementa un contador que detenga el ciclo al llegar a un número de repeticiones. Se discute qué ocurre si falta la condición de salida.",
      cierre: "Comparación por equipos del número de líneas antes y después. Se registra la conclusión sobre economía del código.",
      recursos: "Placas microcontroladoras, cinco LED por equipo, resistencias, protoboard, computadoras.",
      criterios: "Elige el ciclo adecuado al caso. Define correctamente la condición de salida. Reduce la extensión del código sin perder funcionalidad."
    },
    {
      code: "2.4",
      texto: "Carga y ejecuta el programa en el microcontrolador verificando que el prototipo cumpla la secuencia prevista.",
      saberes: [
        { code: "2.4.1", tipo: "Declarativo",   texto: "Proceso de compilación y carga; errores de sintaxis frente a errores de lógica." },
        { code: "2.4.2", tipo: "Procedimental", texto: "Compilación, carga al microcontrolador, observación del comportamiento y corrección de código." },
        { code: "2.4.3", tipo: "Actitudinal",   texto: "Tolerancia a la frustración y constancia en la depuración." }
      ],
      inicio: "Se proyecta un mensaje de error de compilación real y se pregunta qué información útil contiene. Se distingue entre error de sintaxis y error de lógica.",
      desarrollo: "Cada equipo recibe un programa que compila pero no hace lo previsto. Debe cargarlo, observar el comportamiento del prototipo, formular una hipótesis sobre la causa y corregir. El docente acompaña con preguntas en lugar de dar la solución. Se registra en la bitácora cada hipótesis probada.",
      cierre: "Se comparten las hipótesis que resultaron falsas y lo que se aprendió de ellas. Se insiste en que el error descartado también es información.",
      recursos: "Computadoras, placas microcontroladoras, cables USB, programas con errores preparados, bitácora.",
      criterios: "Distingue error de sintaxis de error de lógica. Formula hipótesis antes de modificar el código. Logra que el prototipo cumpla la secuencia prevista."
    }
  ]
},
{
  num: 3,
  eje: "Lectura de sensores",
  texto: "Utiliza sensores en la lectura de variables del entorno, mediante rutinas de adquisición y calibración, para generar respuestas según los umbrales definidos.",
  indicadores: [
    {
      code: "3.1",
      texto: "Conecta sensores al microcontrolador según el esquema de alimentación y señal correspondiente.",
      saberes: [
        { code: "3.1.1", tipo: "Declarativo",   texto: "Señal analógica y digital; pines de alimentación, tierra y señal; tipos de sensores de uso común." },
        { code: "3.1.2", tipo: "Procedimental", texto: "Identificación de terminales del sensor y conexión según hoja de datos o esquema." },
        { code: "3.1.3", tipo: "Actitudinal",   texto: "Precaución al energizar y respeto por las especificaciones técnicas." }
      ],
      inicio: "Se colocan cuatro sensores sobre la mesa y se pide al grupo anticipar qué mide cada uno y cuántos cables necesita. Se contrastan las respuestas con la hoja de datos.",
      desarrollo: "Se explica la diferencia entre señal analógica y digital con dos ejemplos concretos. Cada equipo localiza en la hoja de datos los terminales de su sensor, lo conecta a la placa y justifica por qué usó un pin analógico o digital. El docente verifica cada conexión antes de energizar.",
      cierre: "Cada equipo dibuja en la bitácora el esquema de conexión de su sensor y lo rotula. Los dibujos se revisan entre pares.",
      recursos: "Sensores analógicos y digitales, placas microcontroladoras, protoboard, cables jumper, hojas de datos impresas, bitácora.",
      criterios: "Identifica los terminales a partir de la hoja de datos. Conecta el sensor al tipo de pin correcto. Solicita verificación antes de energizar."
    },
    {
      code: "3.2",
      texto: "Obtiene lecturas del entorno y las visualiza mediante el monitor serial u otro medio de salida.",
      saberes: [
        { code: "3.2.1", tipo: "Declarativo",   texto: "Conversión analógico-digital; rango de valores de lectura; función del monitor serial." },
        { code: "3.2.2", tipo: "Procedimental", texto: "Uso de instrucciones de lectura, impresión de datos y registro de valores observados." },
        { code: "3.2.3", tipo: "Actitudinal",   texto: "Honestidad en el registro de los datos obtenidos." }
      ],
      inicio: "Se pregunta al grupo qué número creen que entrega un sensor de luz en el aula iluminada y a oscuras. Se anotan las predicciones en el pizarrón.",
      desarrollo: "Se explica la conversión analógico-digital y el rango de valores de la placa. Cada equipo programa la lectura del sensor y la impresión en el monitor serial, y luego toma diez lecturas en tres condiciones distintas, registrándolas en una tabla. Se comparan los datos reales con las predicciones iniciales.",
      cierre: "Puesta en común de las tablas. Se discute por qué dos equipos con el mismo sensor obtuvieron valores distintos y qué factores del entorno influyeron.",
      recursos: "Sensores, placas microcontroladoras, computadoras con monitor serial, tabla de registro, linterna o fuente de luz.",
      criterios: "Programa correctamente la rutina de lectura. Registra los valores reales obtenidos, incluidos los inesperados. Relaciona el dato con la condición del entorno."
    },
    {
      code: "3.3",
      texto: "Ajusta los valores de umbral del sensor a partir de las mediciones registradas en pruebas.",
      saberes: [
        { code: "3.3.1", tipo: "Declarativo",   texto: "Conceptos de umbral, calibración, ruido y margen de tolerancia." },
        { code: "3.3.2", tipo: "Procedimental", texto: "Toma de mediciones en distintas condiciones, comparación de valores y definición del umbral." },
        { code: "3.3.3", tipo: "Actitudinal",   texto: "Disposición a repetir pruebas hasta obtener datos confiables." }
      ],
      inicio: "Se plantea el problema: con los datos de la clase anterior, ¿a partir de qué valor diremos que está oscuro? Se evidencia que no hay un único número correcto.",
      desarrollo: "Se introducen los conceptos de umbral, ruido y margen de tolerancia. Cada equipo toma mediciones en las condiciones extremas de su variable, calcula el promedio de cada condición y define un umbral intermedio con su margen. Documenta el procedimiento y repite la prueba para verificar que el umbral se sostiene.",
      cierre: "Cada equipo defiende el umbral que eligió con los datos que lo respaldan. Se señala que un umbral sin datos detrás es una suposición.",
      recursos: "Sensores, placas, computadoras, tabla de registro, calculadora, elementos para generar las condiciones extremas.",
      criterios: "Toma mediciones en más de una condición. Fundamenta el umbral con los datos registrados. Repite la prueba para verificar la estabilidad del valor."
    },
    {
      code: "3.4",
      texto: "Programa la respuesta del sistema cuando la lectura supera o cae por debajo del umbral establecido.",
      saberes: [
        { code: "3.4.1", tipo: "Declarativo",   texto: "Relación entrada-proceso-salida; condicionales aplicados a datos de sensor." },
        { code: "3.4.2", tipo: "Procedimental", texto: "Integración de lectura y condicional, activación de actuadores o señales de salida y prueba del sistema completo." },
        { code: "3.4.3", tipo: "Actitudinal",   texto: "Iniciativa para proponer usos prácticos del sistema." }
      ],
      inicio: "Se recupera el esquema entrada-proceso-salida y se pide al grupo ubicar en él lo trabajado en las clases anteriores.",
      desarrollo: "Cada equipo integra en un solo programa la lectura del sensor, la comparación contra su umbral y la activación de un actuador. Prueban el sistema completo en condiciones reales y ajustan el umbral si la respuesta resulta inestable. Luego proponen por escrito una aplicación del sistema útil para su comunidad.",
      cierre: "Demostración del sistema funcionando por equipo y presentación de la aplicación propuesta. El grupo valora cuál respondería mejor a una necesidad real del entorno.",
      recursos: "Sensores, actuadores (LED, zumbador, servomotor o motor DC con driver), placas, protoboard, fuente de alimentación independiente, computadoras.",
      criterios: "Integra lectura, condicional y salida en un solo programa. El sistema responde correctamente al cruzar el umbral. Propone una aplicación pertinente al contexto local."
    }
  ]
}
];

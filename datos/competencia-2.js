/* ============================================================
   Competencia 2 — Programación del microcontrolador
   Los ejemplos de código están escritos para Arduino UNO o compatible.
   Si usa otra placa, ajuste los pines en la sección "codigo".
   ============================================================ */
COMPETENCIAS.push({
  num: 2,
  eje: "Programación del microcontrolador",
  texto: "Implementa estructuras secuenciales, condicionales y repetitivas en el microcontrolador, a partir de un algoritmo dado, para automatizar el prototipo.",
  indicadores: [

  /* ------------------------------------------------------------ 2.1 */
  {
    code: "2.1",
    tema: "Del algoritmo al código del microcontrolador",
    texto: "Traduce un algoritmo dado a código ejecutable en el entorno de programación del microcontrolador.",
    saberes: [
      { code: "2.1.1", tipo: "Declarativo",   texto: "Algoritmo, pseudocódigo y diagrama de flujo; sintaxis básica del lenguaje; variables y tipos de dato." },
      { code: "2.1.2", tipo: "Procedimental", texto: "Conversión de pseudocódigo a instrucciones, declaración de variables y uso del entorno de desarrollo." },
      { code: "2.1.3", tipo: "Actitudinal",   texto: "Orden y claridad en la escritura de código." }
    ],
    proposito: "Al terminar la clase, cada estudiante traduce a código el pseudocódigo de una secuencia de tres LED, con nombres significativos, indentación y comentarios.",
    evaluacion: { tipo: "Formativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por pareja: 1 computadora con el entorno de desarrollo instalado, 1 placa y 1 cable USB de datos.",
      "Por pareja: 1 protoboard con 3 LED y 3 resistencias de 220 Ω conectados a los pines 8, 9 y 10.",
      "Por estudiante: hoja con el pseudocódigo.",
      "Para el docente: proyector o pizarrón y 8 tarjetas con los pasos de un algoritmo cotidiano."
    ],
    preparacion: [
      "Instale el entorno en todas las computadoras y cargue el ejemplo Blink en al menos una placa para confirmar que placa, puerto y cable funcionan.",
      "Arme o pida armar con anticipación los tres LED en los pines 8, 9 y 10, cada uno con su resistencia y con el cátodo a GND.",
      "Prepare tarjetas con los pasos desordenados de preparar café: hervir agua, servir en la taza, agregar café, agregar azúcar, mover, tomar la taza, llenar la olla y encender la estufa.",
      "Imprima el pseudocódigo incluido en la sección de código de referencia.",
      "Compruebe que los cables USB transmiten datos: algunos solo cargan y la placa no aparece en el entorno."
    ],
    conceptos: [
      { termino: "Algoritmo", explicacion: "Lista finita y ordenada de pasos para resolver un problema.", ejemplo: "Una receta de cocina." },
      { termino: "Pseudocódigo", explicacion: "Algoritmo escrito en lenguaje cotidiano, sin reglas de un lenguaje de programación.", ejemplo: "Encender LED rojo. Esperar 1 segundo." },
      { termino: "Diagrama de flujo", explicacion: "Representación gráfica del algoritmo: óvalo para inicio y fin, rectángulo para proceso y rombo para decisión.", ejemplo: "Como un mapa de instrucciones con flechas." },
      { termino: "Variable y constante", explicacion: "Nombre que guarda un dato. Una constante no cambia durante el programa.", ejemplo: "const int LED_ROJO = 8; guarda el número de pin con un nombre fácil de leer." },
      { termino: "setup() y loop()", explicacion: "setup() se ejecuta una vez al iniciar; loop() se repite sin parar.", ejemplo: "setup es preparar el aula en la mañana; loop es la rutina que se repite cada periodo." },
      { termino: "Sintaxis", explicacion: "Reglas de escritura del lenguaje: punto y coma, llaves y distinción entre mayúsculas y minúsculas.", ejemplo: "digitalWrite funciona; digitalwrite produce un error." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Ordenar un algoritmo cotidiano", min: 10,
          docente: "Pegue las tarjetas desordenadas en el pizarrón. Pida a voluntarios reordenarlas y pregunte qué pasa si se cambia un paso.",
          diga: "Una computadora hace exactamente lo que le decimos y en el orden en que se lo decimos. Si servimos el café antes de hervir el agua, el error es nuestro.",
          pregunte: "¿Qué pasaría si intercambiamos servir en la taza con hervir agua?",
          espere: "El resultado sale mal aunque cada paso esté bien escrito: el orden importa.",
          estudiantes: "Reordenan las tarjetas y justifican la secuencia.",
          verifique: "El grupo explica que un algoritmo depende del orden de sus pasos."
        },
        {
          titulo: "Del algoritmo al código", min: 5,
          docente: "Escriba el propósito. Muestre una línea de pseudocódigo junto a su instrucción equivalente.",
          diga: "Hoy traducimos. Encender el LED rojo se escribe digitalWrite(LED_ROJO, HIGH). Igual que un idioma, tiene reglas.",
          estudiantes: "Copian el propósito y comparan las dos formas de escribir.",
          verifique: "Pueden señalar qué parte de la instrucción indica el LED y cuál la acción.",
          evalua: ["c1"]
        }
      ],
      desarrollo: [
        {
          titulo: "Partes de un programa", min: 12,
          docente: "Abra el entorno frente al grupo. Declare las tres constantes, escriba setup() y un solo LED en loop(). Compile y cargue explicando cada botón.",
          diga: "Primero le pongo nombre a los pines, luego los preparo en setup, y en loop va lo que se repite. Verificar revisa la escritura; Subir lo envía a la placa.",
          pregunte: "¿Por qué escribimos LED_ROJO en lugar de solo 8?",
          espere: "Porque es más fácil de leer y, si cambia el pin, se modifica en un solo lugar.",
          estudiantes: "Siguen la demostración e identifican las partes del programa.",
          verifique: "Pueden decir qué va en setup() y qué va en loop().",
          evalua: ["c1"]
        },
        {
          titulo: "Traducción individual", min: 20,
          docente: "Entregue el pseudocódigo. Pida marcar cada renglón al traducirlo. Recorra el aula observando la indentación y los nombres.",
          diga: "Cada renglón del pseudocódigo debe convertirse en una instrucción. Comenten con // lo que hace cada bloque.",
          pregunte: "Si alguien se atasca: ¿qué renglón estás traduciendo y qué instrucción hace esa acción?",
          espere: "Señala el renglón y usa digitalWrite o delay según el caso.",
          estudiantes: "Traducen el pseudocódigo, declaran constantes y comentan su programa.",
          verifique: "Cada renglón del pseudocódigo está marcado y el código aún no se ha cargado.",
          evalua: ["c2", "c3", "c4"]
        },
        {
          titulo: "Revisión entre pares", min: 8,
          docente: "Forme parejas de revisión. Quien revisa señala los errores, pero no los corrige ni toca el teclado.",
          diga: "Revisen punto y coma, llaves y mayúsculas. Señalen dónde está el error, pero que lo corrija quien escribió el código.",
          estudiantes: "Revisan el código ajeno con la lista de sintaxis y corrigen el propio.",
          verifique: "Cada estudiante recibió al menos un comentario de su par.",
          evalua: ["c4"]
        },
        {
          titulo: "Compilar y cargar", min: 10,
          docente: "Pida seleccionar la placa y el puerto, verificar y subir. Ayude a leer los mensajes de error sin resolverlos.",
          diga: "Si aparece un error, lean la línea indicada y también la anterior. El mensaje está ayudando, no regañando.",
          estudiantes: "Compilan, corrigen, cargan y observan la secuencia de los LED.",
          verifique: "Los tres LED encienden en el orden del pseudocódigo.",
          evalua: ["c3"]
        }
      ],
      cierre: [
        {
          titulo: "Comparación de soluciones", min: 10,
          docente: "Proyecte dos soluciones que funcionen y compárelas por nombres, comentarios y estructura.",
          pregunte: "Ambas funcionan. ¿Cuál entendería mejor alguien que no la escribió y por qué?",
          espere: "La que usa nombres claros, indentación y comentarios.",
          estudiantes: "Comparan los programas y proponen una mejora concreta.",
          verifique: "Mencionan al menos dos características de un código legible."
        },
        {
          titulo: "Entrega y síntesis", min: 5,
          docente: "Pida guardar el archivo con su nombre y el indicador. Formule la síntesis.",
          diga: "Un programa se escribe una vez y se lee muchas. Escribimos para que otras personas también entiendan.",
          estudiantes: "Guardan su archivo y escriben en el cuaderno una regla de buena escritura.",
          verifique: "Todos los archivos quedaron guardados con el nombre acordado."
        }
      ]
    },
    dificultades: [
      { situacion: "La placa no aparece en la lista de puertos.", causa: "Cable USB solo de carga, controlador faltante o puerto dañado.", accion: "Cambie el cable. Si sigue igual, pruebe en otra computadora; las placas compatibles con chip CH340 necesitan su controlador." },
      { situacion: "Error: 'digitalwrite' was not declared in this scope.", causa: "Mayúsculas y minúsculas mal escritas.", accion: "Pida comparar la palabra con el ejemplo letra por letra." },
      { situacion: "Error: expected ';' before…", causa: "Falta un punto y coma en la línea anterior.", accion: "Pida leer la línea anterior a la señalada." },
      { situacion: "El programa carga, pero un LED no enciende.", causa: "LED invertido, pin distinto o falta su pinMode.", accion: "Pida comparar el pin físico con la constante y revisar setup()." },
      { situacion: "Los LED parecen encendidos a la vez.", causa: "Falta un delay o el tiempo es muy corto.", accion: "Pida revisar si después de cada encendido hay una espera." }
    ],
    apoyo: "Entregue el código con espacios en blanco para completar las instrucciones, manteniendo la estructura de setup() y loop().",
    reto: "Pida agregar una constante ESPERA que controle todos los tiempos y cambiar la secuencia desde un solo lugar.",
    siFalta: "Entregue setup() ya escrito y pida traducir solo loop(). Omita la revisión entre pares y revise en plenaria un solo programa.",
    siSobra: "Pida modificar la secuencia para que imite un semáforo con tiempos distintos.",
    codigo: [
      {
        titulo: "Pseudocódigo para entregar a los estudiantes",
        texto: `Definir pines: rojo = 8, amarillo = 9, verde = 10
Preparar los tres pines como salida
Repetir siempre:
  Encender rojo, esperar 1 segundo, apagar rojo
  Encender amarillo, esperar 1 segundo, apagar amarillo
  Encender verde, esperar 1 segundo, apagar verde`
      },
      {
        titulo: "Solución de referencia para el docente",
        texto: `// Secuencia de tres LED
const int LED_ROJO = 8;
const int LED_AMARILLO = 9;
const int LED_VERDE = 10;

void setup() {
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
}

void loop() {
  // Rojo
  digitalWrite(LED_ROJO, HIGH);
  delay(1000);
  digitalWrite(LED_ROJO, LOW);

  // Amarillo
  digitalWrite(LED_AMARILLO, HIGH);
  delay(1000);
  digitalWrite(LED_AMARILLO, LOW);

  // Verde
  digitalWrite(LED_VERDE, HIGH);
  delay(1000);
  digitalWrite(LED_VERDE, LOW);
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "2.1.1", peso: 2,
        texto: "Distingue algoritmo, pseudocódigo y código, e identifica las partes del programa.",
        evidencia: "Respuestas orales sobre setup(), loop() y constantes.",
        niveles: [
          "Explica cada concepto y por qué cada instrucción va en setup() o loop().",
          "Distingue los conceptos e identifica las partes del programa.",
          "Identifica las partes del programa, pero confunde los conceptos.",
          "No identifica las partes del programa."
        ]
      },
      {
        id: "c2", saber: "2.1.2", peso: 3,
        texto: "Traduce cada paso del pseudocódigo sin omitir instrucciones.",
        evidencia: "Pseudocódigo marcado y archivo del programa.",
        niveles: [
          "Traduce todos los pasos sin ayuda y mejora la solución propuesta.",
          "Traduce todos los pasos sin omisiones.",
          "Omite uno o dos pasos, o necesita orientación frecuente.",
          "Traduce menos de la mitad de los pasos."
        ]
      },
      {
        id: "c3", saber: "2.1.2", peso: 3,
        texto: "Compila y carga el programa, y este reproduce la secuencia del algoritmo.",
        evidencia: "Secuencia de LED funcionando en la placa.",
        niveles: [
          "Compila y carga por sí mismo, corrigiendo los errores a partir de los mensajes.",
          "Compila, carga y logra la secuencia correcta.",
          "Logra cargar el programa, pero la secuencia es parcial.",
          "No logra compilar el programa."
        ]
      },
      {
        id: "c4", saber: "2.1.3", peso: 2,
        texto: "Entrega código indentado, comentado y con nombres significativos.",
        evidencia: "Archivo del programa.",
        niveles: [
          "El código es claro para cualquier lector y sus comentarios explican el propósito.",
          "El código está indentado, comentado y tiene nombres significativos.",
          "Cumple solo una o dos de esas características.",
          "El código es desordenado y usa números o nombres sin significado."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 2.2 */
  {
    code: "2.2",
    tema: "Estructuras condicionales con entradas digitales",
    texto: "Emplea estructuras condicionales para que el prototipo responda a distintos estados de entrada.",
    saberes: [
      { code: "2.2.1", tipo: "Declarativo",   texto: "Operadores relacionales y lógicos; estructuras if, if-else y anidadas." },
      { code: "2.2.2", tipo: "Procedimental", texto: "Construcción de condiciones y asignación de respuestas distintas según el estado de entrada." },
      { code: "2.2.3", tipo: "Actitudinal",   texto: "Pensamiento lógico y análisis previo a la codificación." }
    ],
    proposito: "Al terminar la clase, cada equipo formula una condición en lenguaje natural, la traduce a if-else y logra que su prototipo responda de forma distinta a cada estado de entrada.",
    evaluacion: { tipo: "Formativa", tecnica: "Desempeño", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa y 1 cable USB de datos.",
      "Por equipo: 1 protoboard, 2 pulsadores, 2 resistencias de 10 kΩ, 1 LED, 1 resistencia de 220 Ω y cables jumper.",
      "Por equipo: hoja para la tabla de verdad.",
      "Para el docente: proyector o pizarrón y un montaje de muestra."
    ],
    preparacion: [
      "Arme el circuito de muestra: pulsador entre 5V y el pin 2, resistencia de 10 kΩ del pin 2 a GND, y LED con 220 Ω en el pin 8.",
      "Pruebe el código de referencia de las dos versiones en una placa.",
      "Dibuje el esquema de conexión en el pizarrón o imprímalo por equipo.",
      "Prepare la tabla de verdad vacía: columnas Aula ocupada, Está oscuro y Lámpara."
    ],
    conceptos: [
      { termino: "Condición", explicacion: "Pregunta cuya respuesta es verdadera o falsa.", ejemplo: "¿Está presionado el pulsador?" },
      { termino: "Operadores relacionales", explicacion: "Comparan dos valores: == igual, != distinto, > mayor, < menor, >= mayor o igual, <= menor o igual.", ejemplo: "estado == HIGH compara. estado = HIGH asigna y es un error frecuente." },
      { termino: "Operadores lógicos", explicacion: "Unen condiciones: && (y), || (o), ! (no).", ejemplo: "Lámpara encendida si ocupada && oscuro." },
      { termino: "if-else", explicacion: "Ejecuta un bloque si la condición es verdadera y otro si es falsa.", ejemplo: "Si llueve llevo paraguas; si no, llevo gorra." },
      { termino: "Condicional anidada", explicacion: "Un if dentro de otro: la segunda pregunta solo se hace si la primera se cumplió.", ejemplo: "Si hay clase, entonces reviso si llevo tarea." },
      { termino: "Resistencia pull-down", explicacion: "Mantiene el pin en LOW mientras el pulsador no se presiona. Sin ella, la lectura flota y cambia sola.", ejemplo: "Es un resorte que devuelve una puerta a su posición." },
      { termino: "Tabla de verdad", explicacion: "Lista todas las combinaciones de las entradas y la salida esperada.", ejemplo: "Con dos entradas hay cuatro combinaciones." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Situación del aula", min: 8,
          docente: "Plantee la situación y pida enunciar la condición en voz alta. Escriba la mejor redacción en el pizarrón.",
          diga: "La escuela quiere ahorrar energía: la lámpara debe encender solo cuando el aula esté ocupada. Díganme la regla en una oración que empiece con Si.",
          pregunte: "¿Qué debe pasar cuando el aula esté vacía?",
          espere: "Si el aula está ocupada, la lámpara enciende; si no, se apaga.",
          estudiantes: "Formulan la condición en lenguaje natural.",
          verifique: "La oración indica qué pasa en los dos casos, no solo en uno."
        },
        {
          titulo: "Propósito y análisis previo", min: 7,
          docente: "Escriba el propósito y la regla de trabajo de la clase.",
          diga: "Hoy nadie escribe código hasta tener la condición por escrito. Quien piensa primero, programa menos.",
          estudiantes: "Copian el propósito y forman equipos.",
          verifique: "Cada equipo tiene sus materiales y una hoja para la tabla de verdad."
        }
      ],
      desarrollo: [
        {
          titulo: "De la tabla de verdad al if-else", min: 12,
          docente: "Construya la tabla con una entrada. Traduzca cada fila a if-else frente al grupo. Explique la diferencia entre = y ==.",
          diga: "Cada fila de la tabla es un caso que el programa debe resolver. Un signo igual guarda un valor; dos signos igual comparan.",
          pregunte: "¿Qué valor devuelve digitalRead cuando se presiona el pulsador en este circuito?",
          espere: "HIGH, porque el pulsador conecta el pin con 5V.",
          estudiantes: "Copian la tabla y su traducción a código.",
          verifique: "Pueden señalar qué línea corresponde a cada fila de la tabla.",
          evalua: ["c1"]
        },
        {
          titulo: "Versión 1: un pulsador", min: 15,
          docente: "Pida armar según el esquema. Revise la resistencia de 10 kΩ antes de autorizar la carga.",
          diga: "Primero la tabla, luego el circuito, después el código. Prueben presionando y soltando el pulsador.",
          estudiantes: "Arman el circuito, programan el if-else y prueban los dos estados.",
          verifique: "El LED enciende solo con el pulsador presionado.",
          evalua: ["c2", "c4"]
        },
        {
          titulo: "Tabla de verdad con dos entradas", min: 8,
          docente: "Agregue la segunda condición: la lámpara enciende si el aula está ocupada y además está oscuro. Pida completar la tabla de cuatro filas.",
          diga: "Ahora hay dos preguntas. Antes de programar, completen las cuatro combinaciones.",
          pregunte: "¿En cuántas de las cuatro filas enciende la lámpara?",
          espere: "En una sola: aula ocupada y oscuro.",
          estudiantes: "Completan la tabla de verdad con dos entradas.",
          verifique: "Todas las tablas tienen cuatro filas y una sola salida encendida.",
          evalua: ["c4"]
        },
        {
          titulo: "Versión 2: condición anidada", min: 15,
          docente: "Pida agregar el segundo pulsador en el pin 3 y escribir la condición anidada. Recuérdeles probar las cuatro combinaciones.",
          diga: "No den por bueno el programa hasta probar cada fila de la tabla.",
          estudiantes: "Agregan el pulsador, programan el if anidado y marcan cada fila probada.",
          verifique: "Las cuatro combinaciones dan el resultado de la tabla.",
          evalua: ["c2", "c3"]
        }
      ],
      cierre: [
        {
          titulo: "Lenguaje natural y código", min: 10,
          docente: "Cada equipo lee su condición y muestra el código. El grupo verifica que digan lo mismo.",
          pregunte: "¿La oración y el código dicen lo mismo? ¿Hay algún caso que no esté cubierto?",
          espere: "Comparan condición por condición y señalan si falta algún caso.",
          estudiantes: "Presentan su condición y revisan la de otros equipos.",
          verifique: "Cada equipo presentó su condición en los dos lenguajes.",
          evalua: ["c3"]
        },
        {
          titulo: "Síntesis", min: 5,
          docente: "Muestre la versión con && y compárela con la anidada.",
          diga: "Las dos versiones hacen lo mismo. Lo importante es que la tabla, la oración y el código coincidan.",
          estudiantes: "Registran en el cuaderno cuándo usar if-else y cuándo usar &&.",
          verifique: "Saben escribir la condición doble con &&."
        }
      ]
    },
    dificultades: [
      { situacion: "El LED enciende y apaga solo, sin tocar el pulsador.", causa: "Pin flotante: falta la resistencia de 10 kΩ o está mal conectada.", accion: "Pida revisar la conexión entre el pin 2 y GND." },
      { situacion: "El LED siempre está encendido.", causa: "Se escribió = en lugar de == dentro del if, o el pulsador está mal orientado.", accion: "Pida revisar la condición y girar el pulsador 90°." },
      { situacion: "El LED nunca enciende.", causa: "Falta la conexión a 5V en el pulsador, o el pin del código no coincide.", accion: "Pida imprimir el estado con Serial.println o medir el pin con el multímetro." },
      { situacion: "Error: 'else' without a previous 'if'.", causa: "Llave mal cerrada o punto y coma después del if.", accion: "Pida usar Herramientas > Autoformato y revisar las llaves." },
      { situacion: "La lámpara funciona en tres casos y falla en uno.", causa: "Falta la rama else de una condición anidada.", accion: "Pida seguir el código fila por fila con la tabla de verdad." }
    ],
    apoyo: "Entregue el esqueleto del if-else con las condiciones en blanco y pida completar primero la tabla con ayuda de un compañero.",
    reto: "Pida reemplazar la resistencia externa por INPUT_PULLUP, invertir la lógica y agregar un segundo LED para indicar aula vacía.",
    siFalta: "Trabaje la versión 2 como demostración del docente y evalúe la versión 1 de cada equipo.",
    siSobra: "Pida una tercera condición: encender si el aula está ocupada y oscura, o si se presiona un botón de emergencia.",
    codigo: [
      {
        titulo: "Versión 1: un pulsador",
        texto: `const int PULSADOR = 2;
const int LAMPARA = 8;

void setup() {
  pinMode(PULSADOR, INPUT);
  pinMode(LAMPARA, OUTPUT);
}

void loop() {
  int ocupada = digitalRead(PULSADOR);

  if (ocupada == HIGH) {
    digitalWrite(LAMPARA, HIGH);
  } else {
    digitalWrite(LAMPARA, LOW);
  }
}`
      },
      {
        titulo: "Versión 2: dos entradas con condición anidada",
        texto: `const int PULSADOR_OCUPADA = 2;
const int PULSADOR_OSCURO = 3;
const int LAMPARA = 8;

void setup() {
  pinMode(PULSADOR_OCUPADA, INPUT);
  pinMode(PULSADOR_OSCURO, INPUT);
  pinMode(LAMPARA, OUTPUT);
}

void loop() {
  int ocupada = digitalRead(PULSADOR_OCUPADA);
  int oscuro = digitalRead(PULSADOR_OSCURO);

  if (ocupada == HIGH) {
    if (oscuro == HIGH) {
      digitalWrite(LAMPARA, HIGH);
    } else {
      digitalWrite(LAMPARA, LOW);
    }
  } else {
    digitalWrite(LAMPARA, LOW);
  }

  // Forma equivalente con operador lógico:
  // if (ocupada == HIGH && oscuro == HIGH) { ... }
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "2.2.1", peso: 2,
        texto: "Usa el operador relacional adecuado y distingue if, if-else y anidación.",
        evidencia: "Condiciones escritas en el programa.",
        niveles: [
          "Elige operadores correctos y explica la diferencia entre = y ==.",
          "Usa los operadores y las estructuras correctamente.",
          "Confunde = con == o usa la estructura con correcciones.",
          "No logra escribir una condición válida."
        ]
      },
      {
        id: "c2", saber: "2.2.2", peso: 3,
        texto: "El prototipo responde de forma distinta a cada estado de entrada.",
        evidencia: "Demostración del prototipo en todos los estados.",
        niveles: [
          "Funciona en las cuatro combinaciones y el equipo lo demuestra sin ayuda.",
          "Funciona en todas las combinaciones de la tabla.",
          "Funciona con un pulsador, pero falla en la versión anidada.",
          "No responde a la entrada."
        ]
      },
      {
        id: "c3", saber: "2.2.2", peso: 3,
        texto: "La condición en lenguaje natural y el código expresan lo mismo.",
        evidencia: "Presentación de la oración y del código.",
        niveles: [
          "Coinciden en todos los casos y el equipo detecta casos no previstos.",
          "Coinciden en todos los casos.",
          "Coinciden parcialmente: falta un caso.",
          "No coinciden."
        ]
      },
      {
        id: "c4", saber: "2.2.3", peso: 2,
        texto: "Formula la condición y la tabla de verdad antes de codificar.",
        evidencia: "Hoja con la tabla de verdad terminada antes de programar.",
        niveles: [
          "Completa la tabla sin ayuda, antes de codificar, y la usa para probar.",
          "Completa la tabla antes de codificar.",
          "Completa la tabla después de escribir el código.",
          "Programa sin analizar la condición."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 2.3 */
  {
    code: "2.3",
    tema: "Estructuras repetitivas: for, while y do-while",
    texto: "Aplica estructuras repetitivas para automatizar tareas que requieren ejecución continua o cíclica.",
    saberes: [
      { code: "2.3.1", tipo: "Declarativo",   texto: "Ciclos for, while y do-while; contadores, acumuladores y condición de salida." },
      { code: "2.3.2", tipo: "Procedimental", texto: "Selección del ciclo adecuado, control de iteraciones y prevención de bucles infinitos." },
      { code: "2.3.3", tipo: "Actitudinal",   texto: "Eficiencia y economía en la solución planteada." }
    ],
    proposito: "Al terminar la clase, cada equipo reescribe un programa repetitivo con un ciclo, programa un barrido de cinco LED y detiene la secuencia con un contador.",
    evaluacion: { tipo: "Formativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa y 1 cable USB de datos.",
      "Por equipo: 1 protoboard, 5 LED, 5 resistencias de 220 Ω y cables jumper.",
      "Para el docente: proyector o pizarrón y el programa de veinte líneas ya escrito."
    ],
    preparacion: [
      "Escriba el programa inicial: repite cinco veces las cuatro líneas de encender, esperar, apagar y esperar. Son veinte líneas dentro de setup().",
      "Conecte los cinco LED en los pines 8 a 12, cada uno con su resistencia, y pruebe las tres soluciones de referencia.",
      "Prepare una tabla en el pizarrón con las columnas Ciclo, Cuándo usarlo y Ejemplo."
    ],
    conceptos: [
      { termino: "Ciclo for", explicacion: "Se usa cuando se conoce el número de repeticiones. Tiene inicio, condición y cambio.", ejemplo: "for (int i = 0; i < 5; i++) repite 5 veces." },
      { termino: "Ciclo while", explicacion: "Revisa la condición antes de cada repetición. Puede no ejecutarse nunca.", ejemplo: "Mientras haya agua en la olla, sigue sirviendo." },
      { termino: "Ciclo do-while", explicacion: "Ejecuta primero y revisa después. Se ejecuta al menos una vez.", ejemplo: "Pruebo la sopa y, mientras le falte sal, agrego más." },
      { termino: "Contador", explicacion: "Variable que aumenta de uno en uno para llevar la cuenta.", ejemplo: "repeticiones = repeticiones + 1;" },
      { termino: "Acumulador", explicacion: "Variable que va sumando valores distintos.", ejemplo: "total = total + lectura;" },
      { termino: "Condición de salida", explicacion: "Regla que termina el ciclo.", ejemplo: "repeticiones < 3." },
      { termino: "Bucle infinito", explicacion: "Ciclo que nunca termina porque la condición de salida no llega a cumplirse.", ejemplo: "Un while donde el contador nunca aumenta." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "El programa largo", min: 8,
          docente: "Proyecte el programa de veinte líneas y cárguelo. Muestre que el LED parpadea cinco veces.",
          diga: "Este programa funciona, pero imaginen que ahora debe parpadear quinientas veces.",
          pregunte: "¿Qué líneas se repiten? ¿Cómo podríamos reducirlo?",
          espere: "Las cuatro líneas se repiten cinco veces; hay que indicar el número de repeticiones.",
          estudiantes: "Identifican el patrón que se repite.",
          verifique: "El grupo señala el bloque de cuatro líneas que se repite."
        },
        {
          titulo: "Propósito de la clase", min: 7,
          docente: "Escriba el propósito y pida anotar el número de líneas del programa inicial.",
          diga: "Un buen programador evita repetir. Hoy la computadora hará las repeticiones por nosotros.",
          estudiantes: "Registran que el programa inicial tiene veinte líneas de instrucciones.",
          verifique: "Todos tienen anotado el dato para comparar al final."
        }
      ],
      desarrollo: [
        {
          titulo: "Los tres ciclos", min: 12,
          docente: "Explique for, while y do-while con un ejemplo de cada uno. Complete la tabla. Señale las tres partes del for.",
          diga: "Si sé cuántas veces, uso for. Si depende de una condición, uso while. Si debe ocurrir por lo menos una vez, uso do-while.",
          pregunte: "Para esperar hasta que un sensor pase de cierto valor, ¿qué ciclo usarían?",
          espere: "while, porque no se conoce el número de repeticiones.",
          estudiantes: "Completan la tabla y resuelven dos casos de elección de ciclo.",
          verifique: "Eligen correctamente el ciclo para los dos casos propuestos.",
          evalua: ["c1"]
        },
        {
          titulo: "Reescritura con for", min: 10,
          docente: "Pida reescribir el programa de veinte líneas con un for. Recorra los equipos y revise la condición.",
          diga: "El LED debe parpadear igual que antes. Si el programa cambia su comportamiento, no es una mejora.",
          estudiantes: "Reescriben el programa, cargan y cuentan los parpadeos.",
          verifique: "El LED parpadea exactamente cinco veces y el código tiene menos líneas.",
          evalua: ["c2", "c4"]
        },
        {
          titulo: "Barrido de cinco LED", min: 15,
          docente: "Pida armar los cinco LED en los pines 8 a 12 y programar el barrido. Muestre que la variable del for puede ser el número de pin.",
          diga: "La variable del ciclo no tiene que llamarse i ni contar desde cero. Aquí será el número de pin.",
          pregunte: "Si un equipo se atasca: ¿qué valor toma pin en cada vuelta?",
          espere: "8, 9, 10, 11 y 12.",
          estudiantes: "Arman el circuito y programan el barrido con un ciclo.",
          verifique: "Los LED encienden uno tras otro, sin saltos.",
          evalua: ["c2", "c3"]
        },
        {
          titulo: "Contador y bucle infinito", min: 13,
          docente: "Pida detener el barrido después de tres vueltas con un contador. Luego pida borrar la línea del contador, observar qué ocurre y restaurarla.",
          diga: "Hagan la prueba: quiten la línea que aumenta el contador. Vean qué pasa y expliquen por qué.",
          pregunte: "¿Qué pasó al quitar la línea? ¿Por qué nunca se detiene?",
          espere: "El barrido sigue para siempre porque el contador no cambia y la condición siempre se cumple.",
          estudiantes: "Programan el contador, provocan el bucle infinito y registran la explicación.",
          verifique: "Con el contador restaurado, el barrido se detiene después de tres vueltas.",
          evalua: ["c3"]
        }
      ],
      cierre: [
        {
          titulo: "Comparación de líneas", min: 10,
          docente: "Pida reportar cuántas líneas tiene su versión. Escriba los datos y compare las soluciones más cortas y las más claras.",
          pregunte: "¿Cuántas líneas ahorraron? ¿Qué pasaría si el LED debiera parpadear quinientas veces?",
          espere: "Se ahorran unas catorce líneas y para quinientas veces solo cambia un número.",
          estudiantes: "Comparan el número de líneas y explican su solución.",
          verifique: "Cada equipo reportó su dato.",
          evalua: ["c4"]
        },
        {
          titulo: "Conclusión escrita", min: 5,
          docente: "Pida una conclusión de una oración sobre la economía del código y cierre con la síntesis.",
          diga: "Un ciclo no hace que el programa funcione mejor: lo hace más corto, más fácil de cambiar y con menos errores.",
          estudiantes: "Escriben la conclusión y guardan su programa.",
          verifique: "La conclusión menciona una ventaja concreta del ciclo."
        }
      ]
    },
    dificultades: [
      { situacion: "El LED parpadea seis veces en lugar de cinco.", causa: "Usó <= con inicio en 0.", accion: "Pida contar en voz alta los valores que toma i." },
      { situacion: "El LED no se detiene después de cinco parpadeos.", causa: "El for quedó en loop(), que se repite solo.", accion: "Explique que loop() ya es un ciclo y pida mover el for a setup() o usar un contador." },
      { situacion: "Un LED del barrido no enciende.", causa: "Falta su pinMode o la conexión es incorrecta.", accion: "Pida preparar los cinco pines con un for dentro de setup() y revisar el LED." },
      { situacion: "Los LED se ven encendidos a la vez.", causa: "El delay es muy corto o falta el LOW.", accion: "Pida aumentar el tiempo a 200 ms y revisar el orden de las instrucciones." },
      { situacion: "Error: 'i' was not declared in this scope.", causa: "Se usa la variable fuera del for donde se declaró.", accion: "Explique que esa variable solo existe dentro del ciclo." }
    ],
    apoyo: "Entregue el for con sus tres partes separadas para completar y pida primero contar en voz alta las vueltas del ciclo.",
    reto: "Pida un barrido de ida y vuelta, con un segundo for que cuente hacia atrás, sin repetir el LED de los extremos.",
    siFalta: "Omita el bucle infinito como práctica y demuéstrelo usted en el proyector. Conserve el contador.",
    siSobra: "Pida que un acumulador sume el tiempo total del barrido y lo muestre en el monitor serial.",
    codigo: [
      {
        titulo: "Reescritura con for",
        texto: `const int LED = 8;

void setup() {
  pinMode(LED, OUTPUT);

  for (int i = 0; i < 5; i++) {
    digitalWrite(LED, HIGH);
    delay(300);
    digitalWrite(LED, LOW);
    delay(300);
  }
}

void loop() {
  // Vacío: la tarea se ejecuta una sola vez.
}`
      },
      {
        titulo: "Barrido de cinco LED",
        texto: `const int PRIMER_PIN = 8;
const int ULTIMO_PIN = 12;

void setup() {
  for (int pin = PRIMER_PIN; pin <= ULTIMO_PIN; pin++) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  for (int pin = PRIMER_PIN; pin <= ULTIMO_PIN; pin++) {
    digitalWrite(pin, HIGH);
    delay(150);
    digitalWrite(pin, LOW);
  }
}`
      },
      {
        titulo: "Barrido detenido con contador",
        texto: `const int PRIMER_PIN = 8;
const int ULTIMO_PIN = 12;
const int LIMITE = 3;

int repeticiones = 0;

void setup() {
  for (int pin = PRIMER_PIN; pin <= ULTIMO_PIN; pin++) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  while (repeticiones < LIMITE) {
    for (int pin = PRIMER_PIN; pin <= ULTIMO_PIN; pin++) {
      digitalWrite(pin, HIGH);
      delay(150);
      digitalWrite(pin, LOW);
    }
    repeticiones = repeticiones + 1;  // Sin esta línea, nunca termina.
  }
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "2.3.1", peso: 2,
        texto: "Elige el ciclo adecuado al caso y explica por qué.",
        evidencia: "Tabla de ciclos y casos resueltos.",
        niveles: [
          "Elige el ciclo y argumenta por qué los otros no convienen.",
          "Elige el ciclo adecuado y explica su decisión.",
          "Elige el ciclo adecuado, pero no sabe justificarlo.",
          "Elige el ciclo al azar."
        ]
      },
      {
        id: "c2", saber: "2.3.2", peso: 3,
        texto: "Controla las iteraciones del ciclo para lograr el comportamiento previsto.",
        evidencia: "Parpadeo de cinco veces y barrido de cinco LED.",
        niveles: [
          "Logra el número exacto de iteraciones y adapta el ciclo a otros casos.",
          "Logra el número exacto de iteraciones.",
          "Tiene una iteración de más o de menos que corrige con ayuda.",
          "El ciclo no produce el comportamiento previsto."
        ]
      },
      {
        id: "c3", saber: "2.3.2", peso: 3,
        texto: "Define correctamente la condición de salida y previene bucles infinitos.",
        evidencia: "Barrido que se detiene tras tres vueltas y explicación del bucle infinito.",
        niveles: [
          "Define la salida y explica el bucle infinito con su propio código.",
          "El contador detiene el ciclo y explica qué ocurre sin él.",
          "El contador funciona, pero no explica el bucle infinito.",
          "El ciclo no se detiene."
        ]
      },
      {
        id: "c4", saber: "2.3.3", peso: 2,
        texto: "Reduce la extensión del código sin perder funcionalidad.",
        evidencia: "Comparación de líneas del programa inicial y del final.",
        niveles: [
          "Reduce el código al mínimo y lo mantiene fácil de leer.",
          "Reduce el código y conserva el comportamiento.",
          "Reduce el código, pero cambia parte del comportamiento.",
          "Mantiene el código repetitivo."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 2.4 */
  {
    code: "2.4",
    tema: "Compilación, carga y depuración de programas",
    texto: "Carga y ejecuta el programa en el microcontrolador verificando que el prototipo cumpla la secuencia prevista.",
    saberes: [
      { code: "2.4.1", tipo: "Declarativo",   texto: "Proceso de compilación y carga; errores de sintaxis frente a errores de lógica." },
      { code: "2.4.2", tipo: "Procedimental", texto: "Compilación, carga al microcontrolador, observación del comportamiento y corrección de código." },
      { code: "2.4.3", tipo: "Actitudinal",   texto: "Tolerancia a la frustración y constancia en la depuración." }
    ],
    proposito: "Al terminar la clase, cada equipo carga un programa con un error de lógica, formula hipótesis sobre la causa y lo corrige hasta que el prototipo cumple la secuencia prevista.",
    evaluacion: { tipo: "Sumativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa y 1 cable USB de datos.",
      "Por equipo: 1 protoboard con 3 LED y 3 resistencias de 220 Ω en los pines 8, 9 y 10.",
      "Por equipo: 1 archivo con un programa alterado y la bitácora.",
      "Para el docente: proyector, ejemplo de error de compilación y registro de qué programa recibió cada equipo."
    ],
    preparacion: [
      "Copie el programa correcto de la sección de código de referencia y cree cuatro versiones con estas alteraciones: A) borre pinMode(VERDE, OUTPUT); B) borre digitalWrite(AMARILLO, LOW); C) cambie delay(1000) por delay(10); D) intercambie los pines: ROJO = 10 y VERDE = 8.",
      "Verifique que las cuatro versiones compilan. Deben cargar sin error y fallar solo en el comportamiento.",
      "Pruebe cada una y anote qué se observa. A: el LED verde brilla muy poco. B: el amarillo nunca se apaga. C: el amarillo casi no se ve. D: rojo y verde aparecen cambiados.",
      "Copie los archivos en las computadoras, cada uno con el nombre programa_equipo.",
      "Escriba en el pizarrón la secuencia prevista: verde 3 s, amarillo 1 s, rojo 3 s y se repite.",
      "Prepare el formato de bitácora: Comportamiento observado, Hipótesis, Cambio realizado, Resultado."
    ],
    conceptos: [
      { termino: "Compilación", explicacion: "Traducción del código a instrucciones que entiende el microcontrolador. Revisa la sintaxis.", ejemplo: "Como un corrector que no deja imprimir un texto con errores de escritura." },
      { termino: "Carga", explicacion: "Envío del programa compilado a la memoria de la placa por el puerto USB.", ejemplo: "Como copiar un archivo a una memoria USB." },
      { termino: "Error de sintaxis", explicacion: "El código no cumple las reglas del lenguaje. No compila y el entorno lo señala.", ejemplo: "Falta un punto y coma." },
      { termino: "Error de lógica", explicacion: "El código compila y se ejecuta, pero no hace lo previsto. Nadie lo señala: hay que observar.", ejemplo: "Una receta bien escrita que pide sal en lugar de azúcar." },
      { termino: "Depuración", explicacion: "Proceso de observar, formular una hipótesis, hacer un cambio y volver a probar.", ejemplo: "Como revisar por qué no enciende una linterna." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Leer un error de compilación", min: 8,
          docente: "Proyecte un programa con un punto y coma faltante después de la primera línea. Compile y muestre el mensaje: expected ',' or ';' before 'void'.",
          diga: "Este mensaje parece un regaño, pero en realidad es una pista. Vamos a leerlo juntos.",
          pregunte: "¿Qué información útil nos da el mensaje?",
          espere: "La línea donde se detectó, qué esperaba el compilador y antes de qué palabra. El error suele estar en la línea anterior.",
          estudiantes: "Leen el mensaje e identifican dónde está el error.",
          verifique: "Localizan el error sin que usted lo señale."
        },
        {
          titulo: "Sintaxis frente a lógica", min: 7,
          docente: "Compare los dos tipos de error en dos columnas y comunique el reto.",
          diga: "El error de sintaxis lo encuentra la computadora; el error de lógica lo tienen que encontrar ustedes. Hoy todos los programas compilan, y aun así están mal.",
          pregunte: "Si el programa compila, ¿significa que está bien?",
          espere: "No: compilar solo significa que la escritura es correcta.",
          estudiantes: "Copian las dos columnas y dan un ejemplo de cada error.",
          verifique: "Clasifican correctamente dos ejemplos que usted proponga.",
          evalua: ["c1"]
        }
      ],
      desarrollo: [
        {
          titulo: "Cargar y observar", min: 10,
          docente: "Asigne a cada equipo su programa. Pida cargarlo y observarlo dos ciclos completos sin modificar nada.",
          diga: "No toquen el código todavía. Primero observen y describan qué hace y en qué se diferencia de la secuencia prevista.",
          estudiantes: "Cargan el programa, observan y describen el comportamiento en la bitácora.",
          verifique: "Cada equipo describió la diferencia entre lo observado y lo previsto.",
          evalua: ["c2"]
        },
        {
          titulo: "Formular hipótesis", min: 10,
          docente: "Pida al menos dos hipótesis antes de editar. Revise que cada una señale una línea o una instrucción concreta.",
          diga: "Una hipótesis dice qué creen que falla y cómo lo van a comprobar. No sirve decir: algo está mal.",
          pregunte: "¿Qué línea sospechas y qué esperas que cambie si la modificas?",
          espere: "Señalan una instrucción concreta y predicen el nuevo comportamiento.",
          estudiantes: "Escriben dos hipótesis y marcan en el código las líneas sospechosas.",
          verifique: "Hay dos hipótesis escritas antes del primer cambio.",
          evalua: ["c3"]
        },
        {
          titulo: "Depuración", min: 25,
          docente: "Acompañe solo con preguntas. No señale la línea del error. Si un equipo cambia varias cosas a la vez, pídale deshacerlas y probar una por una.",
          diga: "Un cambio, una prueba, un registro. Si la hipótesis era falsa, no perdieron tiempo: ya saben dónde no está el error.",
          pregunte: "¿Qué esperabas que pasara? ¿Qué pasó? ¿Qué descartas con este resultado?",
          espere: "Comparan la predicción con el resultado y ajustan la hipótesis.",
          estudiantes: "Prueban sus hipótesis una por una y registran cada cambio y su resultado.",
          verifique: "Cada cambio del código tiene una fila en la bitácora.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Verificación de la secuencia", min: 5,
          docente: "Cronometre frente a cada equipo dos ciclos completos y compare con la secuencia prevista.",
          diga: "Muestren dos ciclos. Voy a medir los tiempos con el reloj.",
          estudiantes: "Demuestran el prototipo y registran el error encontrado y su corrección.",
          verifique: "La secuencia y los tiempos coinciden con lo previsto.",
          evalua: ["c2"]
        }
      ],
      cierre: [
        {
          titulo: "Hipótesis falsas", min: 10,
          docente: "Pida compartir una hipótesis que resultó falsa y lo que permitió descartar. Anote los aprendizajes.",
          pregunte: "¿Qué hipótesis falló y qué aprendieron de ella?",
          espere: "Explican qué parte del programa pudieron descartar gracias a esa prueba.",
          estudiantes: "Comparten su hipótesis falsa y escuchan las de otros equipos.",
          verifique: "Al menos tres equipos compartieron una hipótesis falsa."
        },
        {
          titulo: "Síntesis y entrega", min: 5,
          docente: "Cierre destacando la constancia y recoja las bitácoras.",
          diga: "El error descartado también es información. Depurar no es fracasar: es parte de programar.",
          estudiantes: "Escriben qué harían distinto la próxima vez y entregan la bitácora.",
          verifique: "Todas las bitácoras tienen hipótesis, cambios y resultados.",
          evalua: ["c4"]
        }
      ]
    },
    dificultades: [
      { situacion: "No se puede cargar: el puerto no aparece o está ocupado.", causa: "Cable, puerto mal seleccionado o monitor serial abierto en otro programa.", accion: "Pida cerrar el monitor serial, reconectar el cable y seleccionar de nuevo el puerto." },
      { situacion: "Mensaje de avrdude: not in sync.", causa: "Placa incorrecta seleccionada o problema de comunicación.", accion: "Revise la placa seleccionada y desconecte lo que esté en los pines 0 y 1." },
      { situacion: "El equipo pide la solución.", causa: "Frustración.", accion: "Pida leer en voz alta el programa línea por línea, comparando con la secuencia prevista. Con frecuencia encuentran el error al leerlo." },
      { situacion: "El equipo reescribe todo el programa.", causa: "Evita analizar.", accion: "Pida volver al archivo original y encontrar qué línea era la diferencia." },
      { situacion: "Corrigen el error, pero no saben cuál era.", causa: "Hicieron varios cambios a la vez.", accion: "Pida deshacer los cambios y aplicarlos uno por uno." }
    ],
    apoyo: "Asigne los programas B o C, cuya falla se observa más fácilmente, e indique la zona del programa donde conviene buscar.",
    reto: "Asigne el programa A o D. Al terminar, pida crear un error de lógica para otro equipo.",
    siFalta: "Reduzca a una sola hipótesis por equipo y comparta en plenaria solo dos casos.",
    siSobra: "Entregue a cada equipo otro programa alterado y compare si el segundo error tomó menos tiempo.",
    codigo: [
      {
        titulo: "Programa correcto (base para las cuatro versiones)",
        texto: `const int ROJO = 8;
const int AMARILLO = 9;
const int VERDE = 10;

void setup() {
  pinMode(ROJO, OUTPUT);
  pinMode(AMARILLO, OUTPUT);
  pinMode(VERDE, OUTPUT);
}

void loop() {
  digitalWrite(VERDE, HIGH);
  delay(3000);
  digitalWrite(VERDE, LOW);

  digitalWrite(AMARILLO, HIGH);
  delay(1000);
  digitalWrite(AMARILLO, LOW);

  digitalWrite(ROJO, HIGH);
  delay(3000);
  digitalWrite(ROJO, LOW);
}`
      },
      {
        titulo: "Programa para demostrar el error de compilación",
        texto: `const int LED = 8
void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "2.4.1", peso: 2,
        texto: "Distingue error de sintaxis de error de lógica.",
        evidencia: "Clasificación del error encontrado y explicación de por qué pertenece a ese tipo.",
        niveles: [
          "Distingue ambos tipos y propone cómo detectar cada uno.",
          "Distingue ambos tipos con ejemplos.",
          "Distingue los tipos solo con ayuda.",
          "No distingue los tipos de error."
        ]
      },
      {
        id: "c2", saber: "2.4.2", peso: 3,
        texto: "Logra que el prototipo cumpla la secuencia prevista.",
        evidencia: "Descripción del comportamiento inicial, de la secuencia final y de los tiempos comprobados.",
        niveles: [
          "Cumple la secuencia y los tiempos, y el equipo explica la corrección.",
          "Cumple la secuencia y los tiempos.",
          "Cumple la secuencia, pero no los tiempos.",
          "No cumple la secuencia."
        ]
      },
      {
        id: "c3", saber: "2.4.2", peso: 3,
        texto: "Formula hipótesis antes de modificar el código y prueba un cambio a la vez.",
        evidencia: "Registro de cada hipótesis, cambio realizado y resultado.",
        niveles: [
          "Sus hipótesis son concretas, predicen el resultado y prueba un cambio por vez.",
          "Registra hipótesis antes de modificar y prueba un cambio por vez.",
          "Registra hipótesis después de modificar o cambia varias cosas a la vez.",
          "Modifica sin hipótesis."
        ]
      },
      {
        id: "c4", saber: "2.4.3", peso: 2,
        texto: "Se mantiene constante en la depuración ante los intentos fallidos.",
        evidencia: "Reflexión sobre lo que hizo cuando una hipótesis resultó falsa.",
        niveles: [
          "Mantiene la calma, usa cada intento fallido y apoya a su equipo.",
          "Continúa hasta terminar, aun con intentos fallidos.",
          "Continúa solo con el ánimo del docente.",
          "Abandona o pide la solución."
        ]
      }
    ]
  }
  ]
});

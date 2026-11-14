/* ============================================================
   Competencia 3 — Lectura de sensores
   Los ejemplos de código están escritos para Arduino UNO o compatible
   (conversión analógica de 10 bits: valores de 0 a 1023).
   ============================================================ */
COMPETENCIAS.push({
  num: 3,
  eje: "Lectura de sensores",
  texto: "Utiliza sensores en la lectura de variables del entorno, mediante rutinas de adquisición y calibración, para generar respuestas según los umbrales definidos.",
  indicadores: [

  /* ------------------------------------------------------------ 3.1 */
  {
    code: "3.1",
    tema: "Conexión de sensores analógicos y digitales",
    texto: "Conecta sensores al microcontrolador según el esquema de alimentación y señal correspondiente.",
    saberes: [
      { code: "3.1.1", tipo: "Declarativo",   texto: "Señal analógica y digital; pines de alimentación, tierra y señal; tipos de sensores de uso común." },
      { code: "3.1.2", tipo: "Procedimental", texto: "Identificación de terminales del sensor y conexión según hoja de datos o esquema." },
      { code: "3.1.3", tipo: "Actitudinal",   texto: "Precaución al energizar y respeto por las especificaciones técnicas." }
    ],
    proposito: "Al terminar la clase, cada equipo identifica en la hoja de datos los terminales de su sensor, lo conecta al tipo de pin correcto y justifica su decisión.",
    evaluacion: { tipo: "Formativa", tecnica: "Desempeño", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 sensor, 1 placa, 1 protoboard y cables jumper.",
      "Sensores sugeridos: fotorresistencia LDR con resistencia de 10 kΩ, módulo PIR, sensor de humedad de suelo y sensor ultrasónico. Use los que tenga disponibles.",
      "Por equipo: hoja de datos impresa del sensor, multímetro y bitácora.",
      "Para el docente: un ejemplar de cada sensor para la mesa de exploración."
    ],
    preparacion: [
      "Reúna los sensores disponibles y pruebe cada uno antes de la clase.",
      "Imprima la hoja de datos de cada sensor, o un resumen con el voltaje de operación, los pines y el tipo de señal.",
      "Ponga en una mesa cuatro sensores distintos, con una etiqueta numerada.",
      "Prepare el esquema de la LDR: 5V → LDR → pin A0 → resistencia de 10 kΩ → GND.",
      "Confirme el voltaje de cada módulo. Si alguno trabaja a 3.3 V, conéctelo al pin 3.3V y avise al equipo."
    ],
    conceptos: [
      { termino: "Sensor", explicacion: "Dispositivo que convierte una variable física en una señal eléctrica.", ejemplo: "Es como los sentidos del prototipo." },
      { termino: "Señal digital", explicacion: "Solo tiene dos estados: HIGH o LOW. Se conecta a los pines 2 a 13.", ejemplo: "Un interruptor: encendido o apagado." },
      { termino: "Señal analógica", explicacion: "Puede tomar muchos valores dentro de un rango. Se conecta a los pines A0 a A5.", ejemplo: "El control de volumen: muchos niveles." },
      { termino: "Pines de alimentación", explicacion: "VCC recibe el voltaje de trabajo y GND es la tierra. Invertirlos puede dañar el sensor.", ejemplo: "Como la entrada de corriente de un aparato." },
      { termino: "Pin de señal", explicacion: "Entrega la información al microcontrolador. Se rotula OUT, S, AO, DO, Trig o Echo, según el sensor.", ejemplo: "Es por donde el sensor habla con la placa." },
      { termino: "Hoja de datos", explicacion: "Documento del fabricante con voltaje, pines y límites de operación.", ejemplo: "Es el manual técnico del componente." },
      { termino: "Divisor de voltaje", explicacion: "Dos resistencias en serie que convierten un cambio de resistencia en un cambio de voltaje. Es necesario para leer una LDR.", ejemplo: "Con más luz baja la resistencia de la LDR y aumenta el voltaje en A0." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Mesa de exploración", min: 10,
          docente: "Muestre los cuatro sensores etiquetados. Pida anticipar qué mide cada uno y cuántos cables necesita. Registre las predicciones.",
          diga: "No los conecten todavía. Solo miren y anoten: ¿qué creen que mide cada uno? ¿Cuántos cables necesita?",
          pregunte: "¿Qué pistas les da la forma del sensor o las letras impresas?",
          espere: "Reconocen VCC, GND, OUT o relacionan la forma con la variable que mide.",
          estudiantes: "Observan los sensores y anotan sus predicciones.",
          verifique: "Cada equipo registró una predicción para cada sensor."
        },
        {
          titulo: "Contraste con la hoja de datos", min: 5,
          docente: "Muestre en una hoja de datos dónde están el voltaje y los pines. Compare con las predicciones y comunique el propósito.",
          diga: "La hoja de datos manda. Si difiere de lo que suponemos, tiene razón la hoja de datos.",
          estudiantes: "Corrigen sus predicciones y copian el propósito.",
          verifique: "Pueden señalar en la hoja dónde se indica el voltaje de operación."
        }
      ],
      desarrollo: [
        {
          titulo: "Analógico y digital", min: 12,
          docente: "Explique la diferencia con dos ejemplos: pulsador y LDR. Dibuje las dos señales. Señale en la placa los pines de cada tipo.",
          diga: "La señal digital responde sí o no. La señal analógica responde cuánto.",
          pregunte: "Un sensor que indica si hay movimiento, ¿es analógico o digital? ¿Y uno que indica cuánta humedad hay?",
          espere: "Movimiento: digital. Humedad: analógico, si usa la salida A0.",
          estudiantes: "Clasifican los cuatro sensores y localizan los pines en la placa.",
          verifique: "Clasifican correctamente los cuatro sensores.",
          evalua: ["c1"]
        },
        {
          titulo: "Lectura de la hoja de datos", min: 13,
          docente: "Asigne un sensor a cada equipo. Pida completar en la bitácora: voltaje, pines y tipo de señal.",
          diga: "Antes de tomar un cable, necesito ver escritos el voltaje, el nombre de cada pin y el tipo de señal.",
          estudiantes: "Buscan los datos en la hoja y dibujan el esquema de conexión.",
          verifique: "La ficha coincide con la hoja de datos y el esquema está dibujado.",
          evalua: ["c2"]
        },
        {
          titulo: "Conexión con la placa desconectada", min: 15,
          docente: "Pida conectar con el USB desconectado y colores consistentes: rojo para VCC y negro para GND. Recorra los equipos.",
          diga: "Conecten primero GND, luego VCC y al final la señal. El cable USB sigue desconectado hasta que yo revise.",
          pregunte: "¿Por qué elegiste ese pin para la señal?",
          espere: "Justifican que el sensor es analógico o digital y que corresponde a ese tipo de pin.",
          estudiantes: "Conectan el sensor y explican su elección de pin.",
          verifique: "VCC y GND están correctos y el pin coincide con el tipo de señal.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Revisión y energización", min: 10,
          docente: "Revise cada conexión. Después pida conectar el USB y tocar con cuidado si el sensor se calienta.",
          diga: "Si algo se calienta o huele raro, desconecten el USB de inmediato y avísenme.",
          estudiantes: "Solicitan revisión, energizan y verifican el indicador del módulo o la temperatura.",
          verifique: "La placa enciende con normalidad y ningún componente se calienta.",
          evalua: ["c4"]
        }
      ],
      cierre: [
        {
          titulo: "Esquema en la bitácora", min: 10,
          docente: "Pida dibujar el esquema final y rotular cada conexión. Forme parejas de equipos para revisarlo.",
          diga: "Otro equipo debe poder conectar su sensor solo con mirar su dibujo.",
          estudiantes: "Dibujan y rotulan el esquema, y revisan el de otro equipo.",
          verifique: "Cada esquema indica voltaje, tierra, señal y número de pin.",
          evalua: ["c2"]
        },
        {
          titulo: "Regla de oro", min: 5,
          docente: "Recoja las predicciones iniciales y anuncie la siguiente clase: leer los datos.",
          pregunte: "¿Qué harían primero con un sensor que nunca han usado?",
          espere: "Buscar su hoja de datos y confirmar voltaje y pines.",
          estudiantes: "Responden y ordenan el material.",
          verifique: "Los sensores quedan guardados con sus hojas de datos."
        }
      ]
    },
    dificultades: [
      { situacion: "El sensor se calienta.", causa: "VCC y GND invertidos o voltaje incorrecto.", accion: "Desconecte de inmediato, revise las conexiones y pruebe el sensor antes de volver a usarlo." },
      { situacion: "La placa se apaga o se reinicia al conectar el sensor.", causa: "Cortocircuito entre 5V y GND.", accion: "Desconecte el USB y revise la protoboard fila por fila." },
      { situacion: "No hay hoja de datos del sensor.", causa: "Módulo genérico.", accion: "Use las letras impresas en el módulo. Busque el modelo en internet antes de la clase." },
      { situacion: "El módulo tiene salidas AO y DO.", causa: "Tiene salida analógica y digital.", accion: "Explique que AO entrega cuánto y DO entrega sí o no, según su potenciómetro. Conecte AO a A0." },
      { situacion: "Hay menos sensores que equipos.", causa: "Inventario limitado.", accion: "Use LDR, que es barata, o un potenciómetro como sensor de práctica." }
    ],
    apoyo: "Asigne la LDR con esquema ya dibujado o un módulo de tres pines, y entregue la ficha con los campos para completar.",
    reto: "Asigne el sensor ultrasónico, que usa dos pines de señal, y pida explicar por qué Trig es salida y Echo es entrada.",
    siFalta: "Trabaje un solo tipo de sensor para todos los equipos y haga la revisión de esquemas en plenaria.",
    siSobra: "Pida cambiar de sensor con otro equipo y conectarlo solo con el esquema de la bitácora del otro equipo.",
    criterios: [
      {
        id: "c1", saber: "3.1.1", peso: 2,
        texto: "Distingue señal analógica de digital y clasifica los sensores.",
        evidencia: "Clasificación de los cuatro sensores.",
        niveles: [
          "Clasifica los sensores y explica cómo afecta eso a la conexión y al código.",
          "Clasifica correctamente los cuatro sensores.",
          "Clasifica correctamente dos o tres sensores.",
          "No distingue los tipos de señal."
        ]
      },
      {
        id: "c2", saber: "3.1.2", peso: 3,
        texto: "Identifica los terminales del sensor a partir de la hoja de datos.",
        evidencia: "Ficha del sensor y esquema rotulado en la bitácora.",
        niveles: [
          "Completa la ficha sin ayuda y su esquema permite repetir la conexión.",
          "Identifica todos los terminales y el voltaje.",
          "Identifica los terminales con ayuda.",
          "No logra leer la hoja de datos."
        ]
      },
      {
        id: "c3", saber: "3.1.2", peso: 3,
        texto: "Conecta el sensor al tipo de pin correcto y justifica su decisión.",
        evidencia: "Conexión física y explicación oral.",
        niveles: [
          "La conexión es correcta y ordenada, y justifica cada cable.",
          "La conexión es correcta y justifica el pin de señal.",
          "La conexión es correcta tras una corrección.",
          "La conexión es incorrecta."
        ]
      },
      {
        id: "c4", saber: "3.1.3", peso: 2,
        texto: "Solicita verificación antes de energizar y respeta las especificaciones.",
        evidencia: "Observación del procedimiento de energización.",
        niveles: [
          "Revisa voltaje y conexiones, y espera la autorización sin que se le recuerde.",
          "Solicita la verificación antes de energizar.",
          "Solicita la verificación solo cuando se le recuerda.",
          "Energiza sin autorización."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 3.2 */
  {
    code: "3.2",
    tema: "Lectura de sensores en el monitor serial",
    texto: "Obtiene lecturas del entorno y las visualiza mediante el monitor serial u otro medio de salida.",
    saberes: [
      { code: "3.2.1", tipo: "Declarativo",   texto: "Conversión analógico-digital; rango de valores de lectura; función del monitor serial." },
      { code: "3.2.2", tipo: "Procedimental", texto: "Uso de instrucciones de lectura, impresión de datos y registro de valores observados." },
      { code: "3.2.3", tipo: "Actitudinal",   texto: "Honestidad en el registro de los datos obtenidos." }
    ],
    proposito: "Al terminar la clase, cada equipo programa la lectura de un sensor, la visualiza en el monitor serial y registra diez lecturas en tres condiciones del entorno.",
    evaluacion: { tipo: "Formativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa, cable USB de datos y 1 sensor analógico conectado a A0 (LDR con resistencia de 10 kΩ o equivalente).",
      "Por equipo: tabla de registro impresa con 10 filas y 3 columnas de condición.",
      "Por equipo: linterna o la luz de un teléfono y un objeto para cubrir el sensor.",
      "Para el docente: proyector o pizarrón."
    ],
    preparacion: [
      "Pruebe el código de referencia y anote qué valores obtiene en el aula, tapando el sensor y con linterna.",
      "Imprima la tabla de registro: columnas Lectura 1 a 10 en filas; condiciones Normal, Cubierto y Linterna.",
      "Si los equipos no tienen el circuito de la clase anterior, considere 10 minutos para armarlo.",
      "Dibuje en el pizarrón una regla de 0 a 1023 para ubicar las predicciones."
    ],
    conceptos: [
      { termino: "Conversión analógico-digital", explicacion: "Transforma un voltaje en un número que la placa puede usar.", ejemplo: "Como una regla que convierte una altura en centímetros." },
      { termino: "Rango de lectura", explicacion: "En Arduino UNO, analogRead entrega de 0 (0 V) a 1023 (5 V).", ejemplo: "Una lectura de 512 equivale a unos 2.5 V." },
      { termino: "Monitor serial", explicacion: "Ventana del entorno donde se ven los datos que envía la placa. Debe tener la misma velocidad que Serial.begin().", ejemplo: "Es una ventana para escuchar lo que dice la placa." },
      { termino: "analogRead()", explicacion: "Instrucción que lee un pin analógico y devuelve un número.", ejemplo: "int lectura = analogRead(A0);" },
      { termino: "Serial.println()", explicacion: "Envía un dato al monitor serial y pasa a la línea siguiente.", ejemplo: "Serial.println(lectura);" },
      { termino: "Dato honesto", explicacion: "Se registra lo que se midió, aunque no coincida con lo esperado. Un dato raro también informa.", ejemplo: "Una lectura extraña puede revelar un cable flojo." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Predicción", min: 8,
          docente: "Muestre la regla de 0 a 1023. Pida predecir el número que dará el sensor con el aula iluminada y a oscuras. Anote los datos.",
          diga: "Antes de medir, apostemos. ¿Qué número dará el sensor con esta luz? ¿Y si lo tapamos?",
          pregunte: "¿Creen que el número subirá o bajará al tapar el sensor? ¿Por qué?",
          espere: "En la conexión indicada, baja al tapar porque llega menos luz. Acepte todas las predicciones.",
          estudiantes: "Anotan su predicción para cada condición.",
          verifique: "Cada equipo tiene sus predicciones en el pizarrón."
        },
        {
          titulo: "Propósito y regla de honestidad", min: 7,
          docente: "Escriba el propósito y la regla de la clase. Explique por qué no se corrigen los datos.",
          diga: "No hay datos correctos o incorrectos: hay datos reales. Si algo sale raro, se anota y se explica. No se borra.",
          estudiantes: "Copian el propósito y revisan la conexión de su sensor.",
          verifique: "Todos los sensores están conectados y revisados."
        }
      ],
      desarrollo: [
        {
          titulo: "De voltaje a número", min: 10,
          docente: "Explique la conversión con la regla del pizarrón. Muestre qué hace analogRead y por qué el rango es de 0 a 1023.",
          diga: "La placa no entiende de luz ni de voltios. Divide el rango de 0 a 5 voltios en 1024 partes y entrega el número.",
          pregunte: "Si el pin recibe 2.5 V, ¿qué número esperan?",
          espere: "Cerca de 512.",
          estudiantes: "Calculan dos ejemplos y ubican los valores en la regla.",
          verifique: "Calculan correctamente el valor para 2.5 V y 5 V.",
          evalua: ["c1"]
        },
        {
          titulo: "Programar la lectura", min: 15,
          docente: "Escriba el código con el grupo, línea por línea. Muestre cómo abrir el monitor serial y elegir 9600 baudios. Deje que cada equipo cargue su programa.",
          diga: "Serial.begin abre la comunicación. La velocidad en el monitor debe ser igual a la del código; si no, aparecerán símbolos extraños.",
          estudiantes: "Escriben y cargan el programa, y abren el monitor serial.",
          verifique: "Aparecen números cada medio segundo y cambian al cubrir el sensor.",
          evalua: ["c2"]
        },
        {
          titulo: "Registro en tres condiciones", min: 20,
          docente: "Pida tomar diez lecturas por condición. Recorra los equipos y observe si registran tal cual lo que aparece en pantalla.",
          diga: "Mantengan la condición estable y copien diez lecturas seguidas. No elijan solo las que les gustan.",
          pregunte: "Si un equipo tiene una lectura rara: ¿qué pudo pasar en ese momento?",
          espere: "Una sombra, un movimiento o un cable flojo. Se anota junto al dato.",
          estudiantes: "Registran 30 lecturas y anotan cualquier situación extraña.",
          verifique: "Las tres columnas tienen diez lecturas, incluso los valores inesperados.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Comparación con la predicción", min: 5,
          docente: "Pida calcular el promedio de cada condición y comparar con la predicción del pizarrón.",
          diga: "Sumen las diez lecturas y dividan entre diez. ¿Qué tanto se acercaron?",
          estudiantes: "Calculan los promedios y los escriben junto a su predicción.",
          verifique: "Cada equipo tiene tres promedios.",
          evalua: ["c3"]
        }
      ],
      cierre: [
        {
          titulo: "Puesta en común", min: 10,
          docente: "Coloque los promedios de los equipos en el pizarrón. Discuta por qué difieren con el mismo sensor.",
          pregunte: "¿Por qué dos equipos con el mismo sensor obtuvieron valores distintos?",
          espere: "Por la posición, la luz de cada lugar, la tolerancia de los componentes o la forma de cubrir el sensor.",
          estudiantes: "Comparan datos y proponen factores del entorno.",
          verifique: "El grupo menciona al menos dos factores del entorno."
        },
        {
          titulo: "Conclusión", min: 5,
          docente: "Pida conservar la tabla, porque se usará para definir el umbral. Recoja una copia.",
          diga: "Estos datos son la base de la siguiente clase. Sin ellos no podremos decidir cuándo está oscuro.",
          estudiantes: "Escriben una conclusión que relacione el dato con la condición del entorno.",
          verifique: "La conclusión relaciona los datos con las condiciones medidas.",
          evalua: ["c4"]
        }
      ]
    },
    dificultades: [
      { situacion: "El monitor serial muestra símbolos extraños.", causa: "La velocidad del monitor no coincide con Serial.begin().", accion: "Pida elegir 9600 baudios en el monitor." },
      { situacion: "La lectura siempre es 0 o 1023.", causa: "Falta el divisor de voltaje o hay un cable suelto.", accion: "Pida revisar la resistencia de 10 kΩ y las conexiones a 5V y GND." },
      { situacion: "Los valores cambian solos, sin mover nada.", causa: "Pin A0 flotante o cable flojo.", accion: "Revise que el nodo entre la LDR y la resistencia llegue a A0." },
      { situacion: "No aparece ningún dato.", causa: "Falta Serial.begin() o el monitor no está abierto.", accion: "Pida revisar setup() y reabrir el monitor." },
      { situacion: "Al tapar el sensor, el número sube.", causa: "La LDR y la resistencia están en posiciones invertidas.", accion: "No es un error si es consistente. Pida explicar por qué y registrarlo." }
    ],
    apoyo: "Entregue el código listo y concentre al equipo en leer y registrar datos. Permita calcular promedios con calculadora.",
    reto: "Pida mostrar también el voltaje con Serial.println(lectura * 5.0 / 1023) y comparar con el multímetro.",
    siFalta: "Reduzca a cinco lecturas y a dos condiciones: normal y cubierto.",
    siSobra: "Pida usar el trazador serial del entorno y describir qué muestra la gráfica al mover la mano.",
    codigo: [
      {
        titulo: "Lectura en el monitor serial",
        texto: `const int SENSOR = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(SENSOR);
  Serial.println(lectura);
  delay(500);
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "3.2.1", peso: 2,
        texto: "Explica la conversión analógico-digital y el rango de lectura de la placa.",
        evidencia: "Ejemplos calculados y respuestas orales.",
        niveles: [
          "Explica la conversión y calcula el voltaje a partir de cualquier lectura.",
          "Explica la conversión y el rango de 0 a 1023.",
          "Conoce el rango, pero no explica la conversión.",
          "No relaciona voltaje y lectura."
        ]
      },
      {
        id: "c2", saber: "3.2.2", peso: 3,
        texto: "Programa correctamente la rutina de lectura y visualización.",
        evidencia: "Datos visibles en el monitor serial.",
        niveles: [
          "Programa sin ayuda y mejora la presentación de los datos.",
          "La rutina funciona y los datos se ven correctamente.",
          "La rutina funciona después de una orientación.",
          "No logra visualizar los datos."
        ]
      },
      {
        id: "c3", saber: "3.2.2", peso: 3,
        texto: "Registra las lecturas y relaciona el dato con la condición del entorno.",
        evidencia: "Tabla con 30 lecturas y promedios.",
        niveles: [
          "La tabla está completa y explica cómo cada condición afecta el dato.",
          "La tabla está completa y relaciona el dato con la condición.",
          "La tabla está incompleta o sin promedios.",
          "No registra datos."
        ]
      },
      {
        id: "c4", saber: "3.2.3", peso: 2,
        texto: "Registra los valores reales obtenidos, incluidos los inesperados.",
        evidencia: "Tabla sin datos alterados, con anotaciones.",
        niveles: [
          "Registra todo, anota lo inesperado y propone una causa.",
          "Registra todos los valores reales.",
          "Omite algunos valores inesperados.",
          "Altera o inventa datos."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 3.3 */
  {
    code: "3.3",
    tema: "Calibración de umbrales con datos medidos",
    texto: "Ajusta los valores de umbral del sensor a partir de las mediciones registradas en pruebas.",
    saberes: [
      { code: "3.3.1", tipo: "Declarativo",   texto: "Conceptos de umbral, calibración, ruido y margen de tolerancia." },
      { code: "3.3.2", tipo: "Procedimental", texto: "Toma de mediciones en distintas condiciones, comparación de valores y definición del umbral." },
      { code: "3.3.3", tipo: "Actitudinal",   texto: "Disposición a repetir pruebas hasta obtener datos confiables." }
    ],
    proposito: "Al terminar la clase, cada equipo define un umbral con su margen a partir de sus propias mediciones y comprueba con pruebas repetidas que el valor se sostiene.",
    evaluacion: { tipo: "Sumativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa, cable USB de datos y sensor conectado a A0.",
      "Por equipo: tabla de registro, calculadora y bitácora.",
      "Por equipo: elementos para generar las condiciones extremas, como linterna y una caja o tela oscura.",
      "Para el docente: datos de ejemplo escritos en el pizarrón."
    ],
    preparacion: [
      "Pida a los equipos traer la tabla de datos de la clase anterior. Si no la tienen, pueden volver a medir en el paso de mediciones.",
      "Prepare el ejemplo: promedio con luz 720, promedio a oscuras 180, variación máxima observada de ±15.",
      "Calcule el resultado del ejemplo: umbral = (720 + 180) ÷ 2 = 450; margen sugerido = 2 × 15 = 30.",
      "Prepare la tabla de validación: 10 pruebas con las columnas Condición, Lectura, ¿Se clasificó bien?",
      "Tenga disponible el programa de lectura de la clase 3.2."
    ],
    conceptos: [
      { termino: "Umbral", explicacion: "Valor de referencia que separa dos estados.", ejemplo: "Debajo de 450 está oscuro; encima, hay luz." },
      { termino: "Calibración", explicacion: "Ajustar el sistema con mediciones reales de su propio entorno.", ejemplo: "Como poner en cero una balanza antes de pesar." },
      { termino: "Ruido", explicacion: "Variación pequeña de la lectura aunque la condición no cambie.", ejemplo: "Lecturas de 712, 719 y 705 con la misma luz." },
      { termino: "Margen de tolerancia", explicacion: "Banda alrededor del umbral que absorbe el ruido, para que la respuesta no cambie por pequeñas variaciones.", ejemplo: "Umbral 450 con margen de 30: banda de 420 a 480." },
      { termino: "Promedio", explicacion: "Suma de las lecturas dividida entre la cantidad de lecturas. Representa la condición mejor que una sola lectura.", ejemplo: "(700 + 720 + 740) ÷ 3 = 720." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "¿Cuándo está oscuro?", min: 8,
          docente: "Plantee el problema con los datos de la clase anterior. Pida a tres equipos proponer un número y compare las respuestas.",
          diga: "Con sus datos, díganme: ¿a partir de qué número diremos que está oscuro?",
          pregunte: "¿Por qué los equipos propusieron números distintos? ¿Quién tiene razón?",
          espere: "Depende de cada sensor y lugar. No hay un único número correcto: hay que decidirlo con datos.",
          estudiantes: "Revisan sus datos y proponen un valor.",
          verifique: "El grupo reconoce que el valor depende de las mediciones."
        },
        {
          titulo: "Propósito de la clase", min: 7,
          docente: "Escriba el propósito y anticipe el método: medir, calcular, comprobar.",
          diga: "Un umbral sin datos detrás es una suposición. Hoy cada equipo va a defender su número con evidencia.",
          estudiantes: "Copian el propósito y preparan su material.",
          verifique: "Cada equipo tiene su sensor funcionando en el monitor serial."
        }
      ],
      desarrollo: [
        {
          titulo: "Umbral, ruido y margen", min: 10,
          docente: "Explique los conceptos con los datos de ejemplo: umbral 450 y margen de 30. Muestre en la regla la banda de 420 a 480.",
          diga: "Si el valor oscila cerca del umbral, el sistema podría encender y apagar sin parar. El margen evita ese problema.",
          pregunte: "Si las lecturas varían ±15, ¿un margen de 5 sería suficiente?",
          espere: "No, porque el ruido es mayor que el margen.",
          estudiantes: "Copian el ejemplo y calculan un caso de práctica.",
          verifique: "Calculan el umbral de un caso nuevo correctamente.",
          evalua: ["c1"]
        },
        {
          titulo: "Mediciones en condiciones extremas", min: 15,
          docente: "Pida medir diez lecturas en cada condición extrema de su sensor. Revise que la condición se mantenga estable.",
          diga: "Midan el caso más oscuro y el más iluminado que su sistema enfrentaría de verdad, no solo en la mesa.",
          estudiantes: "Registran diez lecturas por condición y anotan el valor menor y el mayor.",
          verifique: "Hay dos series de diez lecturas y su variación está anotada.",
          evalua: ["c2"]
        },
        {
          titulo: "Cálculo del umbral", min: 10,
          docente: "Pida calcular los promedios, el umbral y el margen. Revise el procedimiento escrito.",
          diga: "Escriban el procedimiento completo. Otro equipo debería poder repetirlo.",
          estudiantes: "Calculan promedios, umbral y margen, y documentan el procedimiento.",
          verifique: "El umbral queda entre los dos promedios y el margen es mayor que el ruido observado.",
          evalua: ["c3"]
        },
        {
          titulo: "Prueba de validación", min: 15,
          docente: "Pida diez pruebas alternando las condiciones, y clasificar cada lectura con su umbral. Si fallan más de una, pida revisar y repetir.",
          diga: "Si el umbral falla, no es un fracaso: es la información que necesitaban. Ajusten y prueben otra vez.",
          pregunte: "¿Qué ajustarían si falla con la condición oscura?",
          espere: "Revisar si el promedio representa esa condición y mover el umbral o el margen con datos nuevos.",
          estudiantes: "Prueban, cuentan los aciertos, ajustan si hace falta y repiten.",
          verifique: "Al menos 9 de 10 pruebas clasifican bien.",
          evalua: ["c3", "c4"]
        }
      ],
      cierre: [
        {
          titulo: "Defensa del umbral", min: 12,
          docente: "Cada equipo defiende su umbral en un minuto con sus datos. Haga una pregunta a cada uno.",
          diga: "Quiero tres datos: su umbral, los promedios que lo respaldan y cuántas pruebas pasó.",
          pregunte: "¿Qué pasaría con su umbral si el sistema se usara en otro lugar?",
          espere: "Habría que medir y calibrar de nuevo.",
          estudiantes: "Exponen su umbral con los datos que lo respaldan.",
          verifique: "Cada equipo fundamentó su número con datos.",
          evalua: ["c3"]
        },
        {
          titulo: "Síntesis", min: 3,
          docente: "Cierre con la idea central y recoja las bitácoras.",
          diga: "Un umbral sin datos detrás es una suposición. Guarden su valor: lo usarán para programar la respuesta.",
          estudiantes: "Anotan su umbral final y entregan la bitácora.",
          verifique: "Cada bitácora muestra el umbral final y su validación."
        }
      ]
    },
    dificultades: [
      { situacion: "Los dos promedios son muy cercanos.", causa: "Las condiciones no fueron suficientemente distintas.", accion: "Pida generar una condición más extrema." },
      { situacion: "Las lecturas varían mucho en una misma condición.", causa: "Cable flojo, movimiento o luz cambiante.", accion: "Pida fijar el sensor y revisar las conexiones antes de medir de nuevo." },
      { situacion: "El umbral funciona en una mesa y falla en otra.", causa: "Cambió el entorno.", accion: "Aproveche el caso para explicar por qué se debe calibrar en el lugar de uso." },
      { situacion: "El equipo copia el umbral de otro.", causa: "Cree que hay un valor correcto.", accion: "Pida probar ese valor con su propio sensor y justificarlo con sus datos." },
      { situacion: "No trajeron los datos de la clase anterior.", causa: "Tabla perdida.", accion: "No afecta: las mediciones de esta clase son suficientes." }
    ],
    apoyo: "Entregue una plantilla de cálculo con los espacios para promedio, umbral y margen. Permita usar calculadora.",
    reto: "Pida definir dos umbrales, uno de encendido y otro de apagado, y explicar la ventaja frente a un solo valor.",
    siFalta: "Use los datos de la clase anterior y omita las mediciones nuevas. Reduzca la validación a cinco pruebas.",
    siSobra: "Pida calibrar en otro lugar de la escuela y comparar los umbrales.",
    criterios: [
      {
        id: "c1", saber: "3.3.1", peso: 2,
        texto: "Explica con sus palabras qué son umbral, calibración, ruido y margen.",
        evidencia: "Explicación de los conceptos usando los datos del equipo.",
        niveles: [
          "Explica los cuatro conceptos con sus propios datos.",
          "Explica los cuatro conceptos correctamente.",
          "Explica dos o tres conceptos.",
          "No explica los conceptos."
        ]
      },
      {
        id: "c2", saber: "3.3.2", peso: 3,
        texto: "Toma mediciones en más de una condición.",
        evidencia: "Dos series de diez lecturas con su variación.",
        niveles: [
          "Mide en condiciones extremas reales y controla los factores que alteran el dato.",
          "Registra las series completas en condiciones distintas.",
          "Registra series incompletas o condiciones poco distintas.",
          "Mide en una sola condición."
        ]
      },
      {
        id: "c3", saber: "3.3.2", peso: 3,
        texto: "Fundamenta el umbral y el margen con los datos registrados.",
        evidencia: "Cálculo de promedios, umbral y margen, con su justificación.",
        niveles: [
          "Calcula correctamente y defiende el valor frente a preguntas.",
          "Calcula correctamente y explica el valor con sus datos.",
          "El cálculo tiene errores o la justificación es parcial.",
          "Define el umbral sin datos."
        ]
      },
      {
        id: "c4", saber: "3.3.3", peso: 2,
        texto: "Repite la prueba para verificar la estabilidad del valor.",
        evidencia: "Tabla de validación con diez pruebas y ajustes realizados.",
        niveles: [
          "Repite por iniciativa propia hasta lograr al menos 9 de 10 aciertos.",
          "Repite las pruebas y logra al menos 9 de 10 aciertos.",
          "Hace las pruebas, pero no ajusta ni repite ante un fallo.",
          "No valida el umbral."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 3.4 */
  {
    code: "3.4",
    tema: "Respuesta automática del sistema según el umbral",
    texto: "Programa la respuesta del sistema cuando la lectura supera o cae por debajo del umbral establecido.",
    saberes: [
      { code: "3.4.1", tipo: "Declarativo",   texto: "Relación entrada-proceso-salida; condicionales aplicados a datos de sensor." },
      { code: "3.4.2", tipo: "Procedimental", texto: "Integración de lectura y condicional, activación de actuadores o señales de salida y prueba del sistema completo." },
      { code: "3.4.3", tipo: "Actitudinal",   texto: "Iniciativa para proponer usos prácticos del sistema." }
    ],
    proposito: "Al terminar la clase, cada equipo integra lectura, umbral y actuador en un solo programa, lo prueba en condiciones reales y propone una aplicación útil para su comunidad.",
    evaluacion: { tipo: "Sumativa", tecnica: "Desempeño", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 computadora, 1 placa, cable USB de datos, protoboard y sensor conectado a A0.",
      "Por equipo: 1 actuador (LED con 220 Ω, zumbador, servomotor o motor DC con driver).",
      "Para motores y servomotores: fuente de alimentación independiente, con su tierra unida a GND de la placa.",
      "Por equipo: umbral calculado en la clase anterior y bitácora."
    ],
    preparacion: [
      "Pruebe el código de referencia con cada tipo de actuador que vaya a usar.",
      "Si usará un motor DC, tenga listo el driver. Nunca lo conecte directo a un pin de la placa.",
      "Pida a cada equipo traer el umbral y el margen de la clase anterior.",
      "Dibuje en el pizarrón tres cuadros: Entrada, Proceso y Salida.",
      "Piense en dos o tres necesidades reales de la comunidad, por si algún equipo no encuentra una aplicación."
    ],
    conceptos: [
      { termino: "Entrada-proceso-salida", explicacion: "Modelo de todo sistema automático: el sensor recibe, el programa decide y el actuador responde.", ejemplo: "Luz del entorno → comparar con el umbral → encender la lámpara." },
      { termino: "Actuador", explicacion: "Dispositivo que convierte la decisión del programa en una acción física.", ejemplo: "LED, zumbador, servomotor o motor." },
      { termino: "Condicional con sensor", explicacion: "Compara la lectura con el umbral para decidir qué hacer.", ejemplo: "if (lectura < UMBRAL) enciende." },
      { termino: "Driver", explicacion: "Circuito que permite que una señal débil de la placa controle un motor que consume más corriente.", ejemplo: "Como un interruptor de pared que controla una lámpara grande." },
      { termino: "Tierra común", explicacion: "La tierra de la fuente externa y la de la placa deben estar unidas para que la señal tenga una referencia.", ejemplo: "Dos personas midiendo una altura desde el mismo suelo." },
      { termino: "Histéresis", explicacion: "Usar un valor para activar y otro para desactivar. Evita el parpadeo cerca del umbral.", ejemplo: "Un calentador que enciende a 20 °C y apaga a 24 °C." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Entrada, proceso y salida", min: 8,
          docente: "Señale los tres cuadros y pida ubicar lo trabajado en clases anteriores.",
          diga: "Ya saben leer un sensor, definir un umbral y encender algo. Hoy van a unir todo en un solo sistema.",
          pregunte: "¿Qué parte de lo que han hecho va en cada cuadro?",
          espere: "Entrada: lectura del sensor. Proceso: comparar con el umbral. Salida: actuador.",
          estudiantes: "Ubican sus avances en el esquema.",
          verifique: "Cada cuadro tiene al menos un elemento correcto.",
          evalua: ["c1"]
        },
        {
          titulo: "Criterios de la evaluación", min: 7,
          docente: "Lea la rúbrica con el grupo y comunique el propósito. Recuerde las normas para el uso de actuadores.",
          diga: "Esta clase es evaluada. Lean la rúbrica antes de empezar. Los motores nunca se conectan directo a la placa.",
          estudiantes: "Revisan la rúbrica, preguntan sus dudas y anotan su umbral.",
          verifique: "Cada equipo conoce sus criterios de evaluación y tiene su umbral."
        }
      ],
      desarrollo: [
        {
          titulo: "Modelado de la integración", min: 10,
          docente: "Escriba el programa de referencia en el proyector. Relacione cada línea con uno de los tres cuadros.",
          diga: "Esta línea lee: es la entrada. Este if decide: es el proceso. Este digitalWrite actúa: es la salida.",
          pregunte: "¿Se usa mayor que o menor que para encender una lámpara cuando oscurece?",
          espere: "Menor que, si la lectura baja al oscurecer. Depende de cómo esté conectado el sensor.",
          estudiantes: "Identifican cada parte del programa en el esquema.",
          verifique: "Pueden señalar la entrada, el proceso y la salida en el código.",
          evalua: ["c1"]
        },
        {
          titulo: "Conexión del actuador", min: 10,
          docente: "Pida conectar el actuador con el USB desconectado. Revise cada conexión, especialmente motores y fuentes externas.",
          diga: "Si usan fuente externa, unan las tierras. Esperen mi revisión antes de energizar.",
          estudiantes: "Conectan el actuador y solicitan revisión.",
          verifique: "Ningún motor está conectado directo a un pin y las tierras están unidas.",
          evalua: ["c2"]
        },
        {
          titulo: "Programación del sistema", min: 15,
          docente: "Acompañe con preguntas. Pida mantener Serial.println para observar la lectura mientras prueban.",
          diga: "Dejen visible la lectura en el monitor serial. Así sabrán si el problema está en el sensor o en la decisión.",
          estudiantes: "Integran lectura, umbral y salida en un solo programa y lo cargan.",
          verifique: "El actuador cambia de estado al cruzar el umbral.",
          evalua: ["c2", "c3"]
        },
        {
          titulo: "Prueba y ajuste", min: 10,
          docente: "Pida probar en condiciones reales. Si el actuador parpadea cerca del umbral, pida aplicar el margen.",
          diga: "Prueben varias veces cerca del umbral. Si el sistema no se decide, usen el margen que calcularon.",
          pregunte: "¿Por qué parpadea cuando la lectura está cerca del umbral?",
          espere: "Porque el ruido hace que la lectura cruce el umbral una y otra vez.",
          estudiantes: "Prueban, ajustan el umbral o el margen y registran los cambios.",
          verifique: "El sistema responde de forma estable en cinco pruebas seguidas.",
          evalua: ["c3"]
        },
        {
          titulo: "Propuesta de aplicación", min: 5,
          docente: "Pida escribir qué problema de la comunidad resolvería el sistema, quién lo usaría y qué cambiaría del prototipo.",
          diga: "Piensen en algo que le serviría de verdad a su comunidad, a su casa o a la escuela.",
          estudiantes: "Escriben su propuesta en la bitácora.",
          verifique: "La propuesta nombra un problema concreto y quién se beneficiaría.",
          evalua: ["c4"]
        }
      ],
      cierre: [
        {
          titulo: "Demostración por equipo", min: 12,
          docente: "Cada equipo demuestra el sistema y presenta su aplicación. Complete la rúbrica mientras tanto.",
          diga: "Tienen un minuto y medio: muestren su sistema cruzando el umbral y expliquen a quién le serviría.",
          estudiantes: "Demuestran el sistema y presentan su aplicación.",
          verifique: "Cada equipo mostró el cambio de estado frente al grupo.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Valoración del grupo", min: 3,
          docente: "Pida votar cuál propuesta respondería mejor a una necesidad real y por qué. Felicite el trabajo de toda la competencia.",
          pregunte: "¿Cuál propuesta ayudaría más a la comunidad y por qué?",
          espere: "Argumentan a partir de la necesidad, no por el prototipo más llamativo.",
          estudiantes: "Votan y justifican su decisión.",
          verifique: "La elección se justifica con una necesidad de la comunidad."
        }
      ]
    },
    dificultades: [
      { situacion: "El actuador está siempre encendido o siempre apagado.", causa: "Umbral fuera del rango de lectura o comparación invertida.", accion: "Pida revisar el monitor serial y confirmar si la lectura cruza el umbral." },
      { situacion: "El actuador parpadea cerca del umbral.", causa: "Ruido en la lectura.", accion: "Aplique el margen con el segundo ejemplo de código." },
      { situacion: "La placa se reinicia cuando arranca el motor.", causa: "El motor consume demasiada corriente.", accion: "Use fuente externa y driver, con las tierras unidas." },
      { situacion: "El servomotor tiembla o no se mueve.", causa: "Alimentación insuficiente o tierras separadas.", accion: "Revise la fuente y una la tierra de la fuente externa con GND de la placa." },
      { situacion: "El equipo no encuentra una aplicación.", causa: "Dificultad para relacionar el prototipo con el entorno.", accion: "Ofrezca ejemplos: alumbrado de un patio, alerta de riego en un huerto o aviso de nivel de agua." }
    ],
    apoyo: "Entregue el programa con el umbral y la comparación por completar, y use un LED como actuador.",
    reto: "Pida usar dos umbrales con el código de margen o agregar un segundo actuador para un estado intermedio.",
    siFalta: "Use LED o zumbador para todos, sin motores, y deje la propuesta de aplicación como tarea escrita.",
    siSobra: "Pida agregar al programa un contador que muestre cuántas veces se activó el sistema.",
    codigo: [
      {
        titulo: "Sistema básico: lectura, umbral y salida",
        texto: `const int SENSOR = A0;
const int ACTUADOR = 8;
const int UMBRAL = 450;  // Use el valor de su equipo

void setup() {
  pinMode(ACTUADOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(SENSOR);   // Entrada
  Serial.println(lectura);

  if (lectura < UMBRAL) {             // Proceso
    digitalWrite(ACTUADOR, HIGH);     // Salida
  } else {
    digitalWrite(ACTUADOR, LOW);
  }

  delay(200);
}`
      },
      {
        titulo: "Respuesta estable con margen",
        texto: `const int SENSOR = A0;
const int ACTUADOR = 8;
const int UMBRAL = 450;  // Use el valor de su equipo
const int MARGEN = 30;   // Use el valor de su equipo

void setup() {
  pinMode(ACTUADOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(SENSOR);
  Serial.println(lectura);

  if (lectura < UMBRAL - MARGEN) {
    digitalWrite(ACTUADOR, HIGH);
  } else if (lectura > UMBRAL + MARGEN) {
    digitalWrite(ACTUADOR, LOW);
  }
  // Dentro del margen, el actuador conserva su estado.

  delay(200);
}`
      }
    ],
    criterios: [
      {
        id: "c1", saber: "3.4.1", peso: 2,
        texto: "Explica el sistema con el modelo entrada-proceso-salida.",
        evidencia: "Esquema y explicación oral de su programa.",
        niveles: [
          "Explica cada parte y cómo se relaciona con las demás en su propio sistema.",
          "Ubica correctamente cada parte de su sistema.",
          "Ubica dos de las tres partes.",
          "No relaciona el sistema con el modelo."
        ]
      },
      {
        id: "c2", saber: "3.4.2", peso: 3,
        texto: "Integra lectura, condicional y salida en un solo programa.",
        evidencia: "Archivo del programa y conexiones seguras.",
        niveles: [
          "El programa es claro, usa constantes y las conexiones son seguras.",
          "El programa integra las tres partes y las conexiones son seguras.",
          "El programa integra las partes con ayuda o las conexiones requieren corrección.",
          "El programa no integra las tres partes."
        ]
      },
      {
        id: "c3", saber: "3.4.2", peso: 3,
        texto: "El sistema responde correctamente al cruzar el umbral.",
        evidencia: "Demostración con cambio de estado estable.",
        niveles: [
          "Responde siempre, de forma estable, y usa margen para evitar parpadeos.",
          "Responde correctamente en cinco pruebas seguidas.",
          "Responde, pero de forma inestable.",
          "No responde al cruzar el umbral."
        ]
      },
      {
        id: "c4", saber: "3.4.3", peso: 2,
        texto: "Propone una aplicación pertinente al contexto local.",
        evidencia: "Propuesta escrita en la bitácora y presentación.",
        niveles: [
          "Propone un uso concreto, con usuarios y mejoras necesarias.",
          "Propone un uso concreto que responde a una necesidad local.",
          "Propone un uso general, sin relación clara con la comunidad.",
          "No propone una aplicación."
        ]
      }
    ]
  }
  ]
});

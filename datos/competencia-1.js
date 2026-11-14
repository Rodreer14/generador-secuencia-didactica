/* ============================================================
   Competencia 1 — Montaje de circuitos
   Cada indicador trae un plan completo para 80 minutos.
   La estructura está documentada en el README.
   ============================================================ */
COMPETENCIAS.push({
  num: 1,
  eje: "Montaje de circuitos",
  texto: "Aplica los principios de funcionamiento de los componentes electrónicos básicos en el montaje de circuitos, guiándose por diagramas esquemáticos, para obtener sistemas funcionales.",
  indicadores: [

  /* ------------------------------------------------------------ 1.1 */
  {
    code: "1.1",
    tema: "Lectura de diagramas esquemáticos",
    texto: "Interpreta la simbología de un diagrama esquemático al trasladarlo a un montaje físico.",
    saberes: [
      { code: "1.1.1", tipo: "Declarativo",   texto: "Simbología normalizada de resistencias, LED, capacitores, fuentes, interruptores y tierra; concepto de nodo y rama." },
      { code: "1.1.2", tipo: "Procedimental", texto: "Lectura e interpretación de esquemas y trazado de la correspondencia entre símbolo y componente físico." },
      { code: "1.1.3", tipo: "Actitudinal",   texto: "Atención al detalle en la lectura técnica." }
    ],
    proposito: "Al terminar la clase, cada pareja lee un diagrama esquemático, nombra sus símbolos y lo traslada a la protoboard sin invertir conexiones.",
    evaluacion: { tipo: "Formativa", tecnica: "Observación", instrumento: "Rúbrica" },
    recursos: [
      "Por pareja: 1 protoboard, 8 cables jumper, 2 resistencias de 220 Ω, 2 LED y 1 pulsador.",
      "Por pareja: fuente de 5 V o los pines 5V y GND de una placa conectada por USB.",
      "Por pareja: 1 hoja con el esquema de trabajo impreso y lápiz.",
      "Para el docente: pizarrón, marcadores y un montaje de muestra ya probado."
    ],
    preparacion: [
      "Dibuje en el pizarrón tres esquemas: A) fuente, interruptor, resistencia y LED en serie; B) fuente, resistencia y dos LED en paralelo; C) fuente, resistencia y capacitor en serie, con el símbolo de tierra.",
      "Imprima el esquema de trabajo, uno por pareja: 5 V → pulsador → nodo N. Del nodo N salen dos ramas hacia tierra, cada una con una resistencia de 220 Ω y un LED.",
      "Arme ese mismo circuito y pruébelo. Es su montaje de muestra y confirma que el material funciona.",
      "Revise si los rieles laterales de sus protoboards están cortados a la mitad (la línea roja o azul se interrumpe). Si lo están, tenga listos cables puente.",
      "Prepare un juego de componentes por pareja antes de la clase para no perder tiempo repartiendo piezas sueltas."
    ],
    conceptos: [
      { termino: "Diagrama esquemático", explicacion: "Dibujo que muestra qué componentes hay y cómo se conectan, no dónde quedan físicamente.", ejemplo: "Es como el mapa del transporte urbano: indica qué paradas se conectan, no la forma real de las calles." },
      { termino: "Símbolos básicos", explicacion: "Resistencia: zigzag o rectángulo. LED: triángulo con una barra y dos flechas que salen. Capacitor: dos líneas paralelas. Fuente: líneas largas y cortas alternadas. Interruptor: línea abierta. Tierra: tres líneas que se acortan.", ejemplo: "En el LED, la barra marca el cátodo (−) y el triángulo apunta en el sentido de la corriente." },
      { termino: "Nodo", explicacion: "Punto donde se unen dos o más componentes. Todo lo que toca ese punto está al mismo potencial.", ejemplo: "Una fila de 5 agujeros de la protoboard es un nodo físico." },
      { termino: "Rama", explicacion: "Camino que conecta dos nodos y por el que circula una misma corriente.", ejemplo: "Como dos caminos que salen del mismo cruce y llegan al mismo pueblo." },
      { termino: "Tierra (GND)", explicacion: "Punto de referencia de 0 V al que regresa la corriente.", ejemplo: "Es el lado negativo de la fuente en estos circuitos." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Exploración de símbolos", min: 10,
          docente: "Señale los tres esquemas del pizarrón. Trace dos columnas: Lo reconocemos y Tenemos duda. Pida que nombren símbolos y anote cada uno en su columna, sin corregir todavía.",
          diga: "Aquí hay tres circuitos dibujados por un ingeniero. No busco la respuesta perfecta: quiero saber qué ya pueden leer ustedes.",
          pregunte: "¿Qué símbolos reconocen? ¿Cuál se parece a algo que ya hayan visto?",
          espere: "Suelen reconocer fuente, resistencia y LED. El capacitor y la tierra casi siempre quedan en la columna de dudas.",
          estudiantes: "Observan los esquemas y nombran en voz alta los símbolos que reconocen.",
          verifique: "Hay al menos dos símbolos en cada columna. Si no hay dudas, pida que expliquen qué hace el capacitor."
        },
        {
          titulo: "Propósito de la clase", min: 5,
          docente: "Escriba el propósito en el pizarrón y lea los criterios con los que observará el trabajo.",
          diga: "Hoy van a leer un esquema como un plano y a convertirlo en un circuito real. Nadie energiza hasta que yo revise su montaje.",
          estudiantes: "Escuchan, copian el propósito y forman parejas.",
          verifique: "Cada estudiante puede decir con sus palabras qué se espera de su pareja."
        }
      ],
      desarrollo: [
        {
          titulo: "Modelado de la lectura", min: 12,
          docente: "Resuelva las dudas de la columna con la tabla de conceptos. Después recorra el esquema B con el marcador, desde la fuente hasta tierra, nombrando cada componente. Marque con un punto cada nodo y numere las ramas.",
          diga: "Siempre leemos igual: salimos del positivo de la fuente, seguimos el camino y llegamos a tierra. Cada vez que el camino se abre, hay un nodo.",
          pregunte: "¿Cuántas ramas salen del nodo después de la resistencia en el esquema B?",
          espere: "Dos ramas, una por cada LED.",
          estudiantes: "Siguen el recorrido, completan la lista de símbolos y marcan los nodos en su cuaderno.",
          verifique: "Tres estudiantes elegidos al azar señalan un nodo y una rama correctamente.",
          evalua: ["c1"]
        },
        {
          titulo: "Rotulado del esquema de trabajo", min: 13,
          docente: "Entregue la hoja y la caja de componentes. Pida escribir junto a cada símbolo el nombre y el valor, y colocar la pieza física sobre su símbolo. Recorra las parejas con la lista de cotejo.",
          diga: "Antes de tocar la protoboard, cada pieza debe estar sobre su símbolo en la hoja. Si una pieza sobra o falta, algo se leyó mal.",
          estudiantes: "Rotulan cada símbolo, marcan el nodo N y colocan cada componente físico sobre la hoja.",
          verifique: "Cada pareja tiene todos los símbolos rotulados y ninguna pieza sobrante. No entregue cables hasta confirmarlo.",
          evalua: ["c1", "c2"]
        },
        {
          titulo: "Montaje en la protoboard", min: 20,
          docente: "Muestre en su montaje de muestra cómo una fila de 5 agujeros forma un nodo y cómo se usa el riel. Luego deje trabajar a las parejas y atienda con preguntas, sin armar por ellas.",
          diga: "Cada nodo del esquema será una fila de la protoboard. Vayan marcando con lápiz en la hoja cada conexión que ya hicieron.",
          pregunte: "Si un estudiante se atasca: ¿en qué fila está tu nodo N? ¿Qué componentes deben tocar esa fila?",
          espere: "El pulsador y las dos resistencias deben compartir la fila o conectarse a ella con un cable.",
          estudiantes: "Arman el circuito siguiendo el trazado y marcan en la hoja cada conexión realizada.",
          verifique: "Todas las conexiones están marcadas en la hoja y la fuente sigue desconectada.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Revisión y energización", min: 5,
          docente: "Revise cada montaje contra el esquema antes de autorizar la fuente. Pida que la pareja le explique el recorrido con el dedo.",
          diga: "Muéstrenme con el dedo el camino de la corriente, desde el positivo hasta tierra. Si coincide con el esquema, pueden energizar.",
          estudiantes: "Explican el recorrido, conectan la fuente y presionan el pulsador.",
          verifique: "Los dos LED encienden al presionar el pulsador y se apagan al soltarlo. Si falla, envíe a la pareja a la tabla de dificultades, no al desarme.",
          evalua: ["c3", "c4"]
        }
      ],
      cierre: [
        {
          titulo: "Revisión cruzada", min: 10,
          docente: "Pida que cada pareja intercambie lugar con otra. Cada una revisa el montaje ajeno contra el esquema y anota una observación.",
          diga: "Ahora son inspectores: revisen el circuito de sus compañeros contra el esquema y digan si coincide.",
          estudiantes: "Comparan el montaje ajeno con el esquema y comunican una observación concreta.",
          verifique: "Cada pareja recibió al menos una observación técnica, no solo un comentario general."
        },
        {
          titulo: "Metacognición", min: 5,
          docente: "Regrese a las dos columnas del inicio y mueva a Lo reconocemos los símbolos ya aclarados. Pida guardar el material completo.",
          pregunte: "¿Qué símbolo les costó más identificar y por qué?",
          espere: "Mencionan el capacitor, la tierra o la orientación del LED, y explican qué les ayudó a distinguirlo.",
          estudiantes: "Responden la pregunta en su cuaderno, comparten en voz alta y ordenan el material.",
          verifique: "La columna de dudas quedó vacía o cada duda restante tiene fecha para retomarse."
        }
      ]
    },
    dificultades: [
      { situacion: "Un LED no enciende, pero el otro sí.", causa: "LED invertido o sus dos patas en la misma fila.", accion: "Pida comparar la barra del símbolo con la pata corta del LED, y luego revisar que cada pata esté en una fila distinta." },
      { situacion: "Ningún LED enciende.", causa: "Riel cortado a la mitad o pulsador mal orientado.", accion: "Pida seguir el camino desde la fuente con el dedo. Gire el pulsador 90° si sus patas no cruzan el canal central." },
      { situacion: "Los LED quedan encendidos sin presionar.", causa: "Pulsador colocado de modo que sus patas ya están unidas internamente.", accion: "Gire el pulsador 90° y vuelva a probar." },
      { situacion: "La pareja no comprende que una fila es un nodo.", causa: "No ha visto las conexiones internas de la protoboard.", accion: "Dibuje la protoboard por dentro en el pizarrón o muestre una abierta por detrás." }
    ],
    apoyo: "Entregue a quien lo necesite una tarjeta con los símbolos y su nombre. Pida armar primero una sola rama y probarla antes de agregar la segunda.",
    reto: "Pida agregar una tercera rama al esquema, dibujarla con la simbología correcta y montarla.",
    siFalta: "Omita la revisión cruzada: revise usted los montajes y haga solo la pregunta de metacognición. No recorte el rotulado del esquema, porque es lo que se evalúa.",
    siSobra: "Entregue un esquema nuevo sin rótulos y pida a cada pareja identificar sus nodos y ramas.",
    criterios: [
      {
        id: "c1", saber: "1.1.1", peso: 2,
        texto: "Identifica correctamente al menos el 80 % de los símbolos del esquema.",
        evidencia: "Esquema de trabajo con cada símbolo rotulado.",
        niveles: [
          "Nombra todos los símbolos y distingue nodos y ramas sin ayuda.",
          "Nombra al menos el 80 % de los símbolos y señala nodos y ramas.",
          "Nombra entre el 50 % y el 79 % de los símbolos o confunde nodo con rama.",
          "Nombra menos del 50 % de los símbolos aun con la tarjeta de apoyo."
        ]
      },
      {
        id: "c2", saber: "1.1.2", peso: 3,
        texto: "Relaciona cada símbolo con su componente físico antes de montar.",
        evidencia: "Hoja con cada pieza colocada sobre su símbolo.",
        niveles: [
          "Relaciona todas las piezas y explica el valor o la polaridad de cada una.",
          "Relaciona todas las piezas sin ayuda.",
          "Relaciona las piezas con una o dos correcciones del docente.",
          "Necesita ayuda constante para relacionar las piezas."
        ]
      },
      {
        id: "c3", saber: "1.1.2", peso: 3,
        texto: "Traslada el diagrama a la protoboard sin invertir conexiones.",
        evidencia: "Circuito funcionando según el esquema.",
        niveles: [
          "El circuito funciona al primer intento y el montaje es ordenado.",
          "El circuito funciona tras corregir un error menor por sí mismo.",
          "El circuito funciona solo después de la orientación del docente.",
          "El circuito no funciona al terminar la clase."
        ]
      },
      {
        id: "c4", saber: "1.1.3", peso: 2,
        texto: "Revisa su trabajo antes de solicitar la verificación docente.",
        evidencia: "Conexiones marcadas en la hoja antes de energizar.",
        niveles: [
          "Marca cada conexión, detecta sus errores y los corrige antes de llamar al docente.",
          "Marca las conexiones y revisa su montaje antes de llamar al docente.",
          "Revisa solo cuando el docente se lo pide.",
          "Solicita energizar sin haber revisado."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 1.2 */
  {
    code: "1.2",
    tema: "Ley de Ohm, código de colores y polaridad",
    texto: "Conecta los componentes respetando polaridad, valores de resistencia y niveles de voltaje requeridos.",
    saberes: [
      { code: "1.2.1", tipo: "Declarativo",   texto: "Corriente, voltaje y resistencia; ley de Ohm; código de colores; componentes polarizados y no polarizados." },
      { code: "1.2.2", tipo: "Procedimental", texto: "Identificación de terminales, cálculo de resistencia limitadora y armado ordenado del circuito." },
      { code: "1.2.3", tipo: "Actitudinal",   texto: "Cuidado en el manejo de componentes y responsabilidad con el equipo del laboratorio." }
    ],
    proposito: "Al terminar la clase, cada equipo calcula la resistencia limitadora de un LED, la localiza por su código de colores y arma el circuito respetando la polaridad.",
    evaluacion: { tipo: "Formativa", tecnica: "Desempeño", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 protoboard, 4 cables jumper, 1 LED según su caso y resistencias surtidas (100 Ω, 150 Ω, 220 Ω, 330 Ω y 1 kΩ).",
      "Por equipo: fuente de 5 V o los pines 5V y GND de una placa, calculadora y bitácora.",
      "Por equipo: tarjeta con su caso de cálculo y tabla de código de colores.",
      "Para el docente: un LED quemado y un inventario del material entregado."
    ],
    preparacion: [
      "Consiga un LED dañado. Si no tiene uno, dibuje el caso en el pizarrón; no queme un LED frente a los estudiantes.",
      "Prepare tarjetas con cuatro casos, todos con fuente de 5 V: A) LED rojo 2 V, 20 mA; B) LED rojo 2 V, 10 mA; C) LED verde 2.2 V, 20 mA; D) LED azul 3.2 V, 20 mA.",
      "Tenga a mano las respuestas: A) 150 Ω; B) 300 Ω, se usa 330 Ω; C) 140 Ω, se usa 150 Ω; D) 90 Ω, se usa 100 Ω.",
      "Verifique que dispone de esas resistencias. Si no tiene 150 Ω, indique usar 220 Ω y explique que el LED brillará un poco menos.",
      "Prepare una hoja de inventario para firmar la entrega y devolución del material."
    ],
    conceptos: [
      { termino: "Voltaje (V)", explicacion: "Diferencia de energía que empuja la corriente. Se mide en voltios.", ejemplo: "Como la altura de un tanque de agua: a mayor altura, mayor presión." },
      { termino: "Corriente (I)", explicacion: "Cantidad de carga que circula por segundo. Se mide en amperios; 20 mA son 0.020 A.", ejemplo: "Como el caudal de agua que pasa por una tubería." },
      { termino: "Resistencia (R)", explicacion: "Oposición al paso de la corriente. Se mide en ohmios (Ω).", ejemplo: "Como una parte angosta de la tubería que frena el agua." },
      { termino: "Ley de Ohm", explicacion: "V = I × R. Para un LED: R = (V fuente − V LED) ÷ I LED.", ejemplo: "(5 V − 2 V) ÷ 0.020 A = 150 Ω." },
      { termino: "Código de colores", explicacion: "Bandas que indican el valor: dos dígitos, multiplicador y tolerancia. Negro 0, marrón 1, rojo 2, naranja 3, amarillo 4, verde 5, azul 6, violeta 7, gris 8, blanco 9.", ejemplo: "150 Ω = marrón, verde, marrón. 220 Ω = rojo, rojo, marrón." },
      { termino: "Polaridad", explicacion: "Algunos componentes funcionan en un solo sentido. El LED tiene ánodo (+, pata larga) y cátodo (−, pata corta y lado plano). La resistencia no tiene polaridad.", ejemplo: "Como una puerta que solo abre hacia un lado." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "El caso del LED quemado", min: 8,
          docente: "Muestre el LED dañado y haga circular la pieza. Anote las ideas en el pizarrón sin confirmarlas todavía.",
          diga: "Este LED estaba conectado directo a 5 voltios y dejó de funcionar. Hoy vamos a averiguar por qué y cómo evitarlo.",
          pregunte: "¿Por qué creen que falló? ¿Qué le faltó al circuito?",
          espere: "Exceso de corriente o voltaje, y falta de una resistencia que la limite.",
          estudiantes: "Observan la pieza y proponen causas de la falla.",
          verifique: "Al menos una idea menciona corriente o resistencia. Si no surge, pregunte qué pasa con una tubería sin llave de paso."
        },
        {
          titulo: "Recuperar conceptos", min: 7,
          docente: "Explique voltaje, corriente y resistencia con la analogía del agua. Escriba V = I × R y comunique el propósito.",
          diga: "Cada LED necesita una cantidad de corriente. La resistencia es la llave que la limita, y hoy van a calcularla.",
          pregunte: "Si aumento la resistencia y el voltaje sigue igual, ¿qué pasa con la corriente?",
          espere: "La corriente disminuye.",
          estudiantes: "Anotan la fórmula y responden con sus palabras.",
          verifique: "El grupo responde correctamente la pregunta sobre la corriente.",
          evalua: ["c1"]
        }
      ],
      desarrollo: [
        {
          titulo: "Modelado del cálculo", min: 12,
          docente: "Resuelva paso a paso el caso del LED rojo: 1) Voltaje en la resistencia = 5 V − 2 V = 3 V. 2) Convertir 20 mA en 0.020 A. 3) R = 3 V ÷ 0.020 A = 150 Ω. 4) Elegir el valor comercial igual o mayor. Luego muestre cómo leer 150 Ω por colores.",
          diga: "El LED usa 2 voltios; los otros 3 tiene que absorberlos la resistencia. Por eso restamos antes de dividir. El error más común es olvidar convertir los miliamperios.",
          pregunte: "¿Por qué elegimos el valor comercial mayor y no el menor?",
          espere: "Porque una resistencia menor deja pasar más corriente de la que soporta el LED.",
          estudiantes: "Copian el procedimiento y localizan una resistencia de 150 Ω por sus colores.",
          verifique: "Cada equipo señala la resistencia correcta en su caja.",
          evalua: ["c1"]
        },
        {
          titulo: "Cálculo por equipo", min: 13,
          docente: "Entregue una tarjeta de caso a cada equipo y firme la entrega del material. Pida escribir el cálculo completo en la bitácora, con unidades.",
          diga: "Cada equipo tiene un caso distinto. Quiero ver el procedimiento escrito, no solo el resultado.",
          estudiantes: "Calculan la resistencia de su caso, eligen el valor comercial y lo localizan por código de colores.",
          verifique: "El resultado coincide con las respuestas de su preparación. Si no coincide, pida revisar la conversión de mA a A.",
          evalua: ["c2"]
        },
        {
          titulo: "Armado respetando la polaridad", min: 15,
          docente: "Muestre cómo identificar el ánodo y el cátodo. Deje armar con la fuente desconectada y recorra los equipos revisando orden y cuidado del material.",
          diga: "La pata larga del LED va hacia el positivo. La fuente se conecta solo cuando yo lo autorice.",
          estudiantes: "Identifican las terminales del LED y arman el circuito con cables cortos y ordenados.",
          verifique: "El LED está orientado correctamente y la fuente continúa desconectada.",
          evalua: ["c3", "c4"]
        },
        {
          titulo: "Justificación y energización", min: 10,
          docente: "Pase por cada equipo y pida justificar la resistencia antes de autorizar la fuente.",
          diga: "Antes de energizar, explíquenme por qué eligieron esa resistencia.",
          pregunte: "¿Qué valor calcularon y qué colores tiene la resistencia que usaron?",
          espere: "Dicen el valor calculado, el valor comercial y sus colores, y los colores coinciden con la pieza.",
          estudiantes: "Justifican su elección, energizan y registran en la bitácora si el LED encendió.",
          verifique: "El LED enciende con brillo normal y sin calentarse.",
          evalua: ["c2", "c3"]
        }
      ],
      cierre: [
        {
          titulo: "Puesta en común", min: 10,
          docente: "Haga una tabla en el pizarrón con el caso, el valor calculado y el valor usado de cada equipo. Discuta qué cambiaría con otra resistencia.",
          pregunte: "¿Qué pasaría con una resistencia menor? ¿Y con una mayor?",
          espere: "Menor: más corriente, más brillo y riesgo de quemar el LED. Mayor: menos corriente y menos brillo.",
          estudiantes: "Reportan sus valores, comparan los casos y registran la conclusión en la bitácora.",
          verifique: "La conclusión escrita relaciona resistencia, corriente y brillo."
        },
        {
          titulo: "Devolución del material", min: 5,
          docente: "Reciba el material contra el inventario y firme la devolución.",
          diga: "El laboratorio es de todos. Un componente perdido hoy es un circuito que otro grupo no podrá armar mañana.",
          estudiantes: "Clasifican las resistencias, devuelven el material completo y firman el inventario.",
          verifique: "El inventario coincide con lo entregado y las mesas quedan limpias.",
          evalua: ["c4"]
        }
      ]
    },
    dificultades: [
      { situacion: "El resultado da 0.15 o 150 000.", causa: "No se convirtió correctamente de mA a A.", accion: "Pida escribir 20 mA = 0.020 A antes de dividir." },
      { situacion: "El resultado da 250 Ω en lugar de 150 Ω.", causa: "Dividió 5 V sin restar el voltaje del LED.", accion: "Pregunte cuántos voltios consume el LED y cuántos quedan para la resistencia." },
      { situacion: "El LED no enciende.", causa: "LED invertido.", accion: "Pida girarlo. No se daña si solo estuvo invertido a 5 V por unos segundos con la resistencia puesta." },
      { situacion: "El LED enciende muy débil.", causa: "Resistencia de valor muy alto, leída mal por colores.", accion: "Pida leer de nuevo las bandas, empezando por el extremo opuesto a la banda dorada." },
      { situacion: "No hay el valor comercial exacto.", causa: "Inventario limitado.", accion: "Indique usar el siguiente valor mayor disponible y registrarlo en la bitácora." }
    ],
    apoyo: "Entregue una plantilla con los espacios de la fórmula ya escritos: V fuente, V LED, resta, corriente en A y resultado.",
    reto: "Pida calcular la potencia de la resistencia con P = V × I y decidir si una de 1/4 W es suficiente. Caso A: 3 V × 0.020 A = 0.06 W, sí es suficiente.",
    siFalta: "Asigne a todos el mismo caso del modelado y omita la tabla comparativa; conserve la justificación antes de energizar.",
    siSobra: "Pida calcular la resistencia para dos LED rojos en serie: (5 V − 4 V) ÷ 0.020 A = 50 Ω.",
    criterios: [
      {
        id: "c1", saber: "1.2.1", peso: 2,
        texto: "Explica la relación entre voltaje, corriente y resistencia, y lee el código de colores.",
        evidencia: "Respuestas orales y resistencia localizada por colores.",
        niveles: [
          "Explica la ley de Ohm con un ejemplo propio y lee cualquier resistencia sin tabla.",
          "Explica la relación entre las tres magnitudes y lee los colores con la tabla.",
          "Repite la fórmula sin explicarla o comete errores al leer los colores.",
          "No relaciona las magnitudes ni lee los colores."
        ]
      },
      {
        id: "c2", saber: "1.2.2", peso: 3,
        texto: "Calcula la resistencia limitadora con el procedimiento correcto.",
        evidencia: "Cálculo completo con unidades en la bitácora.",
        niveles: [
          "Calcula correctamente, con unidades, y justifica el valor comercial elegido.",
          "Calcula correctamente y elige un valor comercial adecuado.",
          "Aplica la fórmula con un error de conversión o de resta que corrige con ayuda.",
          "No logra plantear el cálculo aun con la plantilla."
        ]
      },
      {
        id: "c3", saber: "1.2.2", peso: 3,
        texto: "Respeta la polaridad y el voltaje al armar el circuito.",
        evidencia: "Circuito con el LED encendido y fuente de 5 V.",
        niveles: [
          "Identifica las terminales sin ayuda y el circuito funciona al primer intento.",
          "Respeta la polaridad y el circuito funciona.",
          "Invierte un componente y lo corrige con orientación.",
          "No identifica las terminales y el circuito no funciona."
        ]
      },
      {
        id: "c4", saber: "1.2.3", peso: 2,
        texto: "Maneja el material con cuidado y lo devuelve completo y en buen estado.",
        evidencia: "Inventario firmado y área de trabajo limpia.",
        niveles: [
          "Cuida el material, lo clasifica al devolverlo y apoya a otros equipos.",
          "Cuida el material y lo devuelve completo.",
          "Devuelve el material completo solo después de un recordatorio.",
          "Devuelve material incompleto o dañado por descuido."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 1.3 */
  {
    code: "1.3",
    tema: "Uso del multímetro para verificar circuitos",
    texto: "Comprueba la continuidad y el funcionamiento del circuito armado mediante instrumentos de medición.",
    saberes: [
      { code: "1.3.1", tipo: "Declarativo",   texto: "Función del multímetro; conceptos de continuidad, circuito abierto y cortocircuito." },
      { code: "1.3.2", tipo: "Procedimental", texto: "Uso del multímetro en sus escalas de continuidad, voltaje y resistencia, con registro de mediciones." },
      { code: "1.3.3", tipo: "Actitudinal",   texto: "Rigurosidad en la verificación previa a energizar el circuito." }
    ],
    proposito: "Al terminar la clase, cada equipo mide continuidad, voltaje y resistencia con el multímetro, registra los datos con su unidad y los compara con los valores esperados.",
    evaluacion: { tipo: "Formativa", tecnica: "Desempeño", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 multímetro digital con batería revisada y puntas en buen estado.",
      "Por equipo: 1 circuito armado (fuente de 5 V, resistencia de 220 Ω y LED) y 2 resistencias sueltas de valores distintos.",
      "Por equipo: tabla de registro de mediciones y bitácora.",
      "Para el docente: un circuito con una falla oculta para la demostración."
    ],
    preparacion: [
      "Prepare el circuito de demostración con un cable colocado una fila más abajo de lo debido, de modo que el LED no encienda.",
      "Revise cada multímetro: póngalo en continuidad y junte las puntas. Debe sonar. Cambie la batería o las puntas si no suena.",
      "Imprima la tabla de registro con las columnas: Punto de medición, Escala, Valor esperado, Valor medido, Unidad y ¿Coincide?",
      "Precargue en la tabla los valores esperados: fuente ≈ 5 V, resistencia ≈ 3 V, LED ≈ 2 V y resistencia de 220 Ω entre 209 Ω y 231 Ω.",
      "Arme un circuito por equipo o reserve los primeros minutos del desarrollo para que lo armen."
    ],
    conceptos: [
      { termino: "Multímetro", explicacion: "Instrumento que mide voltaje, resistencia y continuidad, entre otras magnitudes. La punta negra va en COM y la roja en VΩ.", ejemplo: "Es el estetoscopio del técnico: permite revisar el circuito sin desarmarlo." },
      { termino: "Continuidad", explicacion: "Existe un camino eléctrico entre dos puntos. El multímetro emite un sonido. Se mide con el circuito apagado.", ejemplo: "Como comprobar que una manguera no está cortada." },
      { termino: "Circuito abierto", explicacion: "El camino está interrumpido y no circula corriente. El multímetro no suena.", ejemplo: "Un puente caído: el camino no llega al otro lado." },
      { termino: "Cortocircuito", explicacion: "La corriente encuentra un camino casi sin resistencia y evita la carga. Puede dañar la fuente o los componentes.", ejemplo: "Un atajo que deja vacío el camino principal." },
      { termino: "Medición de voltaje", explicacion: "Se hace con el circuito encendido, con las puntas en paralelo al componente, en la escala de 20 V DC.", ejemplo: "Se comparan dos puntos, igual que medir la diferencia de altura entre dos gradas." },
      { termino: "Tolerancia", explicacion: "Margen de error del valor real. Una banda dorada indica ±5 %: 220 Ω puede medir entre 209 Ω y 231 Ω.", ejemplo: "Dos resistencias iguales pueden dar lecturas algo distintas y ambas ser correctas." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "Demostración de la falla oculta", min: 8,
          docente: "Conecte el circuito de demostración frente al grupo. El LED no enciende. Deje que propongan causas sin tocar el circuito.",
          diga: "Este circuito se ve bien, pero no funciona. No lo voy a desarmar. Díganme cómo encontrarían el problema.",
          pregunte: "¿Cómo podrían saber dónde está el problema sin desarmarlo?",
          espere: "Revisar cable por cable o medir con algún instrumento. Si nadie menciona el multímetro, muéstrelo.",
          estudiantes: "Observan el circuito y proponen formas de encontrar la falla.",
          verifique: "El grupo reconoce que hace falta un instrumento para ver lo que el ojo no ve."
        },
        {
          titulo: "Conceptos y normas de uso", min: 7,
          docente: "Explique continuidad, circuito abierto y cortocircuito. Escriba en el pizarrón las dos reglas de seguridad.",
          diga: "Dos reglas: continuidad y resistencia se miden con el circuito apagado; el voltaje se mide con el circuito encendido.",
          pregunte: "¿Con el circuito encendido o apagado se mide la continuidad? ¿Por qué?",
          espere: "Apagado, porque el multímetro usa su propia batería y el voltaje del circuito altera la medición o daña el instrumento.",
          estudiantes: "Copian las reglas y responden.",
          verifique: "El grupo repite las dos reglas sin leerlas.",
          evalua: ["c1"]
        }
      ],
      desarrollo: [
        {
          titulo: "Modelado de las tres mediciones", min: 15,
          docente: "Con el circuito de demostración, mida: 1) Continuidad en cada tramo hasta encontrar el cable mal colocado; corríjalo. 2) Voltaje en la fuente, la resistencia y el LED, en 20 V DC. 3) Una resistencia suelta en la escala de 2 kΩ. Diga en voz alta cada decisión.",
          diga: "Primero elijo la escala, después coloco las puntas y al final leo. Si la pantalla muestra 1 a la izquierda, significa que el valor no cabe en esa escala: subo una.",
          pregunte: "Si en la fuente mido 5 V y en la resistencia 3 V, ¿cuánto espero medir en el LED?",
          espere: "Cerca de 2 V, porque los voltajes de la serie suman el voltaje de la fuente.",
          estudiantes: "Observan, anotan la secuencia y responden.",
          verifique: "Dos voluntarios repiten la secuencia de colocar puntas y elegir escala.",
          evalua: ["c1"]
        },
        {
          titulo: "Continuidad y resistencia, circuito apagado", min: 15,
          docente: "Entregue multímetros y tablas. Confirme que los circuitos estén sin energía. Recorra los equipos revisando la escala antes de cada lectura.",
          diga: "Con la fuente desconectada, midan continuidad en cada rama y el valor real de las dos resistencias sueltas. Toda medición lleva su unidad.",
          estudiantes: "Miden continuidad por rama y el valor de dos resistencias, y registran cada dato.",
          verifique: "La tabla tiene unidades y las resistencias medidas están dentro de la tolerancia. Si no, pida revisar la escala.",
          evalua: ["c2", "c3", "c4"]
        },
        {
          titulo: "Voltaje, circuito encendido", min: 15,
          docente: "Autorice la energía solo a los equipos que ya revisaron continuidad. Observe que las puntas se coloquen en paralelo.",
          diga: "Ya verificaron el circuito apagado, ahora sí pueden energizar. Midan voltaje en la fuente, la resistencia y el LED.",
          estudiantes: "Energizan, miden voltaje en tres puntos y completan la tabla.",
          verifique: "La suma de los voltajes de resistencia y LED se aproxima al voltaje de la fuente.",
          evalua: ["c2", "c3"]
        },
        {
          titulo: "Comparación de valores", min: 5,
          docente: "Pida comparar el valor esperado y el medido, y marcar la columna ¿Coincide?",
          diga: "Una diferencia no significa que midieron mal. Busquen qué la explica.",
          estudiantes: "Marcan las coincidencias y eligen una discrepancia para reportar.",
          verifique: "Cada equipo identificó al menos una discrepancia, aunque sea pequeña."
        }
      ],
      cierre: [
        {
          titulo: "Reporte de discrepancias", min: 10,
          docente: "Cada equipo reporta una discrepancia y su explicación. Agrupe las causas en el pizarrón.",
          pregunte: "¿Qué valor no coincidió y qué lo puede explicar?",
          espere: "Tolerancia de la resistencia, fuente que no da exactamente 5 V, mala conexión o escala inadecuada.",
          estudiantes: "Exponen su discrepancia y proponen una causa.",
          verifique: "En el pizarrón quedan al menos tres causas distintas."
        },
        {
          titulo: "Sistematización", min: 5,
          docente: "Pida escribir la secuencia de verificación que se usará desde hoy en cada clase, y recoja las tablas.",
          diga: "Desde hoy, ningún circuito se energiza sin pasar primero por el multímetro.",
          estudiantes: "Escriben en la bitácora: revisar, medir continuidad, energizar, medir voltaje.",
          verifique: "Las tablas están completas y los multímetros quedaron apagados."
        }
      ]
    },
    dificultades: [
      { situacion: "La pantalla muestra 1 a la izquierda.", causa: "El valor supera la escala elegida, o el circuito está abierto.", accion: "Pida subir la escala. Si sigue igual, revise el contacto de las puntas." },
      { situacion: "El voltaje aparece con signo negativo.", causa: "Puntas invertidas.", accion: "Explique que el valor es correcto y que basta con invertir las puntas." },
      { situacion: "La resistencia medida es muy distinta a la esperada.", causa: "Se midió dentro del circuito o con los dedos sobre las puntas.", accion: "Pida sacarla del circuito y no tocar los extremos metálicos." },
      { situacion: "El multímetro no suena en continuidad.", causa: "Batería baja, puntas dañadas o selector en otra función.", accion: "Pida juntar las puntas para probar el instrumento. Si no suena, cámbielo por el de reserva." },
      { situacion: "No alcanzan los multímetros.", causa: "Inventario limitado.", accion: "Forme estaciones por turnos: mientras un equipo mide, los demás calculan los valores esperados." }
    ],
    apoyo: "Entregue una tarjeta con el dibujo del selector y la escala que corresponde a cada medición. Asigne roles: uno sostiene las puntas, otro lee y otro registra.",
    reto: "Pida medir el voltaje con dos resistencias en serie y predecir antes de medir cómo se reparte.",
    siFalta: "Omita la medición de una de las resistencias sueltas y reporte solo dos discrepancias en plenaria.",
    siSobra: "Introduzca un cable mal colocado en el circuito de otro equipo y pida localizarlo solo con el multímetro.",
    criterios: [
      {
        id: "c1", saber: "1.3.1", peso: 2,
        texto: "Explica la función del multímetro y distingue continuidad, circuito abierto y cortocircuito.",
        evidencia: "Respuestas orales durante el modelado.",
        niveles: [
          "Distingue los tres conceptos y da un ejemplo de cada uno en un circuito real.",
          "Distingue los tres conceptos con sus palabras.",
          "Distingue solo uno o dos conceptos.",
          "No distingue los conceptos."
        ]
      },
      {
        id: "c2", saber: "1.3.2", peso: 3,
        texto: "Selecciona la escala adecuada del multímetro para cada medición.",
        evidencia: "Observación directa del uso del instrumento.",
        niveles: [
          "Elige la escala correcta siempre y explica por qué.",
          "Elige la escala correcta en todas las mediciones.",
          "Elige la escala correcta después de una corrección.",
          "Necesita que le indiquen la escala en cada medición."
        ]
      },
      {
        id: "c3", saber: "1.3.2", peso: 3,
        texto: "Registra las mediciones con su unidad y las compara con el valor esperado.",
        evidencia: "Tabla de registro completa.",
        niveles: [
          "Registra todo con unidad y explica cada discrepancia.",
          "Registra todo con unidad y marca las discrepancias.",
          "Registra datos incompletos o sin unidad.",
          "No registra o copia datos sin medir."
        ]
      },
      {
        id: "c4", saber: "1.3.3", peso: 2,
        texto: "Verifica el circuito antes de energizarlo.",
        evidencia: "Continuidad medida y registrada antes de conectar la fuente.",
        niveles: [
          "Verifica todas las ramas por iniciativa propia y corrige antes de energizar.",
          "Verifica el circuito antes de energizar.",
          "Verifica solo cuando se le recuerda.",
          "Energiza sin verificar."
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ 1.4 */
  {
    code: "1.4",
    tema: "Detección y corrección de fallas de montaje",
    texto: "Corrige los errores de conexión detectados hasta lograr el comportamiento esperado del circuito.",
    saberes: [
      { code: "1.4.1", tipo: "Declarativo",   texto: "Fallas comunes de montaje y sus síntomas." },
      { code: "1.4.2", tipo: "Procedimental", texto: "Revisión sistemática del circuito, aislamiento del punto de falla, reconexión y nueva prueba." },
      { code: "1.4.3", tipo: "Actitudinal",   texto: "Perseverancia ante el error y disposición a rehacer el trabajo." }
    ],
    proposito: "Al terminar la clase, cada equipo localiza y corrige la falla de un circuito aplicando en orden un protocolo de cuatro pasos, y documenta cómo la encontró.",
    evaluacion: { tipo: "Sumativa", tecnica: "Análisis del producto", instrumento: "Rúbrica" },
    recursos: [
      "Por equipo: 1 circuito con falla preparada (fuente de 5 V, resistencia de 220 Ω y LED) y 1 multímetro.",
      "Por equipo: protocolo de revisión impreso y bitácora.",
      "Para el docente: componentes de repuesto, un registro de qué falla tiene cada equipo y un cable jumper dañado."
    ],
    preparacion: [
      "Prepare un circuito por equipo con una de estas fallas: A) LED invertido; B) cable una fila fuera de lugar; C) resistencia de 100 kΩ en lugar de 220 Ω; D) las dos patas del LED en la misma fila; E) cable jumper roto por dentro.",
      "Anote en su registro qué falla recibió cada equipo. No prepare ninguna falla que una directamente el positivo con tierra: un cortocircuito real puede dañar la fuente.",
      "Imprima el protocolo: 1) Inspección visual. 2) Verificación de alimentación: 5 V entre los rieles. 3) Continuidad por rama, sin energía. 4) Aislamiento: cambiar un solo elemento y volver a probar.",
      "Prepare en la bitácora o en el pizarrón el formato: Hipótesis, Prueba realizada, Resultado y Conclusión."
    ],
    conceptos: [
      { termino: "Síntoma", explicacion: "Lo que se observa cuando el circuito falla.", ejemplo: "El LED no enciende, o enciende muy débil." },
      { termino: "Causa", explicacion: "Lo que produce el síntoma. Un mismo síntoma puede tener varias causas.", ejemplo: "Un LED apagado puede deberse a un cable suelto o a un LED invertido." },
      { termino: "Hipótesis", explicacion: "Explicación probable que se comprueba con una prueba concreta.", ejemplo: "Creo que el cable del riel está roto; lo compruebo midiendo continuidad." },
      { termino: "Aislamiento de la falla", explicacion: "Reducir la búsqueda a una parte del circuito y cambiar un solo elemento por vez.", ejemplo: "Como un médico que descarta causas una por una." }
    ],
    pasos: {
      inicio: [
        {
          titulo: "El reto", min: 7,
          docente: "Entregue a cada equipo su circuito con falla y anuncie el reto. No diga cuál es la falla.",
          diga: "Cada equipo recibió un circuito que no funciona. El reto es repararlo sin desarmarlo por completo. Gana quien pueda explicar cómo llegó a la falla, no quien termine primero.",
          pregunte: "¿Qué es lo primero que harían?",
          espere: "Muchos dirán reconectar todo. Use esa respuesta para justificar el protocolo.",
          estudiantes: "Reciben el circuito y describen el síntoma en la bitácora sin modificar nada.",
          verifique: "Cada equipo escribió el síntoma observado, no una suposición sobre la causa.",
          evalua: ["c1"]
        },
        {
          titulo: "Presentación del protocolo", min: 8,
          docente: "Entregue el protocolo y explique cada paso. Muestre en el pizarrón un ejemplo de bitácora completa.",
          diga: "Reconectar al azar puede esconder la falla o crear otra. Por eso cambiamos una sola cosa a la vez y probamos.",
          estudiantes: "Leen el protocolo y preparan el formato en la bitácora.",
          verifique: "Cada equipo puede decir los cuatro pasos en orden."
        }
      ],
      desarrollo: [
        {
          titulo: "Inspección y alimentación", min: 15,
          docente: "Recorra los equipos sin dar pistas. Responda con preguntas. Confirme que midan 5 V entre rieles antes de seguir.",
          diga: "Háganlo en orden. Primero miren, después midan la fuente. Si no llega energía, lo demás no importa.",
          pregunte: "¿Qué descartaron con esa medición?",
          espere: "Que el problema esté en la fuente o en los cables de alimentación.",
          estudiantes: "Aplican los pasos 1 y 2 del protocolo y registran hipótesis y resultado.",
          verifique: "Cada equipo tiene al menos una hipótesis registrada y su resultado.",
          evalua: ["c2", "c3"]
        },
        {
          titulo: "Continuidad y aislamiento", min: 20,
          docente: "Pida apagar el circuito para medir continuidad. Si un equipo reconecta al azar, deténgalo y pídale volver al último paso del protocolo.",
          diga: "Cada prueba debe contestar una pregunta. Antes de cambiar algo, díganme qué esperan que pase.",
          pregunte: "Si cambias este cable y el LED sigue apagado, ¿qué aprendiste?",
          espere: "Que ese cable no era la causa y se puede descartar.",
          estudiantes: "Aplican los pasos 3 y 4, cambian un solo elemento a la vez y registran cada intento.",
          verifique: "El equipo cambia una sola cosa por prueba.",
          evalua: ["c2", "c3", "c4"]
        },
        {
          titulo: "Corrección y prueba final", min: 15,
          docente: "Cuando un equipo diga que terminó, pida una prueba completa frente a usted. Compare la falla reportada con su registro.",
          diga: "Muéstrenme el circuito funcionando y díganme qué falla tenía y qué paso del protocolo la reveló.",
          estudiantes: "Corrigen la falla, prueban el circuito y documentan la falla y la corrección.",
          verifique: "El LED enciende y la falla documentada coincide con su registro. Los equipos que terminan antes pasan al trabajo adicional.",
          evalua: ["c3", "c4"]
        }
      ],
      cierre: [
        {
          titulo: "Exposición de un minuto", min: 10,
          docente: "Cada equipo expone durante un minuto. Mientras tanto, construya en el pizarrón una tabla Síntoma, Causa y Cómo se detecta.",
          diga: "Un minuto por equipo: qué síntoma tenía, cuál fue la falla y qué paso la reveló.",
          estudiantes: "Exponen su caso y copian la tabla colectiva.",
          verifique: "La tabla reúne todas las fallas trabajadas.",
          evalua: ["c1"]
        },
        {
          titulo: "Reflexión sobre el error", min: 5,
          docente: "Reconozca públicamente a un equipo que perseveró, no al más rápido, y recoja las bitácoras.",
          pregunte: "¿Qué hipótesis resultó falsa y qué aprendieron de ella?",
          espere: "Reconocen que descartar una causa acerca a la solución.",
          estudiantes: "Responden en la bitácora y la entregan.",
          verifique: "Todas las bitácoras tienen síntoma, hipótesis, resultado y corrección."
        }
      ]
    },
    dificultades: [
      { situacion: "El equipo desarma todo el circuito.", causa: "Ansiedad por terminar o desconfianza en el protocolo.", accion: "Entregue otro circuito con falla y acompañe el primer paso con ellos." },
      { situacion: "El equipo no avanza después de 15 minutos.", causa: "Falta de método o bloqueo.", accion: "Pida leer en voz alta su última hipótesis y sugiera medir el tramo que aún no han probado." },
      { situacion: "La continuidad da bien, pero el LED sigue sin encender.", causa: "LED invertido o dañado.", accion: "Pida probar el LED por separado o medirlo en la función de diodo." },
      { situacion: "El equipo encontró la falla por casualidad.", causa: "Cambió varios elementos a la vez.", accion: "Pida reinstalar la falla y demostrar con el multímetro cómo se detecta." },
      { situacion: "Aparece una falla que usted no preparó.", causa: "Componente dañado o error al reconectar.", accion: "Trátela como parte del reto y regístrela en la tabla colectiva." }
    ],
    apoyo: "Asigne fallas A o B, que son más visibles. Entregue el protocolo con preguntas guía en cada paso.",
    reto: "Asigne dos fallas en el mismo circuito o la falla E, que no se ve a simple vista.",
    siFalta: "Reduzca la exposición a tres equipos, con fallas distintas, y complete la tabla usted mismo.",
    siSobra: "Pida a los equipos preparar una falla para otro equipo, con su autorización para evitar cortocircuitos.",
    criterios: [
      {
        id: "c1", saber: "1.4.1", peso: 2,
        texto: "Relaciona el síntoma observado con las fallas comunes de montaje.",
        evidencia: "Descripción del síntoma y de las fallas que podrían causarlo.",
        niveles: [
          "Describe el síntoma con precisión y propone varias causas posibles.",
          "Describe el síntoma y propone al menos una causa pertinente.",
          "Confunde el síntoma con la causa.",
          "No describe el síntoma."
        ]
      },
      {
        id: "c2", saber: "1.4.2", peso: 3,
        texto: "Aplica el protocolo en orden en lugar de reconectar al azar.",
        evidencia: "Registro de cada paso del protocolo aplicado y de lo medido.",
        niveles: [
          "Sigue los cuatro pasos en orden y cambia un solo elemento por prueba.",
          "Sigue los pasos en orden con alguna omisión menor.",
          "Sigue el protocolo solo cuando el docente interviene.",
          "Reconecta al azar."
        ]
      },
      {
        id: "c3", saber: "1.4.2", peso: 3,
        texto: "Documenta la falla, la corrección y logra el comportamiento esperado.",
        evidencia: "Registro de cada hipótesis, su resultado, la falla encontrada y la corrección.",
        niveles: [
          "El circuito funciona y la bitácora permite repetir toda la búsqueda.",
          "El circuito funciona y la bitácora indica la falla y la corrección.",
          "El circuito funciona, pero la bitácora está incompleta.",
          "El circuito no funciona o no hay registro."
        ]
      },
      {
        id: "c4", saber: "1.4.3", peso: 2,
        texto: "Persiste ante los intentos fallidos y está dispuesto a rehacer el trabajo.",
        evidencia: "Explicación de lo que hizo cuando una prueba no dio resultado.",
        niveles: [
          "Mantiene la calma, propone nuevas pruebas y anima a su equipo.",
          "Sigue intentando hasta encontrar la falla.",
          "Se detiene tras un intento fallido y retoma con apoyo.",
          "Abandona la tarea."
        ]
      }
    ]
  }
  ]
});

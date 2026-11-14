/* ============================================================
   editor.js — Tarjetas para editar listas del plan de clase
   Un mismo componente edita pasos, conceptos, dificultades,
   código y criterios: cada lista solo define sus campos.
   ============================================================ */
const Editor = (() => {
  "use strict";

  const CAMPOS = {
    paso: [
      { clave: "titulo",      rotulo: "Título del paso" },
      { clave: "min",         rotulo: "Minutos", tipo: "number" },
      { clave: "docente",     rotulo: "Qué hace el docente", filas: 4 },
      { clave: "diga",        rotulo: "Qué dice el docente", filas: 2 },
      { clave: "pregunte",    rotulo: "Pregunta", filas: 2 },
      { clave: "espere",      rotulo: "Respuesta esperada", filas: 2 },
      { clave: "estudiantes", rotulo: "Qué hacen los estudiantes", filas: 2 },
      { clave: "verifique",   rotulo: "Antes de avanzar, verifique", filas: 2 }
    ],
    concepto: [
      { clave: "termino",     rotulo: "Concepto" },
      { clave: "explicacion", rotulo: "Cómo explicarlo", filas: 3 },
      { clave: "ejemplo",     rotulo: "Ejemplo para la clase", filas: 2 }
    ],
    dificultad: [
      { clave: "situacion", rotulo: "Si ocurre…", filas: 2 },
      { clave: "causa",     rotulo: "Causa probable", filas: 2 },
      { clave: "accion",    rotulo: "Qué hacer", filas: 3 }
    ],
    codigo: [
      { clave: "titulo", rotulo: "Título" },
      { clave: "texto",  rotulo: "Código", filas: 10, mono: true }
    ],
    criterio: [
      { clave: "texto",     rotulo: "Criterio", filas: 2 },
      { clave: "evidencia", rotulo: "Evidencia", filas: 2 },
      { clave: "saber",     rotulo: "Saber que evalúa", tipo: "saber" },
      { clave: "peso",      rotulo: "Peso relativo", tipo: "number" },
      { clave: "niveles.0", rotulo: "Destacado", filas: 2 },
      { clave: "niveles.1", rotulo: "Logrado", filas: 2 },
      { clave: "niveles.2", rotulo: "En proceso", filas: 2 },
      { clave: "niveles.3", rotulo: "Inicial", filas: 2 }
    ]
  };

  /* Permite claves como "niveles.2" para editar dentro de un arreglo. */
  function leer(item, clave) {
    const [base, indice] = clave.split(".");
    const valor = indice === undefined ? item[base] : (item[base] || [])[indice];
    return valor === undefined || valor === null ? "" : valor;
  }

  function escribir(item, clave, valor) {
    const [base, indice] = clave.split(".");
    if (indice === undefined) {
      item[base] = valor;
    } else {
      item[base] = item[base] || [];
      item[base][indice] = valor;
    }
  }

  function crearControl(campo, item, saberes) {
    let control;
    if (campo.tipo === "saber") {
      control = document.createElement("select");
      [{ code: "", texto: "Sin relacionar" }, ...saberes].forEach((s) => {
        const o = document.createElement("option");
        o.value = s.code;
        o.textContent = s.code ? `${s.code} · ${s.tipo}` : s.texto;
        control.appendChild(o);
      });
    } else if (campo.filas) {
      control = document.createElement("textarea");
      control.rows = campo.filas;
      if (campo.mono) control.classList.add("mono");
    } else {
      control = document.createElement("input");
      control.type = campo.tipo || "text";
      if (campo.tipo === "number") control.min = "0";
    }
    control.value = leer(item, campo.clave);
    return control;
  }

  /* opciones: { contenedor, items, campos, resumen, nuevo, textoAgregar,
                 saberes, alEditar, alCambiarLista } */
  function lista(opciones) {
    const { contenedor, items, campos, resumen, nuevo, textoAgregar,
            saberes = [], alEditar, alCambiarLista } = opciones;
    contenedor.innerHTML = "";

    items.forEach((item, i) => {
      const tarjeta = document.createElement("details");
      tarjeta.className = "tarjeta";

      const titulo = document.createElement("summary");
      titulo.textContent = resumen(item, i);
      tarjeta.appendChild(titulo);

      const cuerpo = document.createElement("div");
      cuerpo.className = "tarjeta-cuerpo";

      campos.forEach((campo) => {
        const envoltura = document.createElement("label");
        envoltura.className = "field";
        const rotulo = document.createElement("span");
        rotulo.textContent = campo.rotulo;
        const control = crearControl(campo, item, saberes);
        control.addEventListener("input", () => {
          const numerico = campo.tipo === "number";
          escribir(item, campo.clave, numerico ? Number(control.value) || 0 : control.value);
          alEditar(item, campo.clave);
          titulo.textContent = resumen(item, i);
        });
        envoltura.append(rotulo, control);
        cuerpo.appendChild(envoltura);
      });

      const quitar = document.createElement("button");
      quitar.type = "button";
      quitar.className = "link-btn peligro";
      quitar.textContent = "Eliminar";
      quitar.addEventListener("click", () => {
        items.splice(items.indexOf(item), 1);
        alCambiarLista();
      });
      cuerpo.appendChild(quitar);

      tarjeta.appendChild(cuerpo);
      contenedor.appendChild(tarjeta);
    });

    const agregar = document.createElement("button");
    agregar.type = "button";
    agregar.className = "link-btn agregar";
    agregar.textContent = textoAgregar;
    agregar.addEventListener("click", () => {
      items.push(nuevo());
      alCambiarLista();
      contenedor.querySelector(".tarjeta:last-of-type").open = true;
    });
    contenedor.appendChild(agregar);
  }

  return { CAMPOS, lista };
})();

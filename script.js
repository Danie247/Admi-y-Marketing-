const cursos = [
  // CICLO 1
  {
    codigo: "HU625",
    nombre: "Comprensión y Producción de Lenguaje I",
    ciclo: 1,
    requisitos: []
  },
  {
    codigo: "HU548",
    nombre: "Ética y Ciudadanía",
    ciclo: 1,
    requisitos: []
  },
  {
    codigo: "AD2511",
    nombre: "Introducción a la Administración",
    ciclo: 1,
    requisitos: []
  },
  {
    codigo: "AF103",
    nombre: "Fundamentos de Finanzas",
    ciclo: 1,
    requisitos: []
  },
  {
    codigo: "AM216",
    nombre: "Marketing I",
    ciclo: 1,
    requisitos: []
  },

  // CICLO 2
  {
    codigo: "MA459",
    nombre: "Cálculo",
    ciclo: 2,
    requisitos: []
  },
  {
    codigo: "HU626",
    nombre: "Comprensión y Producción de Lenguaje II",
    ciclo: 2,
    requisitos: ["HU625"]
  },
  {
    codigo: "AF141",
    nombre: "Matemática Financiera",
    ciclo: 2,
    requisitos: ["AF103"]
  },
  {
    codigo: "AF133",
    nombre: "Macroeconomía",
    ciclo: 2,
    requisitos: ["AD2511"]
  },
  {
    codigo: "AM217",
    nombre: "Marketing II",
    ciclo: 2,
    requisitos: ["AM216"]
  }
];

const mallaContainer = document.getElementById("malla-container");
const aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function guardarProgreso() {
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
}

function crearCurso(curso) {
  const div = document.createElement("div");
  div.classList.add("curso");
  div.textContent = `${curso.codigo} - ${curso.nombre}`;
  div.dataset.codigo = curso.codigo;

  const requisitosCumplidos = curso.requisitos.every(r => aprobados.includes(r));
  if (!requisitosCumplidos && curso.requisitos.length > 0 && !aprobados.includes(curso.codigo)) {
    div.classList.add("bloqueado");
  } else {
    div.addEventListener("click", () => {
      if (div.classList.contains("bloqueado")) return;
      div.classList.toggle("aprobado");

      const codigo = div.dataset.codigo;
      if (div.classList.contains("aprobado")) {
        if (!aprobados.includes(codigo)) aprobados.push(codigo);
      } else {
        const index = aprobados.indexOf(codigo);
        if (index !== -1) aprobados.splice(index, 1);
      }

      guardarProgreso();
      renderMalla();
    });
  }

  if (aprobados.includes(curso.codigo)) {
    div.classList.add("aprobado");
  }

  return div;
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  const ciclosUnicos = [...new Set(cursos.map(c => c.ciclo))].sort((a, b) => a - b);

  ciclosUnicos.forEach(ciclo => {
    const contenedor = document.createElement("div");
    contenedor.classList.add("ciclo");

    const titulo = document.createElement("h2");
    titulo.textContent = `Ciclo ${ciclo}`;
    contenedor.appendChild(titulo);

    cursos
      .filter(c => c.ciclo === ciclo)
      .forEach(curso => {
        const divCurso = crearCurso(curso);
        contenedor.appendChild(divCurso);
      });

    mallaContainer.appendChild(contenedor);
  });
}

renderMalla();

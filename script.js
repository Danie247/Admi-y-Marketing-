const cursos = [
  // CICLO 1
  { ciclo: 1, codigo: "HU625", nombre: "Comprensión y Producción de Lenguaje I", requisitos: [], tipo: "admi" },
  { ciclo: 1, codigo: "HU548", nombre: "Ética y Ciudadanía", requisitos: [], tipo: "admi" },
  { ciclo: 1, codigo: "AD2511", nombre: "Introducción a la Administración", requisitos: [], tipo: "admi" },
  { ciclo: 1, codigo: "AF103", nombre: "Fundamentos de Finanzas", requisitos: [], tipo: "admi" },
  { ciclo: 1, codigo: "AM216", nombre: "Marketing I", requisitos: [], tipo: "marketing" },

  // CICLO 2
  { ciclo: 2, codigo: "MA459", nombre: "Cálculo", requisitos: [], tipo: "admi" },
  { ciclo: 2, codigo: "HU626", nombre: "Comp. y Prod. Lenguaje II", requisitos: ["HU625"], tipo: "admi" },
  { ciclo: 2, codigo: "AF141", nombre: "Matemática Financiera", requisitos: ["AF103"], tipo: "admi" },
  { ciclo: 2, codigo: "AF133", nombre: "Macroeconomía", requisitos: ["AD2511"], tipo: "admi" },
  { ciclo: 2, codigo: "AM217", nombre: "Marketing II", requisitos: ["AM216"], tipo: "marketing" },

  // Puedes seguir agregando todos los ciclos igual...
];

const aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];
const container = document.getElementById("malla-container");

function guardar() {
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
}

function crearCurso(curso) {
  const div = document.createElement("div");
  div.className = `curso ${curso.tipo}`;

  const bloqueado = curso.requisitos.length > 0 && !curso.requisitos.every(r => aprobados.includes(r));

  if (bloqueado && !aprobados.includes(curso.codigo)) {
    div.classList.add("bloqueado");
  }

  if (aprobados.includes(curso.codigo)) {
    div.classList.add("aprobado");
  }

  div.textContent = `${curso.codigo} - ${curso.nombre}`;

  if (!bloqueado) {
    div.addEventListener("click", () => {
      div.classList.toggle("aprobado");

      if (div.classList.contains("aprobado")) {
        aprobados.push(curso.codigo);
      } else {
        const i = aprobados.indexOf(curso.codigo);
        if (i > -1) aprobados.splice(i, 1);
      }

      guardar();
      renderMalla();
    });
  }

  return div;
}

function renderMalla() {
  container.innerHTML = "";

  for (let ciclo = 1; ciclo <= 10; ciclo++) {
    const columna = document.createElement("div");
    columna.className = "columna-ciclo";

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo < 10 ? `0${ciclo}` : ciclo;
    columna.appendChild(titulo);

    cursos.filter(c => c.ciclo === ciclo).forEach(curso => {
      columna.appendChild(crearCurso(curso));
    });

    container.appendChild(columna);
  }
}

renderMalla();

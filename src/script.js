const toggleButton = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    toggleButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark ? "dark" : "light");
}

toggleButton.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  setTheme(isDark ? "light" : "dark");
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroEscolhinha');
  const mensagem = document.getElementById('mensagem');
  const lista = document.getElementById('listaEscolhinhas');

  function exibirEscolhinhas() {
    const escolhinhas = JSON.parse(localStorage.getItem('escolhinhas')) || [];
    lista.innerHTML = '';

    if (escolhinhas.length > 0) {
      const titulo = document.createElement('h2');
      titulo.textContent = "Lista das Escolhinhas";
      lista.appendChild(titulo);
    }

    escolhinhas.forEach((e) => {
      const card = document.createElement('div');
      card.className = "border rounded p-3 mb-3 bg-light";

      card.innerHTML = `
        <h5 class="mb-2">${e.nome}</h5>
        <p><strong>Responsável:</strong> ${e.responsavel}</p>
        <p><strong>Cidade / Bairro:</strong> ${e.cidade}</p>
        <p><strong>Contato:</strong> ${e.contato}</p>
      `;

      lista.appendChild(card);
    });
  }

  // Mostrar as escolhinhas ao carregar a página
  exibirEscolhinhas();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const escolinha = {
      nome: document.getElementById('nomeEscolhinha').value,
      responsavel: document.getElementById('responsavel').value,
      cidade: document.getElementById('cidade').value,
      contato: document.getElementById('contato').value,
    };

    let escolhinhas = JSON.parse(localStorage.getItem('escolhinhas')) || [];
    escolhinhas.push(escolinha);
    localStorage.setItem('escolhinhas', JSON.stringify(escolhinhas));

    mensagem.innerHTML = `<div class="alert alert-success mt-3">Escolinha cadastrada com sucesso!</div>`;
    form.reset();
    exibirEscolhinhas();
  });
});

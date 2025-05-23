// Mudança de temas
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
setTheme(savedTheme ? savedTheme : prefersDark ? "dark" : "light");

toggleButton.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  setTheme(isDark ? "light" : "dark");
});

// cadastro de escolhinhas 
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroEscolhinha');
  const mensagem = document.getElementById('mensagem');
  const lista = document.getElementById('listaEscolhinhas');

  let escolhinhas = JSON.parse(localStorage.getItem('escolhinhas')) || [];
  let editIndexEscolhinha = -1;

  function salvarEscolhinhas() {
    localStorage.setItem('escolhinhas', JSON.stringify(escolhinhas));
  }

  function exibirEscolhinhas() {
    lista.innerHTML = '';

    if (escolhinhas.length > 0) {
      const titulo = document.createElement('h2');
      titulo.textContent = "Lista das Escolhinhas";
      lista.appendChild(titulo);
    }

    escolhinhas.forEach((e, index) => {
      const card = document.createElement('div');
      card.className = "border rounded p-3 mb-3 bg-dark";

      card.innerHTML = `
         <h5 class="mb-2">${e.nome}</h5>
         <p><strong>Responsável:</strong> ${e.responsavel}</p>
         <p><strong>Cidade / Bairro:</strong> ${e.cidade}</p>
         <p><strong>Contato:</strong> ${e.contato}</p>
         <button class="btn btn-sm btn-warning me-2" onclick="editarEscolhinha(${index})">Editar</button>
         <button class="btn btn-sm btn-danger" onclick="excluirEscolhinha(${index})">Excluir</button>
       `;

      lista.appendChild(card);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const escolinha = {
      nome: document.getElementById('nomeEscolhinha').value,
      responsavel: document.getElementById('responsavel').value,
      cidade: document.getElementById('cidade').value,
      contato: document.getElementById('contato').value,
    };

    if (editIndexEscolhinha >= 0) {
      escolhinhas[editIndexEscolhinha] = escolinha;
      editIndexEscolhinha = -1;
    } else {
      escolhinhas.push(escolinha);
    }

    salvarEscolhinhas();
    mensagem.innerHTML = `<div class="alert alert-success mt-3">Escolinha salva com sucesso!</div>`;
    form.reset();
    exibirEscolhinhas();
  });

  window.excluirEscolhinha = function (index) {
    if (confirm('Tem certeza que deseja excluir esta escolhinha?')) {
      escolhinhas.splice(index, 1);
      salvarEscolhinhas();
      exibirEscolhinhas();
    }
  }

  window.editarEscolhinha = function (index) {
    const e = escolhinhas[index];
    document.getElementById('nomeEscolhinha').value = e.nome;
    document.getElementById('responsavel').value = e.responsavel;
    document.getElementById('cidade').value = e.cidade;
    document.getElementById('contato').value = e.contato;
    editIndexEscolhinha = index;
  }

  exibirEscolhinhas();
});

// cadastro do projeto
const formRequisitos = document.getElementById('requisitosProjeto');
const listaRequisitos = document.getElementById('listaRequisitos');
const mensagemRequisito = document.getElementById('mensagemRequisito');

let requisitos = JSON.parse(localStorage.getItem('requisitosProjeto')) || [];
let editIndexRequisito = -1;

function salvarNoLocalStorage() {
  localStorage.setItem('requisitosProjeto', JSON.stringify(requisitos));
}

function exibirRequisitos() {
  listaRequisitos.innerHTML = '';

  requisitos.forEach((req, index) => {
    const item = document.createElement('div');

    let corClasse = '';
    if (req.status === 'A fazer') {
      corClasse = 'alert-danger';
    } else if (req.status === 'Em andamento') {
      corClasse = 'alert-warning';
    } else if (req.status === 'Desenvolvido') {
      corClasse = 'alert-success';
    }

    item.classList.add('alert', corClasse, 'mt-2');
    item.innerHTML = `
       <strong>Projeto ${index + 1}:</strong><br>
       <strong>Descrição:</strong> ${req.descricao}<br>
       <strong>Valor:</strong> ${req.valor}<br>
       <strong>Responsável:</strong> ${req.responsavel}<br>
       <strong>Tipo de Recurso:</strong> ${req.tipoRecurso}<br>
       <strong>Status:</strong> ${req.status}<br>
       <button class="btn btn-sm btn-warning me-2" onclick="editarRequisito(${index})">Editar</button>
       <button class="btn btn-sm btn-danger" onclick="excluirRequisito(${index})">Excluir</button>
     `;
    listaRequisitos.appendChild(item);
  });
}

formRequisitos.addEventListener('submit', function (e) {
  e.preventDefault();

  const requisito = {
    descricao: document.getElementById('descricao').value,
    valor: document.getElementById('valor').value,
    responsavel: document.getElementById('responsavelRequisito').value,
    tipoRecurso: document.getElementById('tipoRecurso').value,
    status: document.getElementById('statusRequisito').value
  };

  if (editIndexRequisito >= 0) {
    requisitos[editIndexRequisito] = requisito;
    editIndexRequisito = -1;
  } else {
    requisitos.push(requisito);
  }

  salvarNoLocalStorage();

  mensagemRequisito.textContent = "Requisito salvo com sucesso!";
  exibirRequisitos();
  formRequisitos.reset();

  setTimeout(() => {
    mensagemRequisito.textContent = '';
  }, 3000);
});

window.excluirRequisito = function (index) {
  if (confirm('Tem certeza que deseja excluir este requisito?')) {
    requisitos.splice(index, 1);
    salvarNoLocalStorage();
    exibirRequisitos();
  }
}

window.editarRequisito = function (index) {
  const req = requisitos[index];
  document.getElementById('descricao').value = req.descricao;
  document.getElementById('valor').value = req.valor;
  document.getElementById('responsavelRequisito').value = req.responsavel;
  document.getElementById('tipoRecurso').value = req.tipoRecurso;
  document.getElementById('statusRequisito').value = req.status;
  editIndexRequisito = index;
}

exibirRequisitos();

const dataVencimento = document.getElementById('dataVencimento').value;

const requisito = {
  descricao,
  valor,
  responsavel,
  tipoRecurso,
  dataVencimento
};
function atualizarContadores() {
  const totalAFazer = requisitos.filter(r => r.status === 'A fazer').length;
  const totalEmAndamento = requisitos.filter(r => r.status === 'Em andamento').length;
  const totalDesenvolvido = requisitos.filter(r => r.status === 'Desenvolvido').length;

  document.getElementById('contadorAFazer').textContent = totalAFazer;
  document.getElementById('contadorEmAndamento').textContent = totalEmAndamento;
  document.getElementById('contadorDesenvolvido').textContent = totalDesenvolvido;
}
function atualizarContadores() {
  const totalAFazer = requisitos.filter(r => r.status === 'A fazer').length;
  const totalEmAndamento = requisitos.filter(r => r.status === 'Em andamento').length;
  const totalDesenvolvido = requisitos.filter(r => r.status === 'Desenvolvido').length;

  document.getElementById('contadorAFazer').textContent = totalAFazer;
  document.getElementById('contadorEmAndamento').textContent = totalEmAndamento;
  document.getElementById('contadorDesenvolvido').textContent = totalDesenvolvido;
}
function verificarVencimentos() {
  const hoje = new Date();
  requisitos.forEach(req => {
    const vencimento = new Date(req.dataVencimento);
    if (vencimento < hoje) {
      console.warn(`Requisito "${req.descricao}" está vencido!`);
    }
  });
}
function exibirRequisitos() {
  listaRequisitos.innerHTML = '';

  requisitos.forEach((req, index) => {
    const item = document.createElement('div');

    let corClasse = '';
    if (req.status === 'A fazer') {
      corClasse = 'alert-danger';
    } else if (req.status === 'Em andamento') {
      corClasse = 'alert-warning';
    } else if (req.status === 'Desenvolvido') {
      corClasse = 'alert-success';
    }

    item.classList.add('alert', corClasse, 'mt-2');
    item.innerHTML = `
      <strong>Projeto ${index + 1}:</strong><br>
      <strong>Descrição:</strong> ${req.descricao}<br>
      <strong>Valor:</strong> ${req.valor}<br>
      <strong>Responsável:</strong> ${req.responsavel}<br>
      <strong>Tipo de Recurso:</strong> ${req.tipoRecurso}<br>
      <strong>Status:</strong> ${req.status}<br>
      <strong>Vencimento:</strong> ${req.dataVencimento}
    `;
    listaRequisitos.appendChild(item);
  });

  atualizarContadores();
  verificarVencimentos();
}

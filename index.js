const form = document.getElementById("vendaForm");
const bikeList = document.getElementById("bikeList");
const mensagemVazia = document.querySelector(".mensagem-vazia");

// Criar card da bike
function criarCard(nome, preco, imagem) {
  const card = document.createElement("div");
  card.className = "bike-card fade-in";

  const img = document.createElement("img");
  img.src = imagem;
  img.alt = `Imagem de ${nome}`;
  img.onerror = () => {
    img.src = "https://via.placeholder.com/250x150?text=Imagem+Indisponível";
  };

  const h3 = document.createElement("h3");
  h3.textContent = nome;

  const p = document.createElement("p");
  p.textContent = `R$ ${preco.toFixed(2)}`;

  // Botão de remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "btn-remover";
  btnRemover.addEventListener("click", () => {
    card.remove();
    salvarLista();
    aplicarFiltros();
  });

  card.append(img, h3, p, btnRemover);
  return card;
}

// Adicionar card
function adicionarCard(nome, preco, imagem) {
  const card = criarCard(nome, preco, imagem);
  bikeList.appendChild(card);
  aplicarFiltros();
  salvarLista();
}

// Salvar no localStorage
function salvarLista() {
  const lista = [...document.querySelectorAll(".bike-card")].map(card => {
    return {
      nome: card.querySelector("h3").textContent,
      preco: parseFloat(card.querySelector("p").textContent.replace("R$", "").replace(",", ".")),
      imagem: card.querySelector("img").src
    };
  });
  localStorage.setItem("bicicletas", JSON.stringify(lista));
}

// Carregar lista
function carregarLista() {
  const dados = JSON.parse(localStorage.getItem("bicicletas")) || [];
  dados.forEach(bike => adicionarCard(bike.nome, bike.preco, bike.imagem));
}

// Submissão do formulário
form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);
  const imagem = document.getElementById("imagem").value.trim();

  if (!nome || isNaN(preco) || preco <= 0 || !imagem) {
    alert("Preencha os campos corretamente.");
    return;
  }

  adicionarCard(nome, preco, imagem);
  form.reset();
});

// Filtros
const filtroNome = document.getElementById("filtroNome");
const filtroMin = document.getElementById("filtroMin");
const filtroMax = document.getElementById("filtroMax");

function aplicarFiltros() {
  const cards = document.querySelectorAll(".bike-card");
  const nomeFiltro = filtroNome.value.toLowerCase();
  const min = parseFloat(filtroMin.value) || 0;
  const max = parseFloat(filtroMax.value) || Infinity;

  let visiveis = 0;

  cards.forEach(card => {
    const nome = card.querySelector("h3").textContent.toLowerCase();
    const preco = parseFloat(card.querySelector("p").textContent.replace("R$", "").replace(",", "."));
    const corresponde = nome.includes(nomeFiltro) && preco >= min && preco <= max;

    card.style.display = corresponde ? "block" : "none";
    if (corresponde) visiveis++;
  });

  mensagemVazia.style.display = visiveis === 0 ? "block" : "none";
}

// Eventos de filtro
[filtroNome, filtroMin, filtroMax].forEach(input => {
  input.addEventListener("input", aplicarFiltros);
});

// Inicia
carregarLista();
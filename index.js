const form = document.getElementById("vendaForm");
const bikeList = document.getElementById("bikeList");

// Cria o card da bike
function criarCard(nome, preco, imagem) {
  const card = document.createElement("div");
  card.className = "bike-card";

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

  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(p);

  return card;
}

// Adiciona o card na tela
function adicionarCard(nome, preco, imagem) {
  const card = criarCard(nome, preco, imagem);
  bikeList.appendChild(card);
  aplicarFiltros();
  salvarLista();
}

// Salva no localStorage
function salvarLista() {
  const cards = document.querySelectorAll(".bike-card");
  const lista = [];

  cards.forEach(card => {
    const nome = card.querySelector("h3").textContent;
    const preco = parseFloat(card.querySelector("p").textContent.replace("R$", "").replace(",", "."));
    const imagem = card.querySelector("img").src;

    lista.push({ nome, preco, imagem });
  });

  localStorage.setItem("bicicletas", JSON.stringify(lista));
}

// Carrega do localStorage
function carregarLista() {
  const dados = JSON.parse(localStorage.getItem("bicicletas")) || [];
  dados.forEach(bike => adicionarCard(bike.nome, bike.preco, bike.imagem));
}

// Submissão do formulário
form.addEventListener("submit", function (e) {
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

const form = document.getElementById("vendaForm");
const bikeList = document.getElementById("bikeList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);
  const imagem = document.getElementById("imagem").value.trim();

  if (!nome || preco <= 0 || !imagem) {
    alert("Preencha os campos corretamente.");
    return;
  }

  const card = document.createElement("div");
  card.className = "bike-card";
  card.innerHTML = `
    <img src="${imagem}" alt="Imagem de ${nome}">
    <h3>${nome}</h3>
    <p>R$ ${preco.toFixed(2)}</p>
  `;

  bikeList.appendChild(card);
  form.reset();
  aplicarFiltros(); // Atualiza filtro ao adicionar
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

  cards.forEach(card => {
    const nome = card.querySelector("h3").textContent.toLowerCase();
    const preco = parseFloat(card.querySelector("p").textContent.replace("R$", "").replace(",", "."));

    const nomeOK = nome.includes(nomeFiltro);
    const precoOK = preco >= min && preco <= max;

    card.style.display = nomeOK && precoOK ? "" : "none";
  });
}

filtroNome.addEventListener("input", aplicarFiltros);
filtroMin.addEventListener("input", aplicarFiltros);
filtroMax.addEventListener("input", aplicarFiltros);
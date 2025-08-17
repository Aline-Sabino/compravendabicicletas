const form = document.getElementById("vendaForm");
const bikeList = document.getElementById("bikeList");

// Inputs de filtro
const filterName = document.getElementById("filterName");
const filterPrice = document.getElementById("filterPrice");
const applyFilter = document.getElementById("applyFilter");
const clearFilter = document.getElementById("clearFilter");

// Recupera bikes do localStorage
let bikes = JSON.parse(localStorage.getItem("bikes")) || [];

// Função para renderizar bikes
function renderBikes(list = bikes) {
  bikeList.innerHTML = "";

  if (list.length === 0) {
    bikeList.innerHTML = "<p>Nenhuma bicicleta encontrada.</p>";
    return;
  }

  list.forEach((bike, index) => {
    const card = document.createElement("div");
    card.classList.add("bike-card");

    card.innerHTML = `
      <img src="${bike.imagem}" alt="${bike.nome}">
      <h3>${bike.nome}</h3>
      <p><strong>Preço:</strong> R$ ${bike.preco}</p>
      <p><strong>Tipo:</strong> ${bike.tipo}</p>
      <div class="card-actions">
        <button class="remove-btn" onclick="removeBike(${index})">Remover</button>
      </div>
    `;

    bikeList.appendChild(card);
  });
}

// Adicionar nova bike
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const tipo = document.getElementById("tipo").value;
  const imagem = document.getElementById("imagem").value;

  bikes.push({ nome, preco, tipo, imagem });

  localStorage.setItem("bikes", JSON.stringify(bikes));
  renderBikes();

  form.reset();
});

// Remover bike
function removeBike(index) {
  bikes.splice(index, 1);
  localStorage.setItem("bikes", JSON.stringify(bikes));
  renderBikes();
}

// Filtrar bikes
applyFilter.addEventListener("click", () => {
  const nameValue = filterName.value.toLowerCase();
  const priceValue = filterPrice.value;

  const filtered = bikes.filter(bike => {
    const matchName = bike.nome.toLowerCase().includes(nameValue);
    const matchPrice = priceValue ? Number(bike.preco) <= Number(priceValue) : true;
    return matchName && matchPrice;
  });

  renderBikes(filtered);
});

// Limpar filtros
clearFilter.addEventListener("click", () => {
  filterName.value = "";
  filterPrice.value = "";
  renderBikes();
});

// Render inicial
renderBikes();
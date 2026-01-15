// DARK MODE TOGGLE

function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}
  
  
  
  
  const searchInput = document.getElementById("searchInput");
  const filters = {
    vegan: document.getElementById("filterVegan"),
    vegetarian: document.getElementById("filterVegetarian"),
    halal: document.getElementById("filterHalal")
  };

  const cards = document.querySelectorAll(".meal-card");
  const order = [];
  const orderList = document.getElementById("orderList");
  const orderTotal = document.getElementById("orderTotal");
  const orderTotalPreview = document.getElementById("order-total");

  function filterMenu() {
    const searchValue = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const text =
        card.dataset.name +
        card.dataset.ingredients +
        card.dataset.allergens;

      const matchesSearch = text.toLowerCase().includes(searchValue);

      const matchesVegan = !filters.vegan.checked || card.dataset.vegan === "true";
      const matchesVegetarian = !filters.vegetarian.checked || card.dataset.vegetarian === "true";
      const matchesHalal = !filters.halal.checked || card.dataset.halal === "true";

      card.style.display =
        matchesSearch && matchesVegan && matchesVegetarian && matchesHalal
          ? "block"
          : "none";
    });
  }

  searchInput.addEventListener("input", filterMenu);
  Object.values(filters).forEach(filter =>
    filter.addEventListener("change", filterMenu)
  );

  document.querySelectorAll(".add-to-order").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".meal-card");
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);

      order.push({ name, price });
      updateOrder();
    });
  });

  function updateOrder() {
    orderList.innerHTML = "";
    let total = 0;

    order.forEach(item => {
      total += item.price;
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between";
      li.textContent = item.name;
      li.innerHTML += `<span>£${item.price.toFixed(2)}</span>`;
      orderList.appendChild(li);
    });

    orderTotal.textContent = total.toFixed(2);
  }



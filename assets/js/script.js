// DARK MODE TOGGLE
// it will add .dark-mode to the body, and in CSS when the 
// body has .dark-mode, a number of other elements will be changed

function darkMode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}
  
// MENU FILTERING and SEARCHING FUNCTIONALITY
// Will need to put them into one function later to combine search and filters

const veganCheckbox = document.getElementById("filterVegan");
const vegetarianCheckbox = document.getElementById("filterVegetarian");
const halalCheckbox = document.getElementById("filterHalal");
const cards = document.querySelectorAll(".meal-card");

function filterCards() {
  cards.forEach(card => {
    const isVegan = card.dataset.vegan === "true";
    const isVegetarian = card.dataset.vegetarian === "true";
    const isHalal = card.dataset.halal === "true";

    if (veganCheckbox.checked && !isVegan) {
      card.classList.add("hidden");
    } else if (vegetarianCheckbox.checked && !isVegetarian) {
      card.classList.add("hidden");
    } else if (halalCheckbox.checked && !isHalal) {
      card.classList.add("hidden");
    } else {
      card.classList.remove("hidden");
    }
  });
}

veganCheckbox.addEventListener("change", filterCards);
vegetarianCheckbox.addEventListener("change", filterCards);
halalCheckbox.addEventListener("change", filterCards);


function searchCards() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const ingredients = card.dataset.ingredients.toLowerCase();
    const allergens = card.dataset.allergens.toLowerCase();

    if (
      name.includes(searchInput) ||
      ingredients.includes(searchInput) ||
      allergens.includes(searchInput)
    ) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  })
}

document.getElementById("searchInput").addEventListener("input", searchCards);


  


// ORDERING FUNCTIONALITY
// 
// User clicks “Add to order” on a card
// JS reads name + price from that card’s data-*
// JS creates one <li> row inside a modal list
// Name and price appear in two columns
// 
// 
const orderButtons = document.querySelectorAll(".add-to-order");
const orderList = document.getElementById("orderList");

function handleAddToOrder(event) {
  const button = event.target;
  const card = button.closest(".meal-card");

  const name = card.dataset.name;
  const price = card.dataset.price;

  const li = document.createElement("li");
  li.classList.add("order-item");

  li.innerHTML = `
    <span class="order-name">${name}</span>
    <span class="order-price">£${price}</span>
  `;

  orderList.appendChild(li);
}

// 

orderButtons.forEach(button => {
  button.addEventListener("click", handleAddToOrder);
}
);



// 
// 
// 
// 
// 
// 
// 
// 
// 



  
  // const searchInput = document.getElementById("searchInput");
  // const filters = {
  //   vegan: document.getElementById("filterVegan"),
  //   vegetarian: document.getElementById("filterVegetarian"),
  //   halal: document.getElementById("filterHalal")
  // };

  // const cards = document.querySelectorAll(".meal-card");
  // const order = [];
  // const orderList = document.getElementById("orderList");
  // const orderTotal = document.getElementById("orderTotal");
  // const orderTotalPreview = document.getElementById("order-total");

  // function filterMenu() {
  //   const searchValue = searchInput.value.toLowerCase();

  //   cards.forEach(card => {
  //     const text =
  //       card.dataset.name +
  //       card.dataset.ingredients +
  //       card.dataset.allergens;

  //     const matchesSearch = text.toLowerCase().includes(searchValue);

  //     const matchesVegan = !filters.vegan.checked || card.dataset.vegan === "true";
  //     const matchesVegetarian = !filters.vegetarian.checked || card.dataset.vegetarian === "true";
  //     const matchesHalal = !filters.halal.checked || card.dataset.halal === "true";

  //     card.style.display =
  //       matchesSearch && matchesVegan && matchesVegetarian && matchesHalal
  //         ? "block"
  //         : "none";
  //   });
  // }

  // searchInput.addEventListener("input", filterMenu);
  // Object.values(filters).forEach(filter =>
  //   filter.addEventListener("change", filterMenu)
  // );

  // document.querySelectorAll(".add-to-order").forEach(button => {
  //   button.addEventListener("click", () => {
  //     const card = button.closest(".meal-card");
  //     const name = card.dataset.name;
  //     const price = parseFloat(card.dataset.price);

  //     order.push({ name, price });
  //     updateOrder();
  //   });
  // });

  // function updateOrder() {
  //   orderList.innerHTML = "";
  //   let total = 0;

  //   order.forEach(item => {
  //     total += item.price;
  //     const li = document.createElement("li");
  //     li.className = "list-group-item d-flex justify-content-between";
  //     li.textContent = item.name;
  //     li.innerHTML += `<span>£${item.price.toFixed(2)}</span>`;
  //     orderList.appendChild(li);
  //   });

  //   orderTotal.textContent = total.toFixed(2);
  // }



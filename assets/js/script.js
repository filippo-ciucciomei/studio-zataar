// DARK MODE TOGGLE
// it will add .dark-mode to the body, and in CSS when the 
// body has .dark-mode, a number of other elements will be changed

// NEED TO FIX COLORING FOR THE MODAL TOO

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

// 
const orderButtons = document.querySelectorAll(".add-to-order");
const orderList = document.getElementById("orderList");


function handleAddToOrder(event) { // event is automatically passed in
  const eventButton = event.target; // event.target tells us which button was clicked
  const card = eventButton.closest(".meal-card"); // find the closest parent with class "meal-card"

  const name = card.dataset.name;
  const price = card.dataset.price;

  

  // before we create a new order item, check if it already exists
  const existingItem = orderList.querySelector(
  `.order-item[data-name="${name}"]`
);

if (existingItem) {
const multiplier = existingItem.querySelector(".multiplier");
const currentMultiplier = parseInt(multiplier.textContent);
const newMultiplier = currentMultiplier + 1;
const total = parseFloat(price) * newMultiplier;


  existingItem.querySelector(".order-price").textContent = `£${total.toFixed(2)}`;
  existingItem.querySelector(".multiplier").textContent = newMultiplier;


  
  return; // exit the function early since we updated an existing item
   
} else {

  const orderItem = document.createElement("li"); // create a new <li> element
  orderItem.classList.add("order-item"); // add class for styling
  orderItem.dataset.name = name; // add data-name attribute for later reference
  orderItem.dataset.price = price; // add data-price attribute for later reference

  // populate the <li> with name and price spans
  orderItem.innerHTML = `
    <span class="order-name">${name}</span>
    <span class="order-qty"><span>x</span><span class="multiplier">1</span></span>
    <span class="order-price">£${price}</span>
  `;

  orderList.appendChild(orderItem); // appends the new <li> to the order list

}
updateOrderTotal()

}

// ORDER TOTAL CALCULATION 

function updateOrderTotal() { 
  let total = 0;
  const orderItems = orderList.querySelectorAll(".order-item");

  

  orderItems.forEach(item => {
    const itemprice = parseFloat(item.dataset.price)
    const multiplier = parseInt(item.querySelector(".multiplier").textContent)
    total += itemprice * multiplier;
  })

document.querySelectorAll(".total").forEach(el => {
  el.textContent = `${total.toFixed(2)}`;
});

console.log(multiplier)
}



// Event listener for all "Add to order" buttons
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



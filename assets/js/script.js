// ==============================
// DARK MODE TOGGLE
// ==============================

const darkModeToggle = document.getElementById("dark-mode-btn");

function darkMode() {
  document.body.classList.toggle("dark-mode");
}

darkModeToggle.addEventListener("click", darkMode);


// ==============================
// MENU FILTER + SEARCH (COMBINED LOGIC)
// ==============================

const veganCheckbox = document.getElementById("filterVegan");
const vegetarianCheckbox = document.getElementById("filterVegetarian");
const halalCheckbox = document.getElementById("filterHalal");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".meal-card");

function updateCardsVisibility() {
  const searchValue = searchInput.value.toLowerCase().trim();

  cards.forEach(card => {
    // Dataset values
    const isVegan = card.dataset.vegan === "true";
    const isVegetarian = card.dataset.vegetarian === "true";
    const isHalal = card.dataset.halal === "true";

    const name = card.dataset.name.toLowerCase();
    const ingredients = card.dataset.ingredients.toLowerCase();
    const allergens = card.dataset.allergens.toLowerCase();

    // FILTER LOGIC
    const passesFilter =
      (!veganCheckbox.checked || isVegan) &&
      (!vegetarianCheckbox.checked || isVegetarian) &&
      (!halalCheckbox.checked || isHalal);

    // SEARCH LOGIC
    const passesSearch =
      searchValue === "" ||
      name.includes(searchValue) ||
      ingredients.includes(searchValue) ||
      allergens.includes(searchValue);

    // FINAL DECISION
    if (passesFilter && passesSearch) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  updateMenuAlignment();
}

// Event listeners
veganCheckbox.addEventListener("change", updateCardsVisibility);
vegetarianCheckbox.addEventListener("change", updateCardsVisibility);
halalCheckbox.addEventListener("change", updateCardsVisibility);
searchInput.addEventListener("input", updateCardsVisibility);


// ==============================
// ORDERING FUNCTIONALITY
// ==============================

const orderButtons = document.querySelectorAll(".add-to-order");
const orderList = document.getElementById("orderList");

function handleAddToOrder(event) {
  const eventButton = event.target;
  const card = eventButton.closest(".meal-card");

  const name = card.dataset.name;
  const price = card.dataset.price;

  const existingItem = orderList.querySelector(
    `.order-item[data-name="${name}"]`
  );

  if (existingItem) {
    const multiplierEl = existingItem.querySelector(".multiplier");
    const currentMultiplier = parseInt(multiplierEl.textContent, 10);
    const newMultiplier = currentMultiplier + 1;

    multiplierEl.textContent = newMultiplier;

    const unitPrice = parseFloat(existingItem.dataset.price);
    existingItem.querySelector(".order-price").textContent =
      `£${(unitPrice * newMultiplier).toFixed(2)}`;

    updateOrderTotal();
    return;
  }

  const orderItem = document.createElement("li");
  orderItem.classList.add("order-item");
  orderItem.dataset.name = name;
  orderItem.dataset.price = price;

  orderItem.innerHTML = `
    <span class="order-left">
      <span class="order-qty">(x<span class="multiplier">1</span>)</span>
      <span class="order-name">${name}</span>
    </span>

    <span class="remove-item">
      <i class="fa-regular fa-trash-can"></i>
    </span>

    <span class="order-line-spacer"></span>

    <span class="order-price">£${price}</span>
  `;

  orderList.appendChild(orderItem);
  updateOrderTotal();
}

orderButtons.forEach(button => {
  button.addEventListener("click", handleAddToOrder);
});


// ==============================
// ORDER TOTAL CALCULATION
// ==============================

function updateOrderTotal() {
  const orderItems = orderList.querySelectorAll(".order-item");
  let total = 0;

  orderItems.forEach(item => {
    const unitPrice = parseFloat(item.dataset.price);
    const multiplier = parseInt(
      item.querySelector(".multiplier").textContent,
      10
    );

    total += unitPrice * multiplier;
  });

  document.getElementById("modal-total").textContent = total.toFixed(2);
  document.getElementById("total-page-preview").textContent = total.toFixed(2);
}


// ==============================
// REMOVE ITEM (EVENT DELEGATION)
// ==============================

orderList.addEventListener("click", event => {
  if (event.target.closest(".remove-item")) {
    const removingItem = event.target.closest(".order-item");
    removingItem.remove();
    updateOrderTotal();
  }
});


// ==============================
// MENU ALIGNMENT UPDATE
// ==============================

function updateMenuAlignment() {
  const menu = document.getElementById("menu");
  const visibleCards = menu.querySelectorAll(
    ".meal-card:not(.hidden)"
  );

  if (visibleCards.length <= 3) {
    menu.classList.add("justify-content-start");
    menu.classList.remove("justify-content-between");
  } else {
    menu.classList.remove("justify-content-start");
    menu.classList.add("justify-content-between");
  }
}


// CODE BELOW IS HOW I FIRST WROTE IT, BUT FILTERING AND SEARCHING FUNCTIONALITY SHOULD BE COMBINED INTO ONE FUNCTION

// // DARK MODE TOGGLE
// // it will add .dark-mode to the body, and in CSS when the 
// // body has .dark-mode, a number of other elements will be changed

// const darkModeToggle = document.getElementById("dark-mode-btn");

// function darkMode() {
//   var element = document.body;
//   element.classList.toggle("dark-mode");
// }


//   darkModeToggle.addEventListener("click", darkMode);


// // MENU FILTERING and SEARCHING FUNCTIONALITY
// // Will need to put them into one function later to combine search and filters

// const veganCheckbox = document.getElementById("filterVegan");
// const vegetarianCheckbox = document.getElementById("filterVegetarian");
// const halalCheckbox = document.getElementById("filterHalal");
// const cards = document.querySelectorAll(".meal-card");

// function filterCards() {
//   cards.forEach(card => {
//     const isVegan = card.dataset.vegan === "true";
//     const isVegetarian = card.dataset.vegetarian === "true";
//     const isHalal = card.dataset.halal === "true";

//     if (veganCheckbox.checked && !isVegan) {
//       card.classList.add("hidden");
//     } else if (vegetarianCheckbox.checked && !isVegetarian) {
//       card.classList.add("hidden");
//     } else if (halalCheckbox.checked && !isHalal) {
//       card.classList.add("hidden");
//     } else {
//       card.classList.remove("hidden");
//     }
//   });

//   updateMenuAlignment();

// }

// veganCheckbox.addEventListener("change", filterCards);
// vegetarianCheckbox.addEventListener("change", filterCards);
// halalCheckbox.addEventListener("change", filterCards);


// function searchCards() {
//   const searchInput = document.getElementById("searchInput").value.toLowerCase();

//   cards.forEach(card => {
//     const name = card.dataset.name.toLowerCase();
//     const ingredients = card.dataset.ingredients.toLowerCase();
//     const allergens = card.dataset.allergens.toLowerCase();

//     if (
//       name.includes(searchInput) ||
//       ingredients.includes(searchInput) ||
//       allergens.includes(searchInput)
//     ) {
//       card.classList.remove("hidden");
//     } else {
//       card.classList.add("hidden");
//     }
//   })
//   updateMenuAlignment();
// }

// document.getElementById("searchInput").addEventListener("input", searchCards);





// // ORDERING FUNCTIONALITY
// // 

// const orderButtons = document.querySelectorAll(".add-to-order");
// const orderList = document.getElementById("orderList");

// function handleAddToOrder(event) { // event is automatically passed in
//   const eventButton = event.target; // event.target tells us which button was clicked
//   const card = eventButton.closest(".meal-card"); // find the closest parent with class "meal-card"

//   const name = card.dataset.name;
//   const price = card.dataset.price;

//   // before we create a new order item, check if it already exists
//   const existingItem = orderList.querySelector(
//     `.order-item[data-name="${name}"]`
//   );

//   if (existingItem) {
//     const multiplierEl = existingItem.querySelector(".multiplier"); // get multiplier span
//     const currentMultiplier = parseInt(multiplierEl.textContent); // converts to Integer 
//     const newMultiplier = currentMultiplier + 1;

//     multiplierEl.textContent = newMultiplier; // update quantity in DOM

//     const unitPrice = parseFloat(existingItem.dataset.price); // 
//     existingItem.querySelector(".order-price").textContent = `£${(unitPrice * newMultiplier).toFixed(2)}`; // update per-row total

//     updateOrderTotal(); // call the function to update the overall total
//     return; // exit without running the code below

//   } else {

//     const orderItem = document.createElement("li"); // create a new <li> element
//     orderItem.classList.add("order-item"); // add class for styling
//     orderItem.dataset.name = name; // add data-name attribute for later reference
//     orderItem.dataset.price = price; // add data-price attribute for later reference (unit price)

//     // populate the <li> with name and price spans
//     orderItem.innerHTML = `
//   <span class="order-left">
//     <span class="order-qty">(x<span class="multiplier">1</span>)</span>
//     <span class="order-name">${name}</span>
//   </span>

//   <span class="remove-item">
//     <i class="fa-regular fa-trash-can"></i>
//   </span>

//   <span class="order-line-spacer"></span>

//   <span class="order-price">£${price}</span>
// `;

//     orderList.appendChild(orderItem); // appends the new <li> to the order list

//     updateOrderTotal(); // TOTAL LOGIC UPDATE + recalc total after adding new item
//   }
// }

// // ORDER TOTAL CALCULATION
// function updateOrderTotal() {
//   const orderItems = orderList.querySelectorAll(".order-item");
//   let total = 0;

//   orderItems.forEach(item => {
//     const unitPrice = parseFloat(item.dataset.price);
//     const multiplier = parseInt(item.querySelector(".multiplier").textContent);
//     total += unitPrice * multiplier; // += accumulates the total
//   });

//   // Update total in both modal and page preview
//   document.getElementById("modal-total").textContent = `${total.toFixed(2)}`; // toFixed formats to 2 decimal 
//   document.getElementById("total-page-preview").textContent = `${total.toFixed(2)}`;
// }

// // Event listener for all "Add to order" buttons
// orderButtons.forEach(button => {
//   button.addEventListener("click", handleAddToOrder);
// });



// // REMOVE ITEM FROM ORDER
// // As the remove buttons don't exist when the page loads, we need to use event delegation
// // Event delegation: listen for clicks on the parent <ul> (orderList) 
// orderList.addEventListener("click", function (event) {
//   if (event.target.closest(".remove-item")) {
//     const removingItem = event.target.closest(".order-item");
//     removingItem.remove();
//     updateOrderTotal();
//   } else {
//     return; // do nothing if not clicking on remove button
//   }
// });


// // MENU ALIGNMENT UPDATE FUNCTION
// function updateMenuAlignment() {
//   const menu = document.getElementById("menu");
//   const visibleCards = menu.querySelectorAll(
//     ".meal-card:not(.hidden)"
//   );

//   if (visibleCards.length <= 3) { 
//     menu.classList.add("justify-content-start");
//     menu.classList.remove("justify-content-between");

//   } else {
//     menu.classList.remove("justify-content-start");
//     menu.classList.add("justify-content-between");
//   }
// }
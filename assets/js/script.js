// ORDERING FUNCTIONALITY
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
    const multiplierEl = existingItem.querySelector(".multiplier"); // get multiplier span
    const currentMultiplier = parseInt(multiplierEl.textContent); // converts to Integer 
    const newMultiplier = currentMultiplier + 1; 

    multiplierEl.textContent = newMultiplier; // update quantity in DOM

    const unitPrice = parseFloat(existingItem.dataset.price); // 
    existingItem.querySelector(".order-price").textContent = `£${(unitPrice * newMultiplier).toFixed(2)}`; // update per-row total

    updateOrderTotal(); // call the function to update the overall total
    return; // exit without running the code below

  } else {

    const orderItem = document.createElement("li"); // create a new <li> element
    orderItem.classList.add("order-item"); // add class for styling
    orderItem.dataset.name = name; // add data-name attribute for later reference
    orderItem.dataset.price = price; // add data-price attribute for later reference (unit price)

    // populate the <li> with name and price spans
    orderItem.innerHTML = `
      <span class="order-name">${name}</span>
      <span class="order-qty"><span>x</span><span class="multiplier">1</span></span>
      <span class="order-price">£${price}</span>
    `;

    orderList.appendChild(orderItem); // appends the new <li> to the order list

    updateOrderTotal(); // TOTAL LOGIC UPDATE + recalc total after adding new item
  }
}

// ORDER TOTAL CALCULATION
function updateOrderTotal() {
  const orderItems = orderList.querySelectorAll(".order-item");
  let total = 0;

  orderItems.forEach(item => {
    const unitPrice = parseFloat(item.dataset.price); 
    const multiplier = parseInt(item.querySelector(".multiplier").textContent); 
    total += unitPrice * multiplier; // += accumulates the total
  });

  // Update total in both modal and page preview
  document.getElementById("modal-total").textContent = `${total.toFixed(2)}`; // toFixed formats to 2 decimal 
  document.getElementById("total-page-preview").textContent = `${total.toFixed(2)}`; 
}

// Event listener for all "Add to order" buttons
orderButtons.forEach(button => {
  button.addEventListener("click", handleAddToOrder);
});

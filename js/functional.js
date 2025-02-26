// Store paths and DOM elements
var productImageBase = "./images/";
var ringButtons = document.querySelectorAll(".ring-button");
var productImage = document.getElementById("product-image");
var quantityElement = document.getElementById("quantity");

// Initialize cart state
var cartCount = 0;
var cartItems = [];
var productTitle = "Classy Modern Smart Watch";

// Update product image when color is selected
function updateProductImage(color) {
  productImage.src = productImageBase + color + ".png";
}

// Handle button highlighting for selection UI
function highlightSelectedButton(buttons, selectedButton) {
  // Remove highlight from all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("border-purple-600");
    buttons[i].classList.add("border-gray-300");
  }
  // Add highlight to selected button
  selectedButton.classList.add("border-purple-600");
  selectedButton.classList.remove("border-gray-300");
}

// Handle color selection event
function handleColorSelection(event) {
  var color = event.target.id.replace("-color", "");
  highlightSelectedButton(ringButtons, event.target);
  updateProductImage(color);
}

// Add click listeners to color buttons
for (var i = 0; i < ringButtons.length; i++) {
  ringButtons[i].addEventListener("click", handleColorSelection);
}

// Handle wrist size selection
function selectWristSize(size) {
  var sizes = ["S", "M", "L", "XL"];
  for (var i = 0; i < sizes.length; i++) {
    var button = document.getElementById("size-" + sizes[i]);
    // Highlight selected size, remove highlight from others
    if (sizes[i] === size) {
      button.classList.add("border-purple-600");
    } else {
      button.classList.remove("border-purple-600");
    }
  }
}

// Update quantity with bounds checking
function updateQuantity(change) {
  var currentQuantity = parseInt(quantityElement.innerText);
  // Ensure quantity never goes below 0
  var newQuantity = Math.max(0, currentQuantity + change);
  quantityElement.innerText = newQuantity;
}

// Handle quantity button clicks
function handleQuantityChange(event) {
  var change = event.target.innerText === "+" ? 1 : -1;
  updateQuantity(change);
}

// Add click listeners to quantity buttons
var quantityButtons = document.querySelectorAll(".quantity-button");
for (var i = 0; i < quantityButtons.length; i++) {
  quantityButtons[i].addEventListener("click", handleQuantityChange);
}

// Add items to shopping cart
function addToCart() {
  var quantity = parseInt(quantityElement.innerText);
  if (quantity > 0) {
    // Update cart UI
    cartCount += quantity;
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("checkout-container").classList.remove("hidden");

    // Get selected color (default to purple if none selected)
    var selectedColorButton = document.querySelector(
      "button.border-purple-600.w-6"
    );
    var selectedColor = selectedColorButton
      ? selectedColorButton.id.split("-")[0]
      : "purple";

    // Get selected size and price (default to S and $69 if none selected)
    var selectedSizeButton = document.querySelector(
      "button.border-purple-600:not(.w-6)"
    );
    var selectedSize = selectedSizeButton
      ? selectedSizeButton.innerText.split(" ")[0]
      : "S";
    var selectedPrice = selectedSizeButton
      ? selectedSizeButton.innerText.split(" ")[1].split("$")[1]
      : 69;

    // Add item to cart array
    cartItems.push({
      image: selectedColor + ".png",
      title: productTitle,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
    });
  }
}

// Add click listener to cart button
document.getElementById("add-to-cart").addEventListener("click", addToCart);

// Display cart modal with items
function openCartModal() {
  var cartModal = document.getElementById("cart-modal");
  var cartItemsContainer = document.getElementById("cart-items");
  // Clear existing items
  cartItemsContainer.innerHTML = "";

  // Create table rows for each cart item
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var row = document.createElement("tr");
    row.classList.add("border-b");

    // Create table row with item details using template literal
    row.innerHTML = `
      <td class="py-2 px-4">
        <div class="flex items-center space-x-2">
          <img src="${productImageBase}${
      item.image
    }" alt="" class="w-12 h-12 object-cover rounded-md"/>
          <span class="font-semibold">${item.title}</span>
        </div>
      </td>
      <td class="py-2 px-4">${item.color}</td>
      <td class="py-2 px-4">${item.size}</td>
      <td class="py-2 px-4">${item.quantity}</td>
      <td class="py-2 px-4">$${item.price.toFixed(2)}</td>
    `;

    cartItemsContainer.appendChild(row);
  }

  // Show the modal
  cartModal.classList.remove("hidden");
}

// Add click listeners for cart interactions
document
  .getElementById("checkout-btn")
  .addEventListener("click", openCartModal);

// Handle continue shopping button
document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
  });

// Handle checkout process
document.getElementById("checkout").addEventListener("click", function () {
  if (confirm("Proceeding to checkout...")) {
    document.getElementById("cart-modal").classList.add("hidden");
  }
});

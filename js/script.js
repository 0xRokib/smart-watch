const productImageBase = "./images/";
const ringButtons = document.querySelectorAll(".ring-button");
const productImage = document.getElementById("product-image");
// Change the main image based on color
for (let i = 0; i < ringButtons.length; i++) {
  let button = ringButtons[i];
  button.addEventListener("click", function (event) {
    const color = event.target.id.replace("-color", "");
    for (let j = 0; j < ringButtons.length; j++) {
      ringButtons[j].classList.remove("border-purple-600");
      ringButtons[j].classList.add("border-gray-300");
    }
    event.target.classList.add("border-purple-600");
    event.target.classList.remove("border-gray-300");

    // productImage.src = "./images/cyan.png";
    // productImage.src = "./images/" + color + ".png";
    productImage.src = productImageBase + color + ".png";
  });
}

// Select wrist size
function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];
  for (let i = 0; i < sizes.length; i++) {
    const button = document.getElementById("size-" + sizes[i]);
    if (size === sizes[i]) {
      button.classList.add("border-purple-600");
    } else {
      button.classList.remove("border-purple-600");
    }
  }
}

// Update the quantity
const quantityButtons = document.querySelectorAll(".quantity-button");
const quantityElement = document.getElementById("quantity");
for (let i = 0; i < quantityButtons.length; i++) {
  const button = quantityButtons[i];
  button.addEventListener("click", function (event) {
    const amount = event.target.innerText === "+" ? 1 : -1;
    const currentQuantity = parseInt(quantityElement.innerText);
    const newQuantity = Math.max(0, currentQuantity + amount);
    quantityElement.innerText = newQuantity;
  });
}

let cartCount = 0;
let cartItems = [];
const productTitle = "Classy Modern Smart Watch";
// Add item to cart
document.getElementById("add-to-cart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").innerText);
  if (quantity > 0) {
    cartCount = cartCount + quantity;
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("checkout-container").classList.remove("hidden");
    const selectedColorButton = document.querySelector(
      "button.border-purple-600.w-6"
    );
    const selectedColor = selectedColorButton
      ? selectedColorButton.id.split("-")[0]
      : "purple";

    const selectedSizeButton = document.querySelector(
      "button.border-purple-600:not(.w-6)"
    );
    const selectedSize = selectedSizeButton
      ? selectedSizeButton.innerText.split(" ")[0]
      : "S";
    const selectedPrice = selectedSizeButton
      ? selectedSizeButton.innerText.split(" ")[1].split("$")[1]
      : 69;

    cartItems.push({
      image: selectedColor + ".png",
      title: productTitle,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
    });
  }
});

// Open cart modal
document.getElementById("checkout-btn").addEventListener("click", function () {
  const cartModal = document.getElementById("cart-modal");
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    console.log(item);
    const row = document.createElement("tr");
    row.classList.add("border-b");
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

  cartModal.classList.remove("hidden");
});

// Close cart modal
document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
  });

// Proceed to checkout
document.getElementById("checkout").addEventListener("click", function () {
  const res = confirm("Proceeding to checkout...");
  if (res) {
    document.getElementById("cart-modal").classList.add("hidden");
  }
});

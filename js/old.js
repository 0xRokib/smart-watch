let cartCount = 0;
let cartItems = [];
const productImageBase = "./images/";
const productTitle = "Classy Modern Smart Watch";

// Change the main image based on color
const changeThumbnailColor = (color) => {
  const productImage = document.getElementById("product-image");
  const colors = ["purple", "teal", "cyan", "gray"];

  colors.forEach((c) => {
    const button = document.getElementById(`${c}-color`);
    button.classList.toggle("border-purple-600", color === c);
  });

  // Change the image based on selected color
  productImage.src = `${productImageBase}${color}.png`;
};

// Select wrist size
const selectWristSize = (size) => {
  const sizes = ["S", "M", "L", "XL"];

  sizes.forEach((s) => {
    const button = document.getElementById(`size-${s}`);
    button.classList.toggle("border-purple-600", size === s);
  });
};

// Update the quantity
const updateQuantity = (amount) => {
  const quantityElement = document.getElementById("quantity");
  const quantity = Math.max(0, parseInt(quantityElement.innerText) + amount);
  quantityElement.innerText = quantity;
};

// Add item to cart
const addToCart = () => {
  const quantity = parseInt(document.getElementById("quantity").innerText);

  if (quantity > 0) {
    cartCount += quantity;
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
      : "M";

    // Add the item to the cart
    cartItems.push({
      image: `${selectedColor}.png`,
      title: productTitle,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: 79,
    });
  }
};

// Open cart modal
const openCartModal = () => {
  const cartModal = document.getElementById("cart-modal");
  const cartItemsContainer = document.getElementById("cart-items");

  cartItemsContainer.innerHTML = ""; // Clear previous cart items

  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach(({ image, title, color, size, quantity, price }) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");
    row.innerHTML = `
      <td class="py-2 px-4">
        <div class="flex items-center space-x-2">
          <img src="${productImageBase}${image}" alt="${title}" class="w-12 h-12 object-cover rounded-md" />
          <span class="font-semibold">${title}</span>
        </div>
      </td>
      <td class="py-2 px-4">${color}</td>
      <td class="py-2 px-4">${size}</td>
      <td class="py-2 px-4">${quantity}</td>
      <td class="py-2 px-4">$${(price * quantity).toFixed(2)}</td>
    `;
    cartItemsContainer.appendChild(row);

    totalPrice += price * quantity;
    totalQuantity += quantity;
  });

  const totalRow = document.createElement("tr");
  totalRow.classList.add("border-t", "font-bold");
  totalRow.innerHTML = `
    <td class="py-2 px-4" colspan="3">Total</td> 
    <td class="py-2 px-4">${totalQuantity}</td>
    <td class="py-2 px-4">$${totalPrice.toFixed(2)}</td>
  `;
  cartItemsContainer.appendChild(totalRow);

  cartModal.classList.remove("hidden");
};

// Close cart modal
const closeCartModal = () => {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.add("hidden");
};

// Continue shopping (just close the modal)
const continueShopping = () => closeCartModal();

// Proceed to checkout
const checkout = () => alert("Proceeding to checkout...");

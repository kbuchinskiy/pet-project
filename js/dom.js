var cartPopup = document.querySelector("#cartPopup"),
  openCartPopupBtn = document.querySelector("#openCartPopupBtn"),
  cartList = cartPopup.querySelector(".cart-list"),
  productList = document.querySelector(".product-list");

openCartPopupBtn.addEventListener("click", toggleCartPopup);
productList.addEventListener("click", handleProductClick);
cartPopup.addEventListener("click", handleProductClick);

function toggleCartPopup(e) {
  cartPopup.classList.toggle("opened");
}

function handleProductClick(e) {
  var productId,
    productToUpdate,
    isButton = e.target.dataset.action;

  if (isButton) {
    productId = e.target.closest("[data-product-id]").dataset.productId;

    productToUpdate = getProductFromData(productId);

    if (e.target.dataset.action === "add") {
      cart.addProductItem(productToUpdate);
    } else if (e.target.dataset.action === "remove") {
      cart.removeProductItem(productToUpdate);
    } else if (e.target.dataset.action === "delete") {
      cart.deleteProduct(productId);
    }

    updateProductElem(productId);
    updateCartProductElem(productId);
    updateTotalPrice();
  }
}

function getProductDomElem(productId) {
  var elemToUpdate = productList.querySelector(
    ".product-item[data-product-id=" + productId + "]"
  );
  return elemToUpdate;
}

function getProductFromData(productId) {
  var product;
  product = data.find(product => product.id === productId);
  product = copyObject(product);
  delete product.image;
  return product;
}

function copyObject(obj) {
  return Object.assign({}, obj);
}

function updateProductElem(productId) {
  var updatedItem;
  elemToUpdate = getProductDomElem(productId);

  if (cart.hasProduct(productId)) {
    updatedItem = cart.getProductById(productId);
    elemToUpdate.querySelector(".product-amount").innerText =
      updatedItem.amount;
  } else {
    elemToUpdate.querySelector(".product-amount").innerText = 0;
  }
}

function updateTotalPrice() {
  document.querySelector("header .total-price-output span").innerText =
    cart.total;
}

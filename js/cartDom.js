function addNewCartProductElem(productData) {
  var cartItemElem = document
    .querySelector("#cartItemTemplate")
    .content.cloneNode(true);
  cartItemElem.querySelector(".cart-item").dataset.productId = productData.id;
  cartItemElem.querySelector(".cart-item-title").innerText = productData.title;
  cartItemElem.querySelector(".cart-item-amount").innerText =
    productData.amount;
  cartItemElem.querySelector(".cart-item-total-price").innerText =
    productData.totalPrice + " $";

  cartList.appendChild(cartItemElem);
}

function updateCartProductElem(productId) {
  var updatedItem;
  elemToUpdate = getCartProductElem(productId);

  if (cart.hasProduct(productId)) {
    updatedItem = cart.getProductById(productId);
    elemToUpdate.querySelector(".cart-item-amount").innerText =
      updatedItem.amount;
    elemToUpdate.querySelector(".cart-item-total-price").innerText =
      updatedItem.totalPrice + " $";
  } else {
    deleteNewCartProductElem(elemToUpdate);
  }
}

function getCartProductElem(productId) {
  var elemToUpdate = cartList.querySelector(
    ".cart-item[data-product-id=" + productId + "]"
  );
  return elemToUpdate;
}

function deleteNewCartProductElem(elemToDelete) {
  cartList.removeChild(elemToDelete);
}

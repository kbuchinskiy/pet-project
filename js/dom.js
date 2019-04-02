var app = app || {};

app.dom = (() => {
  var cartPopup = document.querySelector('#cartPopup'),
    openCartPopupBtn = document.querySelector('#openCartPopupBtn'),
    cartList = cartPopup.querySelector('.cart-list'),
    productList = document.querySelector('.product-list'),
    clearCartBtn = document.querySelector("button[data-action='clear-cart']");

  openCartPopupBtn.addEventListener('click', toggleCartPopup);
  productList.addEventListener('click', handleProductClick);
  cartList.addEventListener('click', handleProductClick);
  clearCartBtn.addEventListener('click', clearCart);

  function toggleCartPopup(e) {
    cartPopup.classList.toggle('opened');
  }

  function handleProductClick(e) {
    var productId,
      productToUpdate,
      isButton = e.target.hasAttribute('data-action'),
      action;

    if (isButton) {
      action = e.target.getAttribute('data-action');
      productId = e.target.closest('[data-product-id]').dataset.productId;
      productToUpdate = getProductFromData(productId);

      switch (action) {
        case 'add':
          addCartItem(productId, productToUpdate);
          break;
        case 'remove':
          removeCartItem(productId, productToUpdate, false);
          break;
        case 'delete':
          removeCartItem(productId, productToUpdate, true);
      }
    }
  }

  function getProductDomElem(productId) {
    var elemToUpdate = productList.querySelector(
      '.product-item[data-product-id=' + productId + ']'
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
      elemToUpdate.querySelector('.product-amount').innerText =
        updatedItem.amount;
    } else {
      elemToUpdate.querySelector('.product-amount').innerText = 0;
    }
  }

  function updateTotalPrice() {
    document.querySelector('header .total-price-output span').innerText =
      cart.total;
  }

  function addCartItem(productId, productToUpdate) {
    cart.addProductItem(productToUpdate);
    updateProductElem(productId);
    updateCartProductElem(productId);
  }

  function removeCartItem(productId, productToUpdate, deleteProduct) {
    if (cart.hasProduct(productId)) {
      if (deleteProduct) {
        cart.deleteProduct(productId);
      } else {
        cart.removeProductItem(productToUpdate);
      }
      updateProductElem(productId);
      updateCartProductElem(productId);
    }
  }

  function addNewCartProductElem(productData) {
    var cartItemElem = document
      .querySelector('#cartItemTemplate')
      .content.cloneNode(true);
    cartItemElem.querySelector('.cart-item').dataset.productId = productData.id;
    cartItemElem.querySelector('.cart-item-title').innerText =
      productData.title;
    cartItemElem.querySelector('.cart-item-amount').innerText =
      productData.amount;
    cartItemElem.querySelector('.cart-item-total-price').innerText =
      productData.totalPrice + ' $';

    cartList.appendChild(cartItemElem);
  }

  function getCartProductElem(productId) {
    var elemToUpdate = cartList.querySelector(
      '.cart-item[data-product-id=' + productId + ']'
    );
    return elemToUpdate;
  }

  function deleteNewCartProductElem(elemToDelete) {
    cartList.removeChild(elemToDelete);
  }

  function updateCartProductElem(productId) {
    var updatedItem;
    elemToUpdate = getCartProductElem(productId);

    if (cart.hasProduct(productId)) {
      updatedItem = cart.getProductById(productId);
      elemToUpdate.querySelector('.cart-item-amount').innerText =
        updatedItem.amount;
      elemToUpdate.querySelector('.cart-item-total-price').innerText =
        updatedItem.totalPrice + ' $';
    } else {
      deleteNewCartProductElem(elemToUpdate);
    }

    updateTotalPrice();
  }

  function clearCart(e) {
    if (cart.isEmpty()) {
      return false;
    }
    var cartProducts = [...cart.products];
    cartProducts.forEach(product => {
      cart.deleteProduct(product.id);
      updateProductElem(product.id);
      updateCartProductElem(product.id);
    });
  }
  return {
    productList,
    addNewCartProductElem
  };
})();

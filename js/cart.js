var cart = {
  products: [],
  total: 0,
  addProductItem(productToUpdate) {
    if (!this.hasProduct(productToUpdate.id)) {
      productToUpdate.amount = 1;
      productToUpdate.totalPrice = productToUpdate.price;
      this.products.push(productToUpdate);
      addNewCartProductElem(productToUpdate);
    } else {
      this.products.forEach(existedProduct => {
        if (productToUpdate.id === existedProduct.id) {
          existedProduct.amount++;
          existedProduct.totalPrice += existedProduct.price;
        }
      });
    }
    this.total += productToUpdate.price;
  },
  removeProductItem(productToUpdate) {
    if (!this.hasProduct(productToUpdate.id)) {
      return false;
    } else {
      this.products.forEach((existedProduct, itemIndex) => {
        if (productToUpdate.id === existedProduct.id) {
          if (existedProduct.amount > 1) {
            existedProduct.amount--;
            existedProduct.totalPrice -= existedProduct.price;
            this.total -= existedProduct.price;
          } else {
            this.deleteProduct(existedProduct.id);
          }
        }
      });
    }
  },
  deleteProduct(productId) {
    if (this.hasProduct(productId)) {
      this.products.forEach((product, index) => {
        if (product.id === productId) {
          this.total = this.total - product.totalPrice;
          this.products.splice(index, 1);
        }
      });
    }
  },
  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  },
  hasProduct(productId) {
    return this.products.some(product => product.id === productId);
  }
};

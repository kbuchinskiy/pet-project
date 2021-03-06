var app = app || {};

app.fillProductListElem = function() {
  data.forEach(product => {
    var productElem = this.createProductElem(product);
    app.dom.productList.appendChild(productElem);
  });
};

app.createProductElem = function(productData) {
  var productElem = document
    .getElementById('prouctItemTemplate')
    .content.cloneNode(true);

  productElem.querySelector('.product-item').dataset.productId = productData.id;
  productElem.querySelector('.product-title').innerText = productData.title;
  productElem.querySelector('.product-price').innerText =
    productData.price + ' $';
  productElem.querySelector('.product-image img').src = productData.image;

  return productElem;
};

function render() {
  var app = document.getElementById("app");
  fillProductListElem();
}

function fillProductListElem() {
  data.forEach(product => {
    var productElem = createProductElem(product);
    productList.appendChild(productElem);
  });
}

function createProductElem(productData) {
  var productElem = document
    .getElementById("prouctItemTemplate")
    .content.cloneNode(true);

  productElem.querySelector(".product-item").dataset.productId = productData.id;
  productElem.querySelector(".product-title").innerText = productData.title;
  productElem.querySelector(".product-price").innerText =
    productData.price + " $";
  productElem.querySelector(".product-image img").src = productData.image;

  return productElem;
}

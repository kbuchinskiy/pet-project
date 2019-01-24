function render() {
  var app = document.getElementById("app");
  app.appendChild(generateProductsList());
}

function generateProductsList() {
  var productsListElem = document.createElement("DIV");
  productsListElem.classList.add("products-list");

  data.forEach(product => {
    var productElem = createProductElem(product);
    productsListElem.appendChild(productElem);
  });
  return productsListElem;
}

function createProductElem(productData) {
  var productElem = document
    .getElementById("prouctItemTemplate")
    .content.cloneNode(true);

  productElem.querySelector(".product-title").innerText = productData.title;
  productElem.querySelector(".product-price").innerText =
    productData.price + " $";
  productElem.querySelector(".product-image").src = productData.image;

  return productElem;
}

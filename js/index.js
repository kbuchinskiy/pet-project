window.onload = init;
var data = {};

function init() {
  fetch("/data/store.json")
    .then(response => response.json())
    .then(responseData => {
      data = responseData;
      app.fillProductListElem();
    });
}

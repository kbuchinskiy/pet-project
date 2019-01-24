var cartPopup = document.querySelector("#cartPopup"),
  openCartPopupBtn = document.querySelector("#openCartPopupBtn");

openCartPopupBtn.addEventListener("click", toggleCartPopup);

function toggleCartPopup() {
  cartPopup.classList.toggle("opened");
}

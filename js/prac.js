(function() {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", function() {
    cart.classList.toggle("show-cart");
  });
})();

(function() {
  const storeIcons = document.querySelectorAll(".store-item-icon");
  storeIcons.forEach(function(storeIcon) {
    storeIcon.addEventListener("click", function(event) {
      // console.log(event.target.parentElement.previousElementSibling.src);
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);

        let item = {};
        item.img = `img-cart${partPath}`;
        item.name =
          event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].innerText;
        item.price = parseInt(
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].children[0].innerText
        );

        const cartItem = document.createElement("div");
        // add this class cart-item d-flex justify-content-between text-capitalize my-3
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `<img src="${
          item.img
        }" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="item-text">

        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
        <span>$</span>
        <span id="cart-item-price" class="cart-item-price" class="mb-0">${
          item.price
        }</span>
      </div>
      <a href="#" id='cart-item-remove' class="cart-item-remove">
        <i class="fas fa-trash"></i>
      </a>`;

        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        if (cart.insertBefore(cartItem, total)) {
          alert("added to cart");
        }
        // console.log(cartItem);
        const items = [];
        const cartTotal = document.querySelectorAll(".cart-item-price");

        const removeItem = document.querySelectorAll(".cart-item-remove");
        showPrice();
        removeItem.forEach(function(item) {
          item.addEventListener("click", function(e) {
            let removeSelected = item.parentElement;
            let itemContainer =
              e.target.parentElement.parentElement.parentElement;
            console.log(removeSelected.children[1].children[2].innerText);

            if (
              removeSelected.classList.contains("cart-item") &&
              itemContainer.removeChild(removeSelected)
            ) {
              alert("Item removed from cart succesfully");
              showPrice();
            } else {
              alert("something wrong");
            }
          });
        });
      }
    });
  });
})();

(function() {})();

function showPrice() {
  const cartTotal = document.querySelectorAll(".cart-item-price");
  const itemCount = document.getElementById("item-count");
  const itemTotal = document.querySelector(".item-total");

  let total = [];
  cartTotal.forEach(function(item) {
    total.push(parseInt(item.innerText));
  });
  let price = 0;
  const totalPrice = total.map(function(t) {
    return (price += t);
  });
  itemCount.innerHTML = totalPrice.length;
  itemTotal.innerHTML = price;
  document.getElementById("cart-total").innerHTML =
    totalPrice[totalPrice.length - 1];
}

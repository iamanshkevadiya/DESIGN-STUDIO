let cartItem = JSON.parse(localStorage.getItem("cartItem"));
let quantity = 1;

function updateQuantity() {
    document.getElementById("quantity").innerText = quantity;
}

function renderCartItem() {
    if (cartItem) {
        let cartElement = document.getElementById("cartItem");
        cartElement.innerHTML = "";

        let div = document.createElement("div");

        let title = document.createElement("h5");
        let img = document.createElement("img");
        let quantityDiv = document.createElement("div");

        div.classList = "card-body";

        title.innerHTML = cartItem.title;
        title.classList = "card-title";

        img.src = cartItem.image;
        img.classList = "card-img-top";

        quantityDiv.classList = "quantity-control";
        quantityDiv.innerHTML = `
                    <button class="btn" id="decrease">-</button>
                    <span id="quantity">${quantity}</span>
                    <button class="btn" id="increase">+</button>
                `;

        div.append(img);
        div.append(title);
        div.append(quantityDiv);

        cartElement.append(div);

        document.getElementById("decrease").addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                updateQuantity();
            }
            else {
                localStorage.removeItem("cartItem");
                window.location.href = "index.html";
            }
        });

        document.getElementById("increase").addEventListener("click", () => {
            quantity++;
            updateQuantity();
        });
    }
}

renderCartItem();
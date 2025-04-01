import cartApi from "../api/cart.api.js";
import navbar from "../componets/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
const handleQtyicon = (id, opr) => {
    if (opr == "+") {
        cartApi.addQty(id);
    } else {
        cartApi.removeQty(id);
    }
    window.location.reload();
};

// const payment = async (amount) => {
//     try {
//         await cartApi.payment(amount);
//     } catch (error) {
//         console.error("Error during payment:", error);
//         alert("Payment failed. Please try again.");
//     }
// };

let totalPrice = 0;

const mapper = (data) => {
    data.forEach(({ _id, qty, product }) => {
        if (Array.isArray(product)) {
            product.forEach(({ title, price, img }) => {
                totalPrice += price * qty;

                let addToCart = document.getElementById('cartlist');
                addToCart.classList = "card-items";

                let div = document.createElement("div");
                div.classList = "card-body";

                let a = document.createElement("a");
                a.style = ""

                let titleT = document.createElement("h3");
                titleT.textContent = title;
                titleT.classList = "card-title";

                let priceT = document.createElement("p");
                priceT.textContent = "₹" + price;
                priceT.style = "font-weight:600; color:black; padding-bottom:10px";

                let imgT = document.createElement("img");
                imgT.src = `http://localhost:8099/${img}`;
                imgT.alt = title;
                imgT.classList = "card-img-top";

                let btn1 = document.createElement("button");
                btn1.innerHTML = "-";
                btn1.addEventListener("click", () => handleQtyicon(_id, "-"));
                btn1.classList = "btn btn-light border border-2";

                let btn2 = document.createElement("button");
                btn2.innerHTML = qty;
                btn2.classList = "btn btn-light border border-2";

                let btn3 = document.createElement("button");
                btn3.innerHTML = "+";
                btn3.addEventListener("click", () => handleQtyicon(_id, "+"));
                btn3.classList = "btn btn-light border border-2";

                let btnDiv = document.createElement("div");
                btnDiv.append(btn1, btn2, btn3);

                a.append(imgT, titleT, priceT);
                div.append(a, btnDiv);
                addToCart.append(div);
            })
        }

    });

    let amount = document.createElement("p");
    amount.innerHTML = "Total: ₹" + totalPrice;
    amount.style  = "font-weight:600; color:black; font-size:18px;"

    let payBtn = document.createElement("button");
    payBtn.innerHTML = "Pay";
    payBtn.classList = "btn btn-light border border-2";
    payBtn.style = "width:100px; margin:0;"
    payBtn.addEventListener("click", () => payment(totalPrice));

    // let summaryDiv = document.createElement("div");
    // summaryDiv.append(amount, payBtn);
    // summaryDiv.classList = "d-block";
    // document.getElementById("cartlist").append(summaryDiv);
};

const getCartData = async () => {
    try {
        let data = await cartApi.getByUserId();
        if (!data || data.length === 0) {
            document.getElementById("cartlist").textContent = "Your cart is empty.";
            return;
        }
        mapper(data);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        document.getElementById("cartlist").textContent = "Failed to load cart. Please try again later.";
    }
};

getCartData();
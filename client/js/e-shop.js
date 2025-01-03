import cartApi from "../api/cart.api.js";
import productApi from "../api/product.api.js";
import navbar from "../componets/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
const mapper = (data) => {
    data.forEach(({ user, _id, title, price, img }) => {
        let card_iteams = document.getElementById("additeams");
        card_iteams.classList = "card-items";

        let div = document.createElement("div");
        div.classList = "card-body";

        let a = document.createElement("a");
        a.href = `pages/buy-card.html?id=${_id}`;
        a.style = ""

        let titleT = document.createElement("h3");
        titleT.textContent = title;
        titleT.classList = "card-title";

        let priceT = document.createElement("p");
        priceT.textContent = "\u20B9 " + price;
        priceT.style = "font-weight:600; color:black; padding-bottom:10px";

        let imgT = document.createElement("img");
        imgT.src = `http://localhost:8090/${img}`;
        imgT.alt = title;
        imgT.classList = "card-img-top";

        let cartButton = document.createElement("button");
        cartButton.textContent = "Add to Cart";
        cartButton.classList = "btn btn-primary"

        cartButton.addEventListener("click", async () => {
            let productId = _id;
            let productItems = await productApi.getProductById(productId);
            let existingItem = productItems.find((item) => item.product._id === productId);

            if (existingItem) {
                await productApi.updateQuantity(existingItem._id, existingItem.qty + 1);
            } else {
                if (user == user) {
                    productApi.addToCart({ user, product: productId })
                }
                else {
                    await productApi.addToCart({ user, product: [{ productId }] });
                }
            }
        });
        a.append(imgT, titleT, priceT);
        div.append(a, cartButton);
        card_iteams.append(div);
    });
};

const getProducts = async () => {
    try {
        let data = await productApi.get();
        if (!data || data.length === 0) {
            console.warn("No products available.");
            document.getElementById("additeams").textContent = "No products available.";
            return;
        }
        mapper(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("additeams").textContent = "Failed to load products. Please try again later.";
    }
};

getProducts();
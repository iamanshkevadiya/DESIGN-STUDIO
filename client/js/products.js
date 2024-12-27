let iteams = [
    {
        title: "Mathilde Armchair Night",
        image: "../images/Chair/chair-2.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
    {
        title: "Mathilde Armchair Day",
        image: "../images/Chair/chair-3.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
    {
        title: "Embroidered Armchairs",
        image: "../images/Chair/chair-4.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
    {
        title: "Embroidered Cocteau Chairs",
        image: "../images/Chair/chair-6.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
    {
        title: "Cléo Chair",
        image: "../images/Chair/chair-1.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
    {
        title: "Clélia Chair",
        image: "../images/Chair/chair-5.jpg",
        button: `<a href="" class="btn btn-primary">Add to Card</a>`,
    },
]

iteams.forEach((val, index) => {
    let card_iteams = document.getElementById("additeams");
    let div = document.createElement("div");

    let title = document.createElement("h5");
    let img = document.createElement("img");
    let btn = document.createElement("button");

    div.classList = "card-body";

    title.innerHTML = val.title;
    title.classList = "card-title";

    img.src = val.image;
    img.classList = "card-img-top";

    btn.innerHTML = "Add to Cart";
    btn.classList = "btn add-to-cart";
    btn.setAttribute("data-index", index);

    div.append(img);
    div.append(title);
    div.append(btn);

    card_iteams.append(div);
})

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function (event) 
    {
        event.preventDefault();
        let index = this.getAttribute("data-index");
        localStorage.setItem("cartItem", JSON.stringify(iteams[index]));
        window.location.href = "buy-card.html";
    });
});
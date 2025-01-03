import productApi from "../api/product.api.js";
import navbar from "../componets/navbar.js";

document.getElementById("navbar").innerHTML = navbar();


const handleSubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img");
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("price", price);
    formdata.append("img", img.files[0]);

    // Debug: Log FormData content
    for (const [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
    }

    // Call API and handle the result
    const result = await productApi.post(formdata);
    if (result) {
        console.log("Product successfully posted:", result);
        // Add success handling (e.g., update UI or reset form).
    } else {
        console.error("Failed to post product.");
    }
};

// Attach the event listener to the form
document.getElementById("add-product").addEventListener("submit", handleSubmit);
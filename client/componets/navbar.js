import getUserData from "../utils/Cookies.js";

let { token } = Cookies.get();
console.log("token:" + token);

const decodeToken = token != undefined ? jwt_decode(token) : undefined;

const logout = () => {
    console.log("Decoded token");

    Cookies.remove("token");
    window.location.href = "/client/pages/login.html";

};
const navbar = () => {
    let tag = ``;
    let addtag = ``;

    if (decodeToken) {
        tag = `<a class="nav-link" id=logout>Logout</a>`;
    }
    else {
        tag = `<a class="nav-link" href="/client/pages/login.html">Login</a>`;
    }

    const userData = getUserData();

    if (userData && userData.role == 'ADMIN') {
        addtag = `<a class="nav-link" href=""></a>`;
    }
    else {
        addtag = `<a class="nav-link" href="/client/pages/product.html">Add Product</a>`;        
    }


    return `<nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="d-flex justify-content-between header">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="logo">
                            <a class="navbar-brand" href="index.html"><img src="../images/Logo/logo1.png"
                                    alt="LOGO"></a>
                        </div>
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="gallery.html">THE Gallery</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="work.html">Work</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="e-shop.html">E-Shop</a>
                            </li>
                            <li class="nav-item">
                                ${addtag}
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contact.html">Contact</a>
                            </li>
                            <li class="nav-item">
                                ${tag}
                            </li>
                        </ul>
                    </div>
                    <div class="icon d-flex align-items-center">
                        <ul class=" navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="signup.html"><i class="bi bi-people"></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="buy-card.html"><i class="bi bi-bag"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`;
};

export default navbar;

document.addEventListener('DOMContentLoaded', () => {
    let logoutBtn = document.getElementById('logout');
    console.log(logoutBtn);

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});


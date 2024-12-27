import userApi from "../api/user.api.js";

const form = document.getElementById('userDetails'); 
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        username: username,
        password: password,
        email:email,
    };

    userApi.signup(user);
});

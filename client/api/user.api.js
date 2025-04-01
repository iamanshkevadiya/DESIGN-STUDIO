import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8099";
const userApi = {
    signup: async (user) => {
        try {
            let req = await fetch(`${baseUrl}/user/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            });

            let res = await req.json();
            console.log(res);

            if (req.status === 400) {
                alert("User already exists. Please log in.");
            }
            else if (req.status === 201) {
                Cookies.set("token", res.token, { expires: 3 });
                console.log(token);
                setTimeout(function () {
                    window.location.href = "/client/index.html";
                }, 50000);
            }
            else {
                alert(res.message || "Signup failed. Please try again.");
            }

        } catch (error) {
            console.log("Failed to sign up", error);
        }
    },
    login: async (user) => {
        try {
            let req = await fetch(`${baseUrl}/user/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            });
            let res = await req.json();

            if (req.ok) {

                Cookies.set("token", res.token, { expires: 3 });
                alert(res.msg)

                return setTimeout(function () {
                    window.location.href = "/client/index.html";
                }, 500);
            }
            else {
                return alert(res.msg)
            }

        } catch (error) {
            console.log("Failed to sign up", error);
        }
    },
    delete: async (id) => {
        await fetch(`${baseUrl}/user/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    },
};

export default userApi;
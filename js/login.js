let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

let getUser = JSON.parse(localStorage.getItem("users")) || [];

loginBtn.addEventListener("click", function (e){
    e.preventDefault();

    if (email.value === "" || password.value === ""){
        alert("Please fill in all fields.");
        return;
    }

    if (getUser.length === 0) {
        alert("No registered users found!");
        return;
    }

    let user = getUser.find(u => u.email === email.value && u.password === password.value);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location = "index.html";
    } else {
        alert("Invalid email or password.");
    }
});

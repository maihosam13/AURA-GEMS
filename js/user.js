let noUserLinks = document.querySelector(".no-user-links");
let userLinks = document.querySelector(".user-links");
let userInfo = document.querySelector(".user-info p");
let logOutBtn = document.querySelector("#logOutBtn");

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser){
    noUserLinks.classList.add("d-none");
    userLinks.classList.add("d-flex");
    userInfo.textContent = `Hello, ${loggedInUser.firstName}`;
}

logOutBtn.addEventListener("click", function(){
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("productsInCart")
    localStorage.removeItem("favProducts")
    setTimeout(() => {
        window.location = "index.html";
    }, 1500)
})
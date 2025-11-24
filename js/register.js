let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener("click", function (e){
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some(user => user.email === email.value);
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all fields.");
        return;
    }else if(userExists){
        alert("User with this email already exists.");
    } else {
        let newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }; 
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        window.location = "login.html";
    } 
})

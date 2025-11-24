let allProducts = document.querySelector("#allProducts");

let products = [
    { id: 1, title: "Golden Classic Watch", price: "400", category: "Watches", image: "images/products/1.jpg", count: 1 },
    { id: 2, title: "Golden Layered Necklace", price: "1290", category: "Necklace", image: "images/products/2.jpg", count: 1 },
    { id: 3, title: "soft watch", price: "720", category: "watches", image: "images/products/3.jpg", count: 1 },
    { id: 4, title: "blue Watch", price: "350", category: "Watches", image: "images/products/4.jpg", count: 1 },
    { id: 5, title: "Silver Signet Rings", price: "1999", category: "Rings", image: "images/products/5.jpg", count: 1 },
    { id: 6, title: "Square Watch with Bracelets / Watch Stacking", price: "540", category: "Watches", image: "images/products/6.jpg", count: 1 },
    { id: 7, title: "men's watch", price: "600", category: "watches", image: "images/products/7.jpg", count: 1 },
    { id: 8, title: "Silver Chain Bracelet (Men's)", price: "379", category: "Bracelet", image: "images/products/8.jpg", count: 1 },
    { id: 9, title: "Teardrop Pendant Diamond Necklace", price: "260", category: "Diamond ", image: "images/products/9.jpg", count: 1 },
    { id: 10, title: "Gemstone Pendant", price: "1300", category: "Necklace", image: "images/products/10.jpg", count: 1 },
    { id: 11, title: "Silver Necklace with Pendant", price: "355", category: "Necklace", image: "images/products/11.jpg", count: 1 },
    { id: 12, title: "Silver Chain Bracelet (Men's)", price: "999", category: "Bracelet", image: "images/products/12.jpg", count: 1 }

];

function drawProducts(arr) {
    let y = arr.map((item) => {

        return `
        <div class="col px-3 pb-3">
            <div class="card p-0 hover-trans product-card" data-id="${item.id}">
                <div class="w-100 product-img-div">
                    <img src="${item.image}" class="card-img-top product-img" alt="...">
                </div>
                <div class="card-body product-desc text-center">
                    <h5 class="card-title fw-bold pb-2">${item.title}</h5>
                    <p class="card-text">Price: $${item.price}</p>
                    <p class="card-text">Category: ${item.category}</p>
                    <div class="btns d-flex justify-content-center gap-3">
                        <!-- regular (outline) heart -->
                        <i class="fa-regular fa-heart fs-4 lh-base unfav" onClick="addToFav(${item.id})" title="outline heart"></i>
                        <!-- solid (filled) heart -->
                        <i class="fa-solid fa-heart fs-4 text-danger lh-base fav" onClick="removeFromFav(${item.id})" title="filled heart"></i>
                        <button class="btn btn-primary add-btn" onClick="addToCart(${item.id})">Add to Cart</button>
                        <button class="btn btn-danger remove-btn" onClick="removeFromCart(${item.id})">Remove from Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    allProducts.innerHTML = y.join("");
}

const searchInput = document.querySelector("#searchInput");
const filterKey = document.querySelector("#filterKey");
// const resultsDiv = document.querySelector("results");

// Listen for typing or select change
searchInput.addEventListener("input", filterProducts);
filterKey.addEventListener("change", filterProducts);

function filterProducts() {
    const key = filterKey.value; // e.g. "title"
    const searchValue = searchInput.value.toLowerCase();

    const filtered = products.filter((p) => {
        return p[key].toString().toLowerCase().includes(searchValue);
    });

    drawProducts(filtered);
}

////////////////////////////////////////////////////////

let productsCart = document.querySelector("#productsCart");
let productsCartdiv = document.querySelector("#productsCart div");
let badge = document.querySelector(".badge");


let addedItem = localStorage.getItem("productsInCart")
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];

function saveCart() {
    badge.textContent = addedItem.reduce((total, item) => total + item.count, 0);
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
}

function renderCart() {
    productsCartdiv.innerHTML = "";
    addedItem.forEach((item) => {
        let price = item.price*item.count;
        productsCartdiv.innerHTML += `
        <div class="mt-2 p-2 rounded-3 shadow-sm cart-product" data-id="${item.id}">
            <div class="row w-100">
                <h5 class="col-6 fs-6 fw-bold m-0">${item.title}</h5>
                <p class="col-6 m-0">Price: <span class="d-block">$${price}</span></p>
                <div class="col-7 pe-0 count">
                    <span class="d-inline-block border rounded-2 text-center del">-</span>
                    <span class="text-center count-value">${item.count}</span>
                    <span class="d-inline-block border rounded-2 text-center add">+</span>
                </div>
            </div>
        </div>
    `;
    });

    // Buttons + and -
    document.querySelectorAll(".add").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = parseInt(e.target.closest(".cart-product").dataset.id);
            let item = addedItem.find((p) => p.id === id);
            // let pricePerItem = item.price / item.count;
            item.count += 1;
            if (item.count > 99) item.count = 99; // الحد الأقصى للكمية
            if (item.count > 1) {
                // item.price = pricePerItem * item.count
            };
            
            saveCart();
            renderCart();
        });
    });

    document.querySelectorAll(".del").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = parseInt(e.target.closest(".cart-product").dataset.id);
            let item = addedItem.find((p) => p.id === id);
            // let pricePerItem = item.price / item.count;
            // let addBtn = document.querySelector(`[data-id="${item.id}"] .add-btn`)
            // let removeBtn = document.querySelector(`[data-id="${item.id}"] .remove-btn`)
            if (item.count > 1) {
                // item.price = pricePerItem * (item.count - 1);
                item.count -= 1;
            } else {
                addedItem = addedItem.filter((p) => p.id !== id);
                // addBtn.style.display = "inline-block";
                // removeBtn.style.display = "none";
            }
            saveCart();
            renderCart();
            updateButtonsState();
        });
    });
}

function addToCart(id) {
    if (localStorage.getItem("loggedInUser")) {
        let selectedItem = products.find((item) => item.id === id);
        // let found = addedItem.find((item) => item.id === id);
        // let addBtn = document.querySelector(`[data-id="${id}"] .add-btn`);
        // let removeBtn = document.querySelector(`[data-id="${id}"] .remove-btn`);

        selectedItem.count = 1;
        addedItem.push(selectedItem);
        // addBtn.style.display = "none";
        // removeBtn.style.display = "inline-block";

        saveCart();
        renderCart();
        updateButtonsState();
    } else {
        alert("You must log in to add items to the cart.");
        window.location = "login.html";
    }
}

function removeFromCart(id) {
    addedItem = addedItem.filter((item) => item.id !== id);
    // let addBtn = document.querySelector(`[data-id="${id}"] .add-btn`);
    // let removeBtn = document.querySelector(`[data-id="${id}"] .remove-btn`);
    // addBtn.style.display = "inline-block";
    // removeBtn.style.display = "none";
    saveCart();
    renderCart();
    updateButtonsState();
}

//////////////////////////////////////



function updateButtonsState() {
    addedItem = JSON.parse(localStorage.getItem("productsInCart")) || [];

    products.forEach(product => {
        const card = document.querySelector(`[data-id="${product.id}"]`);
        if (!card) return;

        const addBtn = document.querySelector(`[data-id="${product.id}"] .add-btn`);
        const removeBtn = document.querySelector(`[data-id="${product.id}"] .remove-btn`);

        if (addedItem.some(i => i.id === product.id)) {
            addBtn.style.display = "none";
            removeBtn.style.display = "inline-block";
        } else {
            addBtn.style.display = "inline-block";
            removeBtn.style.display = "none";
        }
    });
}

// الترتيب الصحيح
drawProducts(products);
saveCart();
renderCart();
updateButtonsState();
//////////////////////////////////

let shoppingCartIcon = document.querySelector("#shoppingCartIcon");
let productsCartContainer = document.querySelector("#productsCart");

shoppingCartIcon.addEventListener("click", () => {
    if (productsCartContainer.style.display === "block") {
        productsCartContainer.style.display = "none";
    } else {
        productsCartContainer.style.display = "block";
    }
})

/////////////////////////////////////////

// favorite

let favItem = localStorage.getItem("favProducts")
    ? JSON.parse(localStorage.getItem("favProducts"))
    : [];

function saveFav() {
    localStorage.setItem("favProducts", JSON.stringify(favItem));
}

function addToFav(id) {
    if (localStorage.getItem("loggedInUser")) {
        let selectedItem = products.find((item) => item.id === id);

        favItem.push(selectedItem);

        saveFav();
        updateFavState();
    } else {
        alert("You must log in to add items to Favorites.");
        window.location = "login.html";
    }
}

function removeFromFav(id) {
    favItem = favItem.filter((item) => item.id !== id);
    saveFav();
    updateFavState();
}

//////////////////////////////////////



function updateFavState() {
    favItem = JSON.parse(localStorage.getItem("favProducts")) || [];

    products.forEach(product => {
        const card = document.querySelector(`[data-id="${product.id}"]`);
        if (!card) return;

        const unFav = document.querySelector(`[data-id="${product.id}"] .unfav`);
        const fav = document.querySelector(`[data-id="${product.id}"] .fav`);

        if (favItem.some(i => i.id === product.id)) {
            unFav.style.display = "none";
            fav.style.display = "inline-block";
        } else {
            unFav.style.display = "inline-block";
            fav.style.display = "none";
        }
    });
}




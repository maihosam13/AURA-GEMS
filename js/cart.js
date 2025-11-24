let productsCartdiv = document.querySelector("#cartProductsDiv");
let badge = document.querySelector(".badge");


let addedItem = localStorage.getItem("productsInCart")
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];

function saveCart() {
    badge.textContent = addedItem.reduce((total, item) => total + item.count, 0);
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
}


function drawCartProducts() {

    if (!addedItem || addedItem.length === 0) {
        productsCartdiv.innerHTML = `<p class="fs-4 text-center mt-5">Your Cart is Empty</p>`;
        document.querySelector("#totalPrice span").textContent = "0.00";
        saveCart();
        return;
    }

    let y = addedItem.map((item) => {
        let price = item.price * item.count;
        return `
            <div class="col-6 px-4 cartProduct" data-id="${item.id}">
                <div class="card mb-3 cart-hover" >
                    <div class="row g-0">
                        <div class="col-md-3 d-flex align-items-center g-2">
                            <img src="${item.image}" class="img-fluid rounded-4 h-50" alt="...">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${item.title}</h5>
                                <p class="card-text">Category: ${item.category}</p>
                                <p class="card-text">Price: $${price}</p>
                                <div class="btns row">
                                    <div class="col-4 pe-0 count">
                                        <span class="d-inline-block border rounded-2 text-center cart-del">-</span>
                                        <span class="text-center count-value ">${item.count}</span>
                                        <span class="d-inline-block border rounded-2 text-center cart-add">+</span>
                                    </div>
                                    <div class="col-8">
                                        <button class="btn btn-danger remove-cart-btn" onClick="removeFromCart(${item.id})">Remove from Cart</button>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div>
        `;
    });
    productsCartdiv.innerHTML = y.join("");

    // حساب السعر الكلي وتحديثه في الصفحة
    let totalPriceElement = document.querySelector("#totalPrice span");
    if (totalPriceElement) {
        let total = addedItem.reduce((sum, item) => sum + (item.price * item.count), 0);
        totalPriceElement.textContent = `${total.toFixed(2)}`;
    }

    // Buttons + and -
    document.querySelectorAll(".cart-add").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = parseInt(e.target.closest(".cartProduct").dataset.id);
            let item = addedItem.find((p) => p.id === id);
            item.count += 1;
            if (item.count > 99) item.count = 99; // الحد الأقصى للكمية
            if (item.count > 1) {
            };
    
            saveCart();
            drawCartProducts();
        });
    });
    
    document.querySelectorAll(".cart-del").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = parseInt(e.target.closest(".cartProduct").dataset.id);
            let item = addedItem.find((p) => p.id === id);
            if (item.count > 1) {
                item.count -= 1;
            } else {
                addedItem = addedItem.filter((p) => p.id !== id);
            }
            saveCart();
            drawCartProducts();
        });
    });

}

function removeFromCart(id) {
    addedItem = addedItem.filter((item) => item.id !== id);

    saveCart();
    drawCartProducts()
}

drawCartProducts()
saveCart()

/////////////////////////////////

let productsFavdiv = document.querySelector("#favProducts");


let favItem = localStorage.getItem("favProducts")
    ? JSON.parse(localStorage.getItem("favProducts"))
    : [];

function saveFav() {
    localStorage.setItem("favProducts", JSON.stringify(favItem));
}


function drawFavProducts() {

    if (!favItem || favItem.length === 0) {
        productsFavdiv.innerHTML = `<p class="fs-4 text-center mt-5">There is no favorite products</p>`;
        productsFavdiv.style.justifyContent = "center";
        saveFav()
        return;
    }

    let y = favItem.map((item) => {
        return `
            <div class="card p-0 fav-card cart-hover" data-id="${item.id}">
                <div class="w-100 fav-img-div">
                    <img src="${item.image}" class="card-img-top fav-img" alt="...">
                </div>
                <div class="card-body product-desc text-center">
                    <h5 class="card-title fw-bold pb-2">${item.title}</h5>
                    <p class="card-text">Category: ${item.category}</p>
                    <div class="btns d-flex justify-content-center gap-3">
                        <i class="fa-solid fa-heart fs-5 text-danger lh-base cart-fav" onClick="removeFromFav(${item.id})" title="filled heart"></i>
                    </div>
                </div>
            </div>
        `;
    });
    productsFavdiv.innerHTML = y.join("");
}

function removeFromFav(id) {
    favItem = favItem.filter((item) => item.id !== id);
    saveFav();
    drawFavProducts();
}

drawFavProducts()
saveFav()
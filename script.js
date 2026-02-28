const products = [
    {
        id: 1,
        name: "Midnight Royale",
        category: "Pria",
        price: 1250000,
        image: "product1.png",
        description: "A bold masculine scent with woody and amber notes."
    },
    {
        id: 2,
        name: "Velvet Obsession",
        category: "Wanita",
        price: 1350000,
        image: "product2.png",
        description: "Soft floral elegance blended with warm vanilla."
    },
    {
        id: 3,
        name: "Noir Intense",
        category: "Pria",
        price: 1450000,
        image: "product3.png",
        description: "Deep spicy fragrance with long-lasting power."
    },
    {
        id: 4,
        name: "Golden Éclipse",
        category: "Unisex",
        price: 1500000,
        image: "product4.png",
        description: "Luxury citrus opening with smooth musk finish."
    },
    {
        id: 5,
        name: "Celeste Aura",
        category: "Wanita",
        price: 1300000,
        image: "product5.png",
        description: "Fresh floral breeze with sweet undertone."
    },
    {
        id: 6,
        name: "Imperial Mist",
        category: "Pria",
        price: 1400000,
        image: "product6.png",
        description: "Elegant woody scent with refined charm."
    },
    {
        id: 7,
        name: "Obsidian Flame",
        category: "Pria",
        price: 1550000,
        image: "product7.png",
        description: "Dark smoky aroma with seductive warmth."
    },
    {
        id: 8,
        name: "Rosé Reverie",
        category: "Wanita",
        price: 1380000,
        image: "product8.png",
        description: "Romantic rose blend with creamy vanilla."
    },
    {
        id: 9,
        name: "Platinum Veil",
        category: "Unisex",
        price: 1600000,
        image: "product9.png",
        description: "Fresh aquatic top with luxurious base."
    },
    {
        id: 10,
        name: "Eternal Dusk",
        category: "Unisex",
        price: 1700000,
        image: "product10.png",
        description: "Sophisticated blend of oud and amber."
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productContainer = document.getElementById("productContainer");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartTotal = document.getElementById("cartTotal");
const popup = document.getElementById("productPopup");

function displayProducts(items) {
    productContainer.innerHTML = "";
    items.forEach(product => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rp ${product.price.toLocaleString()}</p>
                <button onclick="showPopup(${product.id})">View</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="addToWishlist(${product.id})">🤍</button>
            </div>
        `;
    });
}

displayProducts(products);

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

document.getElementById("searchInput").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

function showPopup(id) {
    const product = products.find(p => p.id === id);
    document.getElementById("popupImage").src = product.image;
    document.getElementById("popupTitle").innerText = product.name;
    document.getElementById("popupDescription").innerText = product.description;
    document.getElementById("popupPrice").innerText = "Rp " + product.price.toLocaleString();
    popup.style.display = "flex";

    document.getElementById("popupCartBtn").onclick = () => addToCart(id);
}

document.getElementById("closePopup").onclick = function() {
    popup.style.display = "none";
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `
            <p>${item.name} - Rp ${item.price.toLocaleString()}</p>
        `;
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total.toLocaleString();
}

document.getElementById("cartBtn").onclick = function() {
    cartSidebar.classList.toggle("active");
}

function checkout() {
    alert("Thank you for shopping at AURELLE NOIR 💎");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    wishlistCount.innerText = wishlist.length;
}

document.getElementById("darkModeToggle").onclick = function() {
    document.body.classList.toggle("dark-mode");
}

function scrollToShop() {
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

updateCart();
wishlistCount.innerText = wishlist.length;
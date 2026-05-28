let cart = [];
let userLatitude = "";
let userLongitude = "";

// 1. Page load hote hi GPS location access mangna
window.onload = function() {
    getGPSLocation();
};

function getGPSLocation() {
    const msg = document.getElementById('location-msg');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                if(msg) {
                    msg.innerHTML = "📍 GPS: Location Captured!";
                    msg.style.color = "green";
                }
            },
            (error) => {
                if(msg) {
                    msg.innerHTML = "📍 GPS: Permission Denied (Manual address needed)";
                    msg.style.color = "orange";
                }
            }
        );
    }
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateUI();
    if(!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

function updateUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align:center; margin-top:20px; color:#888;">Cart khali hai!</p>';
        cartTotal.innerText = "₹0";
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        html += `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:5px; border-bottom:1px solid #eee;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price}</small>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})" style="background:#ff4444; color:white; border:none; padding:5px; border-radius:3px; cursor:pointer;">Remove</button>
            </div>
        `;
        total += item.price;
    });

    cartItemsDiv.innerHTML = html;
    cartTotal.innerText = "₹" + total;
}

// 2. Updated WhatsApp Function with Name, Address and GPS
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Pehle cart mein kuch add karein!");
        return;
    }

    // Inputs se data lena
    const userName = document.getElementById('user-name').value;
    const userAddress = document.getElementById('user-address').value;

    if (!userName || !userAddress) {
        alert("Kripya apna Naam aur Address bharein!");
        return;
    }

    const myNumber = "919664464919"; 
    let message = `*Naya Order Aaya Hai!* 🛒%0A%0A`;
    
    // User Details
    message += `👤 *Customer Name:* ${userName}%0A`;
    message += `🏠 *Address:* ${userAddress}%0A%0A`;
    
    message += `📦 *Products:*%0A`;
    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₹${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Grand Total: ₹${total}*%0A`;

    // 3. GPS Link add karna (Agar coordinate available hain)
    if (userLatitude && userLongitude) {
        message += `%0A📍 *Live Location Link:*%0Ahttps://www.google.com/maps?q=${userLatitude},${userLongitude}`;
    } else {
        message += `%0A📍 *Location:* GPS not available.`;
    }

    const url = `https://wa.me/${myNumber}?text=${message}`;
    window.open(url, '_blank');
}

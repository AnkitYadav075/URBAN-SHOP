let cart = [];

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
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price}</small>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        total += item.price;
    });

    cartItemsDiv.innerHTML = html;
    cartTotal.innerText = "₹" + total;
}

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Pehle cart mein kuch add karein!");
        return;
    }

    // Yahan apna WhatsApp number 91 ke saath likhein
    const myNumber = "919664464919"; 
    let message = "Namaste! Mujhe ye products order karne hain:%0A%0A";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* - ₹${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Grand Total: ₹${total}*%0A%0AKya ye products available hain?`;
    
    const url = `https://wa.me/${9664464919}?text=${message}`;
    window.open(url, '_blank');
}
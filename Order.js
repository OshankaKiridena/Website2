// Initialize cart and DOM elements
let cart = [];
const cartItems = document.getElementById('cart-items');
const grandTotalElement = document.getElementById('grand-total');
const buyNowBtn = document.getElementById('buy-now');
const saveFavBtn = document.getElementById('save-fav');
const loadFavBtn = document.getElementById('load-fav');

// Product data (could also be fetched from an API)
const products = {
    processors: [
        { id: 'cpu1', name: 'Intel Core i9-13900K', price: 550 },
        { id: 'cpu2', name: 'AMD Ryzen 9 7950X', price: 650 },
        { id: 'cpu3', name: 'Intel Core i7-13700K', price: 420 },
        { id: 'cpu4', name: 'AMD Ryzen 7 7700X', price: 350 },
        { id: 'cpu5', name: 'Intel Core i5-13600K', price: 320 },
        { id: 'cpu6', name: 'AMD Ryzen 5 7600X', price: 300 }
    ],
    gpus: [
        { id: 'gpu1', name: 'NVIDIA GeForce RTX 4090', price: 1599 },
        { id: 'gpu2', name: 'AMD Radeon RX 7900 XTX', price: 999 },
        { id: 'gpu3', name: 'NVIDIA GeForce RTX 4080', price: 1199 },
        { id: 'gpu4', name: 'AMD Radeon RX 7800 XT', price: 499 },
        { id: 'gpu5', name: 'NVIDIA GeForce RTX 4070 Ti', price: 799 },
        { id: 'gpu6', name: 'AMD Radeon RX 7700 XT', price: 449 }
    ],
    motherboards: [
        { id: 'mobo1', name: 'ASUS ROG Maximus Z790', price: 699 },
        { id: 'mobo2', name: 'MSI MPG X670E Carbon', price: 449 },
        { id: 'mobo3', name: 'Gigabyte AORUS Z790 Elite', price: 299 },
        { id: 'mobo4', name: 'ASRock X670E Taichi', price: 499 },
        { id: 'mobo5', name: 'MSI MAG B650 Tomahawk', price: 219 },
        { id: 'mobo6', name: 'ASUS TUF Gaming B550-Plus', price: 179 }
    ],
    memory: [
        { id: 'ram1', name: 'Corsair Dominator Platinum 32GB', price: 249 },
        { id: 'ram2', name: 'G.Skill Trident Z5 32GB', price: 199 },
        { id: 'ram3', name: 'Kingston Fury Beast 32GB', price: 159 },
        { id: 'ram4', name: 'Crucial Ballistix 32GB', price: 179 }
    ],
    storage: [
        { id: 'ssd1', name: 'Samsung 990 Pro 2TB', price: 179 },
        { id: 'ssd2', name: 'WD Black SN850X 2TB', price: 159 },
        { id: 'ssd3', name: 'Crucial P5 Plus 2TB', price: 149 },
        { id: 'ssd4', name: 'Seagate FireCuda 530 2TB', price: 169 },
        { id: 'ssd5', name: 'Kingston KC3000 2TB', price: 165 },
        { id: 'ssd6', name: 'Sabrent Rocket 4 Plus 2TB', price: 189 }
    ]
};

// Initialize quantity inputs and event listeners
function initializeProducts() {
    // Processors
    products.processors.forEach((processor, index) => {
        const input = document.querySelector(`#processors input[data-name="${processor.name}"]`);
        if (input) {
            input.addEventListener('change', () => updateCartItem(processor, input.value));
        }
    });

    // GPUs
    products.gpus.forEach((gpu, index) => {
        const input = document.querySelector(`#gpus input[data-name="${gpu.name}"]`);
        if (input) {
            input.addEventListener('change', () => updateCartItem(gpu, input.value));
        }
    });

    // Motherboards
    products.motherboards.forEach((mobo, index) => {
        const input = document.querySelector(`#motherboards input[data-name="${mobo.name}"]`);
        if (input) {
            input.addEventListener('change', () => updateCartItem(mobo, input.value));
        }
    });

    // Memory
    products.memory.forEach((ram, index) => {
        const input = document.querySelector(`#memory input[data-name="${ram.name}"]`);
        if (input) {
            input.addEventListener('change', () => updateCartItem(ram, input.value));
        }
    });

    // Storage
    products.storage.forEach((ssd, index) => {
        const input = document.querySelector(`#storage input[data-name="${ssd.name}"]`);
        if (input) {
            input.addEventListener('change', () => updateCartItem(ssd, input.value));
        }
    });
}

// Update cart when quantity changes
function updateCartItem(product, quantity) {
    quantity = parseInt(quantity);
    
    // Remove if exists
    cart = cart.filter(item => item.id !== product.id);
    
    // Add if quantity > 0
    if (quantity > 0) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: quantity
        });
    }
    
    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
    });

    grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
}

// Buy Now button click handler
buyNowBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some items before proceeding to checkout.');
        return;
    }
    
    // Save current cart to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
});

// Save Favorite button click handler
saveFavBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some items before saving as favorite.');
        return;
    }
    
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
    alert('Your current order has been saved as favorite!');
});

// Load Favorite button click handler
loadFavBtn.addEventListener('click', () => {
    const savedOrder = localStorage.getItem('favoriteOrder');
    
    if (savedOrder) {
        cart = JSON.parse(savedOrder);
        updateCartDisplay();
        
        // Update all quantity inputs to match loaded cart
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = 0; // Reset all to 0 first
        });
        
        cart.forEach(item => {
            const input = document.querySelector(`input[data-name="${item.name}"]`);
            if (input) {
                input.value = item.qty;
            }
        });
        
        alert('Favorite order loaded successfully!');
    } else {
        alert('No favorite order found! Please save an order first.');
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    
    // Check if coming back from checkout with a saved order
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
        cart = JSON.parse(savedOrder);
        updateCartDisplay();
        localStorage.removeItem('currentOrder');
    }
});
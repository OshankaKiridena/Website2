document.addEventListener('DOMContentLoaded', function() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');
    const confirmation = document.getElementById('confirmation');
    const deliveryDate = document.getElementById('delivery-date');
    const confirmEmail = document.getElementById('confirm-email');

    // Load order from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder')) || [];
    let total = 0;

    // Display order items
    order.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <p>${item.name} x ${item.qty}</p>
            <p>$${(item.price * item.qty).toFixed(2)}</p>
        `;
        orderItems.appendChild(itemElement);
        total += item.price * item.qty;
    });

    orderTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Form submission handler
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        // Validate other fields...

        if (!name || !email /* || other validations */) {
            alert('Please fill all required fields!');
            return;
        }

        // Calculate delivery date (3 business days from now)
        const delivery = new Date();
        delivery.setDate(delivery.getDate() + 3);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // Show confirmation
        checkoutForm.style.display = 'none';
        deliveryDate.textContent = delivery.toLocaleDateString('en-US', options);
        confirmEmail.textContent = email;
        confirmation.style.display = 'block';

        // Clear cart
        localStorage.removeItem('currentOrder');
    });
});
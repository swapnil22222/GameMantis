const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

fetch('http://localhost:5000/api/cart', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(res => res.json())
.then(cart => {
    const container = document.getElementById('cartItems');

    if (!cart || cart.items.length === 0) {
        container.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    cart.items.forEach(item => {
        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${item.game ? item.game.title : "Game not found"}</h3>
            <p>Price: ₹${item.game.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <hr>
        `;

        container.appendChild(div);
    });
});
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}


function checkout() {
    fetch('http://localhost:5000/api/cart/checkout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(data => {
        alert("Checkout successful");
        location.reload();
    });
}

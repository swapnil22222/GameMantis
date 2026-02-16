const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function loadGame() {
    const id = getGameIdFromURL();

    fetch(`http://localhost:5000/api/games/${id}`)
        .then(res => res.json())
        .then(game => {
            const container = document.getElementById("gameDetails");

            container.innerHTML = `
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <p>Genre: ${game.genre}</p>
                <p>Price: ₹${game.price}</p>
                <p>Stock: ${game.stock}</p>
                <button onclick="addToCart('${game._id}')">Add to Cart</button>
            `;
        });
}

function addToCart(id) {
    fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            gameId: id,
            quantity: 1
        })
    })
    .then(() => alert("Added to cart"));
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

loadGame();

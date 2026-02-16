const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");

if (isAdmin !== "true") {
    const adminLink = document.getElementById("adminLink");
    if (adminLink) {
        adminLink.style.display = "none";
    }
}

if (!token) {
    window.location.href = "login.html";
}

function showGames(games) {
    const container = document.getElementById('games');
    container.innerHTML = "";

    games.forEach(game => {
        const div = document.createElement('div');
        div.className = "game-card";

        div.innerHTML = `
            <h2>
                <a href="game.html?id=${game._id}">
                    <h2 class="game-title">${game.title}</h2>

                </a>
            </h2>
            <p>${game.description}</p>
            <p>Price: ₹${game.price}</p>
            <button onclick="addToCart('${game._id}')">Add to Cart</button>
            <hr>
        `;

        container.appendChild(div);
    });
}

function loadGames(page = 1) {
    fetch(`http://localhost:5000/api/games?page=${page}`)
        .then(res => res.json())
        .then(data => {
            showGames(data.games);
            renderPagination(data.totalPages, data.currentPage);
        });
}

function renderPagination(totalPages, currentPage) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) {
            btn.style.background = "black";
            btn.style.color = "white";
        }

        btn.onclick = () => loadGames(i);
        container.appendChild(btn);
    }
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

loadGames();

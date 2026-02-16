const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function addGame() {
    fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            genre: document.getElementById('genre').value,
            stock: document.getElementById('stock').value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Game added successfully");
        location.reload();
    });
}

function loadGames() {
    fetch('http://localhost:5000/api/games')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('games');
            container.innerHTML = "";

            data.forEach(game => {
                const div = document.createElement('div');

                div.innerHTML = `
                    <h3>${game.title}</h3>
                    <button onclick="deleteGame('${game._id}')">Delete</button>
                    <hr>
                `;

                container.appendChild(div);
            });
        });
}

function deleteGame(id) {
    fetch(`http://localhost:5000/api/games/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(() => {
        alert("Game deleted");
        loadGames();
    });
}

loadGames();


function register() {
    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAdmin", data.isAdmin);
            window.location.href = "index.html";
        }
    });
}

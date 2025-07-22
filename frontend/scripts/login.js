document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
        });

        if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = 'admin.html';
        } else {
        const error = await response.json();
        document.getElementById('error').textContent = error.error || 'Ошибка входа';
        }
    } catch (err) {
        document.getElementById('error').textContent = 'Ошибка сети или сервера';
    }
});
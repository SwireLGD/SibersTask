const API = 'http://localhost:8080';
let accessToken = localStorage.getItem('accessToken');

const fetch_users = async (url, options = {}) => {
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };
    options.credentials = 'include';

    let res = await fetch(API + url, options);

    if (res.status === 401 || res.status === 403) {
        const refreshed = await fetch(API + '/users/refresh', {
            method: 'GET',
            credentials: 'include',
        });

        if (refreshed.ok) {
            const data = await refreshed.json();
            accessToken = data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            return fetch_users(url, options);
        } else {
            logout();
        }
    }

    return res;
};

const load_users = async () => {
    const res = await fetch_users('/users');
    const users = await res.json();
    const tbody = document.querySelector('#user_table tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input value="${user.first_name || ''}" data-id="${user._id}" data-field="first_name"></td>
        <td><input value="${user.last_name || ''}" data-id="${user._id}" data-field="last_name"></td>
        <td>
            <select data-id="${user._id}" data-field="gender">
            <option value="male" ${user.gender === 'male' ? 'selected' : ''}>М</option>
            <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Ж</option>
            <option value="other" ${user.gender === 'other' ? 'selected' : ''}>Д</option>
            </select>
        </td>
        <td><input type="date" value="${user.birthdate?.slice(0,10) || ''}" data-id="${user._id}" data-field="birthdate"></td>
        <td>${user.username}</td>
        <td>
            ${user.role}
            <button onclick="toggleRole('${user._id}')">🔁</button>
        </td>
        <td>
            <button onclick="update_user('${user._id}')">💾</button>
            <button onclick="delete_user('${user._id}')">🗑️</button>
        </td>
        `;
        tbody.appendChild(row);
    });
};

async function toggleRole(id) {
    await fetch_users(`/users/toggle_role_change/${id}`, { method: 'PATCH' });
    await load_users();
};

document.getElementById('register_form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch_users('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        form.reset();
        await load_users();
    } else {
        const err = await res.json();
        alert(err.error || 'Ошибка регистрации');
    }
});

const update_user = async (id) => {
    const inputs = document.querySelectorAll(`[data-id="${id}"]`);
    const data = {};
    inputs.forEach(input => {
        data[input.dataset.field] = input.value;
    });

    await fetch_users(`/users/edit_user/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    await load_users();
};

const delete_user = async (id) => {
    if (confirm('Удалить пользователя?')) {
        const res = await fetch_users(`/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
            await load_users();
        } else {
            const err = await res.json();
            alert(err.error || 'Ошибка удаления');
        }
    }
};

const logout = () => {
    localStorage.removeItem('accessToken');
    fetch(API + '/users/logout', {
        method: 'DELETE',
        credentials: 'include',
    });
    window.location.href = 'login.html';
};

load_users();

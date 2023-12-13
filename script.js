document.getElementById('showLoginForm').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('showRegisterForm').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

function register() {
    var userName = document.getElementById('registerName').value;
    var userPass = document.getElementById('registerPass').value;

    fetch('https://6577297c197926adf62d853a.mockapi.io/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userName, pass: userPass}),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = 'Success: ' + JSON.stringify(data);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
}

function login() {
    var userName = document.getElementById('loginName').value;
    var userPass = document.getElementById('loginPass').value;

    fetch('https://6577297c197926adf62d853a.mockapi.io/users')
        .then(response => response.json())
        .then(users => {
            var user = users.find(u => u.name === userName && u.pass === userPass);
            if (user) {
                window.location.href = `todo.html?userid=${user.id}&username=${encodeURIComponent(user.name)}`;
            } else {
                document.getElementById('loginError').innerText = 'Неправильное имя пользователя или пароль.';
            }
        });
}
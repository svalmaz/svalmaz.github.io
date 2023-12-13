document.addEventListener('DOMContentLoaded', function() {
    var userId = new URLSearchParams(window.location.search).get('userid');
    var userName = decodeURIComponent(new URLSearchParams(window.location.search).get('username'));

    document.getElementById('userGreeting').textContent = `${userName} ToDo List`;
    loadTasks(userId);
});

function addTask() {
    var userId = new URLSearchParams(window.location.search).get('userid');
    var task = document.getElementById('newTask').value;

    fetch('https://6577297c197926adf62d853a.mockapi.io/users/'+userId+'/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: task,
            isdone: false,
            userid: userId
        })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('newTask').value = '';
        loadTasks(userId);
    });
}



function toggleTaskStatus(taskId, isDone) {
    var userId = new URLSearchParams(window.location.search).get('userid');

    fetch(`https://6577297c197926adf62d853a.mockapi.io/users/`+userId+`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isdone: isDone })
    })
    .then(() => loadTasks(userId));
}

function deleteTask(taskId) {
    var userId = new URLSearchParams(window.location.search).get('userid');

    fetch(`https://6577297c197926adf62d853a.mockapi.io/users/`+userId+`/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(() => loadTasks(userId));
}
function loadTasks(userId) {
    fetch(`https://6577297c197926adf62d853a.mockapi.io/users/`+userId+`/tasks`)
        .then(response => response.json())
        .then(tasks => {
            var taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                var li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" ${task.isdone ? 'checked' : ''} onchange="toggleTaskStatus(${task.id}, this.checked)">
                    <span class="${task.isdone ? 'completed' : ''}" onclick="editTask(${task.id}, this, '${task.task}')">${task.task}</span>
                    <button onclick="deleteTask(${task.id})">Remove</button>
                `;
                taskList.appendChild(li);
            });
        });
}

function editTask(taskId, spanElement, oldTask) {
    var newTask = prompt("Редактировать задачу:", oldTask);
    if (newTask !== null && newTask !== oldTask) {
        var userId = new URLSearchParams(window.location.search).get('userid');

        fetch(`https://6577297c197926adf62d853a.mockapi.io/users/`+userId+`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTask })
        })
        .then(() => loadTasks(userId));
    }
}
function filterTasks(filterType) {
    var userId = new URLSearchParams(window.location.search).get('userid');
    var query = filterType === 'all' ? '' : `isdone=${filterType === 'completed'}`;
    console.log(query);
    const url = new URL('https://6577297c197926adf62d853a.mockapi.io/users/'+userId+'/tasks?'+query);
   
   
    
    fetch(url)
        .then(response => response.json())
        .then(tasks => {
            var taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                var li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" ${task.isdone ? 'checked' : ''} onchange="toggleTaskStatus(${task.id}, this.checked)">
                    <span ${task.isdone ? 'class="completed"' : ''}>${task.task}</span>
                    <button onclick="deleteTask(${task.id})">Remove</button>
                `;
                taskList.appendChild(li);
            });
        });
        
}
function logout() {
    window.location.href = 'index.html'; 
}

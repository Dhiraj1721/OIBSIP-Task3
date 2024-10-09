const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const taskObj = {
            text: taskValue,
            completed: false
        };

        addTaskToDOM(taskObj);
        saveTask(taskObj);
        taskInput.value = ''; 
    } else {
        alert('Please enter a task.');
    }
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.innerText.replace('❌', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(taskObj) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskObj.text}
        <span class="delete-btn">❌</span>
    `;
    taskList.appendChild(li);

    if (taskObj.completed) {
        li.classList.add('completed');
    }
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });
}
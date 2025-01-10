function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value;

    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;
    li.onclick = () => li.classList.toggle('completed');
    li.ondblclick = () => editTask(li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.onclick = () => taskList.removeChild(li);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => tasks.push(li.firstChild.textContent));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = () => li.classList.toggle('completed');
        li.ondblclick = () => editTask(li);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.onclick = () => taskList.removeChild(li);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function editTask(li) {
    const newText = prompt('Editar tarea:', li.firstChild.textContent);
    if (newText !== null) {
        li.firstChild.textContent = newText;
    }
}

function resetTasks() {
    document.getElementById('taskList').innerHTML = '';
}
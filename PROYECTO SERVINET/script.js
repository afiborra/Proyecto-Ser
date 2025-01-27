document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const entradaTarea = document.getElementById('taskInput');
    const entradaHora = document.getElementById('taskTime');
    const listaTarea = document.getElementById('taskList');
    const textoTarea = entradaTarea.value;
    const horaTarea = entradaHora.value;

    if (textoTarea === '' || horaTarea === '') return;

    const li = document.createElement('li');
    li.textContent = `${textoTarea} - ${horaTarea}`;                                           //Apoypo en la IA 
    li.onclick = () => li.classList.toggle('completed');  
    li.ondblclick = () => editarText(li);

    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Borrar';
    botonBorrar.onclick = () => listaTarea.removeChild(li);
    li.appendChild(botonBorrar);

    listaTarea.appendChild(li);
    entradaTarea.value = '';
    entradaHora.value = '';

    ordenarTareas();
}

function ordenarTareas() {                                                                     //apoyo en la IA
    const listaTarea = document.getElementById('taskList');
    const tareas = Array.from(listaTarea.getElementsByTagName('li'));

    tareas.sort((a, b) => {
        const horaA = a.textContent.split(' - ')[1];
        const horaB = b.textContent.split(' - ')[1];
        return horaA.localeCompare(horaB);
    });

    listaTarea.innerHTML = '';
    tareas.forEach(tarea => listaTarea.appendChild(tarea));
}

function saveTasks() {
    const tareas = [];
    document.querySelectorAll('#taskList li').forEach(li => tareas.push(li.firstChild.textContent));   //Apoyo en IA 
    localStorage.setItem('tasks', JSON.stringify(tareas));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const listaTareas = document.getElementById('taskList');
    listaTareas.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = () => li.classList.toggle('completed');
        li.ondblclick = () => editarText(li);

        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.onclick = () => listaTareas.removeChild(li);
        li.appendChild(botonBorrar);

        listaTareas.appendChild(li);
    });
    ordenarTareas();
}

function editarText(li) {
    const nuevoText = prompt('Editar tarea:', li.firstChild.textContent);
    if (nuevoText !== null) {
        li.firstChild.textContent = nuevoText;
    }
}

function resetTasks() {
    document.getElementById('taskList').innerHTML = '';
}









//Para concectarlo al calendario. MIRAR para mas adelante.

/* Autenticación con la API de Google Calendar
gapi.load('client:auth2', () => {
    gapi.auth2.init({client_id: 'TU_CLIENT_ID'});
});

function addEventToCalendar(task, time) {
    gapi.client.load('calendar', 'v3', () => {
        const event = {
            'summary': task,
            'start': {
                'dateTime': time,
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': time,
                'timeZone': 'America/Los_Angeles'
            }
        };

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(event => {
            console.log('Evento creado: ' + event.htmlLink);
        });
    });
}*/

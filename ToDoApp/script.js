document.addEventListener('DOMContentLoaded', loadTasks);

const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const priorityInput = document.getElementById('taskPriority');
const dateInput = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const editIndexInput = document.getElementById('editIndex');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => renderTask(task, index));
}

function addOrUpdateTask() {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const priority = priorityInput.value;
    const date = dateInput.value;
    const editIndex = parseInt(editIndexInput.value);

    if (title === '') {
        alert("Please enter a task title!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    const taskObj = {
        title: title,
        desc: desc,
        priority: priority,
        date: date,
        completed: false
    };

    if (editIndex === -1) {
        tasks.push(taskObj);
    } else {
        taskObj.completed = tasks[editIndex].completed;
        tasks[editIndex] = taskObj;
        
        addBtn.innerText = "Add Task";
        addBtn.classList.remove("edit-mode");
        editIndexInput.value = "-1";
    }

    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    loadTasks();
    clearInputs();
}

function renderTask(task, index) {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
        <div class="task-header">
            <span class="task-title">${task.title}</span>
            <span class="badge priority-${task.priority}">${task.priority}</span>
        </div>
        <div class="task-desc">${task.desc}</div>
        <div class="task-details">
            <span><i class="far fa-calendar-alt"></i> ${task.date || 'No Date'}</span>
        </div>
        <div class="task-actions">
            <button class="icon-btn check-btn" onclick="toggleComplete(${index})" title="Complete">
                <i class="fas fa-check-circle"></i>
            </button>
            <button class="icon-btn edit-btn" onclick="editTask(${index})" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn delete-btn" onclick="deleteTask(${index})" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    taskList.appendChild(li);
}

function deleteTask(index) {
    if(confirm("Are you sure you want to delete this task?")) {
        const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('myTasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    const task = tasks[index];

    titleInput.value = task.title;
    descInput.value = task.desc;
    priorityInput.value = task.priority;
    dateInput.value = task.date;
    
    addBtn.innerText = "Update Task";
    addBtn.classList.add("edit-mode");
    editIndexInput.value = index;
    
    window.scrollTo(0, 0);
}

function clearInputs() {
    titleInput.value = '';
    descInput.value = '';
    dateInput.value = '';
    priorityInput.value = 'Medium';
}
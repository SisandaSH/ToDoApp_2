// DOM.js

import { fetchTasks, addTask, updateTask, toggleTaskCompletion, deleteTask } from './taskManager.js';


// Render tasks to the displayBox
async function renderTasks() {
    const displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = '';

    const tasks = await fetchTasks();

    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
        taskDiv.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
            <div class="task-buttons">
                <button class="edit-btn" data-id="${task.id}" ${task.completed ? 'disabled' : ''}>Edit</button>
                <button class="complete-btn" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        
        displayBox.appendChild(taskDiv);
    });

    document.querySelectorAll('.edit-btn').forEach(button =>
        button.addEventListener('click', (e) => handleUpdateTask(e.target.dataset.id))
    );
    document.querySelectorAll('.complete-btn').forEach(button =>
        button.addEventListener('click', (e) => handleToggleComplete(e.target.dataset.id))
    );
    document.querySelectorAll('.delete-btn').forEach(button =>
        button.addEventListener('click', (e) => handleDeleteTask(e.target.dataset.id))
    );
}

// Add task function
async function handleAddTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        await addTask(taskText);
        input.value = '';
        renderTasks();
    }
}

// Update task function
async function handleUpdateTask(id) {
    const newTaskText = prompt("Update your task:");
    if (newTaskText !== null && newTaskText.trim() !== "") {
        await updateTask(id, newTaskText.trim());
        renderTasks();
    }
}

// Toggle complete function
async function handleToggleComplete(id) {
    await toggleTaskCompletion(id);
    renderTasks();
}

// Delete task function
async function handleDeleteTask(id) {
    await deleteTask(id);
    renderTasks();
}

// Initialize app
function initializeApp() {
    renderTasks();
    document.getElementById('addButton').addEventListener('click', handleAddTask);
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
}


initializeApp();

// DOM.js

import { tasks, addTaskToList, deleteTaskFromList, updateTaskInList, toggleTaskCompletion, loadTasks } from './taskManager.js';
// DOM.js

//url to connet to the backend
const BASE_URL = 'http://localhost:7000';

// Render tasks to the displayBox
async function renderTasks() {
    const displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = '';

    const response = await fetch(`${BASE_URL}/check-connection`);
    const tasks = await response.json();

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

    // Add event listeners for dynamically created buttons
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

// Add task handler
async function handleAddTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        await fetch(`${BASE_URL}/add-description`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: taskText, completed: false })
        });
        input.value = '';
        renderTasks();
    }
}

// Update task handler
async function handleUpdateTask(id) {
    const newTaskText = prompt("Update your task:");
    if (newTaskText !== null && newTaskText.trim() !== "") {
        await fetch(`${BASE_URL}/update-description`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, description: newTaskText.trim(), completed:tasks.completed })
        });
        renderTasks();
    }
}

// Toggle complete handler
async function handleToggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newCompletionStatus = !task.completed;
        await fetch(`${BASE_URL}/update-description`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, description: task.description, completed: newCompletionStatus })
        });
        renderTasks();
    }
}



// Delete task handler
async function handleDeleteTask(id) {
    await fetch(`${BASE_URL}/delete-description/${id}`, { method: 'DELETE' });
    renderTasks();
}

// Initialize app and load tasks on startup
function initializeApp() {
    renderTasks(); // Load tasks from the backend
    document.getElementById('addButton').addEventListener('click', handleAddTask);
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
}

// Start the app
initializeApp();

// DOM.js

import { tasks, addTaskToList, deleteTaskFromList, updateTaskInList, toggleTaskCompletion, loadTasks } from './taskManager.js';

// Render tasks to the displayBox
function renderTasks() {
    const displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
        taskDiv.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="task-buttons">
                <button class="edit-btn" data-index="${index}" ${task.completed ? 'disabled' : ''}>Edit</button>
                <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        
        displayBox.appendChild(taskDiv);
    });

    // Add event listeners for dynamically created buttons
    document.querySelectorAll('.edit-btn').forEach(button =>
        button.addEventListener('click', (e) => handleUpdateTask(e.target.dataset.index))
    );
    document.querySelectorAll('.complete-btn').forEach(button =>
        button.addEventListener('click', (e) => handleToggleComplete(e.target.dataset.index))
    );
    document.querySelectorAll('.delete-btn').forEach(button =>
        button.addEventListener('click', (e) => handleDeleteTask(e.target.dataset.index))
    );
}

// Add task handler
function handleAddTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        addTaskToList(taskText);
        input.value = '';
        renderTasks();
    }
}

// Update task handler
function handleUpdateTask(index) {
    const task = tasks[index];
    if (!task.completed) {
        const newTaskText = prompt("Update your task:", task.text);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            updateTaskInList(index, newTaskText.trim());
            renderTasks();
        }
    } else {
        alert("Completed tasks cannot be edited.");
    }
}

// Toggle complete handler
function handleToggleComplete(index) {
    toggleTaskCompletion(index);
    renderTasks();
}

// Delete task handler
function handleDeleteTask(index) {
    deleteTaskFromList(index);
    renderTasks();
}

// Initialize app and load tasks on startup
function initializeApp() {
    loadTasks();
    renderTasks();
    
    document.getElementById('addButton').addEventListener('click', handleAddTask);
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
}

// Start the app
initializeApp();

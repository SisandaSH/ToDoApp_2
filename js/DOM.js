// todo.test.js
import '@testing-library/jest-dom/extend-expect';
import { addTask } from './script'; 


//created an addtask function to put values on the textbox
function addTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
   
    if (taskText) {
        tasks.push(taskText);
        input.value = ''; // Clear input
       renderTasks();
   }
}

function renderTasks() {
    const displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
        taskDiv.innerHTML = `
            <span>${task}</span>
            <div>         
                <button onclick="updateTask(${index})">Edit</button>         
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        
        displayBox.appendChild(taskDiv);
    });
}


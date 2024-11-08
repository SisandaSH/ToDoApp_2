// taskManager.js

let tasks = [];

// Add a new task to the list and save it
function addTaskToList(taskText) {
    tasks.push({
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    });
    saveTasks();
}

// Delete a task from the list by index and save
function deleteTaskFromList(index) {
    tasks.splice(index, 1);
    saveTasks();
}

// Update task text by index if the task is not completed
function updateTaskInList(index, newTaskText) {
    if (!tasks[index].completed) {
        tasks[index].text = newTaskText;
        saveTasks();
    } else {
        alert("Completed tasks cannot be edited.");
    }
}

// Toggle completion status of a task by index and save
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('todos');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Export functions to be used in DOM.js
export { tasks, addTaskToList, deleteTaskFromList, updateTaskInList, toggleTaskCompletion, loadTasks };

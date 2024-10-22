//made tasks list a an array
let tasks = [];



function pushToArray(task){
    tasks.push(task)
}










console.log(tasks)

//function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

//function to update

function updateTask(index) {
    const newTaskText = prompt("Update your task:", tasks[index]);
    
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index] = newTaskText.trim();
        renderTasks();
    }
}

//function to update, edit





    



export {tasks, deleteTask, updateTask, pushToArray}


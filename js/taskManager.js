const serverURL = "http://localhost:8000";

// Fetch tasks from the backend
async function fetchTasks() {
  const response = await fetch(`${serverURL}/check-connection`);
  return response.json();
}

// Add a new task to the backend
async function addTask(description) {
  await fetch(`${serverURL}/add-description`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
}

// Update a task description in the backend
async function updateTask(id, description) {
  const tasks = await fetchTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    await fetch(`${serverURL}/update-description`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, description, completed: task.completed }),
    });
  }
}

// Toggle task completion in the backend
async function toggleTaskCompletion(id) {
  const tasks = await fetchTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    await fetch(`${serverURL}/update-description`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        description: task.description,
        completed: !task.completed,
      }),
    });
  }
}

// Delete a task from the backend
async function deleteTask(id) {
  await fetch(`${serverURL}/delete-description/${id}`, { method: "DELETE" });
}

export { fetchTasks, addTask, updateTask, toggleTaskCompletion, deleteTask };

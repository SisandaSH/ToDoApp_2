import pool from "./db.js";


// Check if the database connection works
export const checkConnection = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM tasks");
    res.json(results.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.send("Database connection failed");
  }
};


// Insert a new task into the tasks table
export const addTask = async (req, res) => {
  const { description, completed = false } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks(description,completed) VALUES($1, $2) RETURNING *",
      [description, completed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error sending data:", err);
    res.status(500).send("Error adding task");
  }
};


// Update an existing task's description
export const updateTask = async (req, res) => {
  const { id, description, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *",
      [description, completed, id]
    );

    if (result.rowCount === 0) {
      res.status(404).send("Task not found");
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Error updating data");
  }
};


// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Task not found");
    } else {
      res.send("Task deleted");
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send("Error deleting data");
  }
};

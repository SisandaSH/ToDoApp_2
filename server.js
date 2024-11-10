import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from "cors"

const { Pool } = pkg;
const app = express();
app.use(cors())
app.use(bodyParser.json());

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'todo'
});

// Check if the database connection works
app.get('/check-connection', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tasks');
        res.json(results.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.send('Database connection failed');
    }
});

// Insert a new task into the tasks table
app.post('/add-description', async (req, res) => {
    const { description } = req.body;
    const {completed} = req.body
    try {
        const result = await pool.query(
            'INSERT INTO tasks(description,completed) VALUES($1, $2) RETURNING *',
            [description, completed]
        );
        res.json(result.rows[0]); // Send back the newly created task
    } catch (err) {
        console.error('Error sending data:', err);
        res.status(500).send('Error adding task');
    }
});


// Update an existing task's description
app.put('/update-description', async (req, res) => {
    const { id, description, completed } = req.body; // Get both description and completed

    try {
        const result = await pool.query(
            'UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *',
            [description, completed, id] // Update description and completed status
        );

        if (result.rowCount === 0) {
            res.status(404).send('Task not found');
        } else {
            res.json(result.rows[0]); // Return the updated task
        }
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Error updating data');
    }
});


// Delete a task
app.delete('/delete-description/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send('Task not found');
        } else {
            res.send('Task deleted');
        }
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).send('Error deleting data');
    }
});


const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

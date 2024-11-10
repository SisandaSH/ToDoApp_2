import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import path from 'path';

const { Pool } = pkg;
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database configuration
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'todoapp'
});

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to retrieve all tasks from the database
app.get('/check-connection', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tasks');
        res.json(results.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// API route to add a new task to the tasks table
app.post('/add-description', async (req, res) => {
    const { description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks(description) VALUES($1) RETURNING *',
            [description]
        );
        res.json(result.rows[0]); // Send back the newly created task
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Error adding task' });
    }
});

// API route to update an existing task's description
app.put('/update-description', async (req, res) => {
    const { id, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET description = $1 WHERE id = $2 RETURNING *',
            [description, id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(result.rows[0]); // Return the updated task
        }
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Error updating task' });
    }
});

// API route to delete a task by ID
app.delete('/delete-description/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted' });
        }
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

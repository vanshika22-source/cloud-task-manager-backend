const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS MUST BE FIRST
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let tasks = [];

// POST – create task
app.post('/tasks', (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// GET – fetch tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE – remove task
app.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// PUT – mark task completed
app.put('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    res.json(task);
});


const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./connect');
const Task = require("./models/Task");

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});


// Get all tasks
app.get("/api/v1/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Create a new task
app.post("/api/v1/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get a single task
app.get("/api/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Update a task
app.patch("/api/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Delete a task
app.delete("/api/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Task has been deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Connect DB and Start Server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || 3000, () =>
            console.log("Server started...")
        );
    } catch (err) {
        console.log(err);
    }
};

start();

import Tasks from '../models/tasks.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Tasks.find();
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Tasks({ title, description, date });
    const saveTask = await newTask.save();
    res.json(newTask);
}

export const getTask = async (req, res) => {
    const task = await Tasks.findById(req.params.id);
    res.json(task);
}

export const updateTask = async (req, res) => {
    const { title, description } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {
    await Tasks.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
}
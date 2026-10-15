import Tasks from '../models/tasks.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Tasks.find({
        user: req.user.id
    }).populate("user");
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Tasks({ title, description, date, user: req.user.id });
    const saveTask = await newTask.save();
    res.json(newTask);
}

export const getTask = async (req, res) => {
    const task = await Tasks.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
}

export const updateTask = async (req, res) => {
    const { title, description } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task update not found" });
    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task delete not found" });
    return res.sendStatus(204).json();
}
import TaskSchema from '../models/TaskModel.js'

export const createTaskController = async (req, res) => {
    try {
        const doc = new TaskSchema({
            user: req.userId,
            project: req.params.id,
            pos: req.body.pos
        });

        const task = await doc.save();

        const { project, user, childrenTasks, ...responseTask } = task._doc;

        res.json(responseTask);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export const getTaskController = async (req, res) => {
    try {
        const filters = { user: req.userId, project: req.params.id, parentTask: { $exists: false } };

        if (req.query.status) {
            if (req.query.status === 'pending') {
                filters.status = 'pending';
            } else if (req.query.status === 'finished') {
                filters.status = 'finished';
            }
        }

        const tasks = await TaskSchema.find(filters).sort({ pos: 1 }).select('-childrenTasks -project -user');

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something going wrong' });
    }
};


export const deleteTaskController = async (req, res) => {
    try {
        const task = await TaskSchema.findOneAndDelete({ _id: req.params.id });
    
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
    
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cannot delete project' });
    }
}

export const updateTaskController = async (req, res) => {
    try {
        let updatedTasks;

        if (req.body.attributes) {
            const updates = req.body.attributes;
            updatedTasks = await Promise.all(updates.map(async ({ taskId, pos }) => {
                const updatedTask = await TaskSchema.findByIdAndUpdate(taskId, { pos }, { new: true });

                if (!updatedTask) {
                    return res.status(404).json({ error: 'Task not found' });
                }
            
                return updatedTask;
            }));
        } else {
            const taskId = req.params.id;
            const updateData = req.body;

            const updatedProject = await TaskSchema.findByIdAndUpdate(taskId, updateData, { new: true });

            if (!updatedProject) {
                return res.status(404).json({ error: 'Task not found' });
            }

            updatedTasks = [updatedProject];
        }

        res.json(updatedTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createSubTaskController = async (req, res) => {
    try {
        const newSubTask = new TaskSchema({
            project: req.params.projectId, 
            user: req.userId,
            parentTask: req.params.parentTaskId 
        });

        const subTask = await newSubTask.save();

        const parentTask = await TaskSchema.findById(req.params.parentTaskId);

        if (!parentTask) {
            return res.status(404).json({ error: 'Parent task not found' });
        }

        parentTask.childrenTasks.push(subTask._id);
        await parentTask.save();

        res.json(subTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something going wrong' });
    }
};

export const getSubTasksController = async (req, res) => {
    try {
        const parentTask = await TaskSchema.findById(req.params.parentTaskId);

        if (!parentTask) {
            return res.status(404).json({ error: 'Parent task not found' });
        }

        const subTaskIds = parentTask.childrenTasks;

        const subTasks = await TaskSchema.find({ _id: { $in: subTaskIds } });

        res.json(subTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
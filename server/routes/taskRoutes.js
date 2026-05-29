const express = require('express');

const Task = require('../models/Task');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {

  try {

    const { title, description, deadline } = req.body;

    const task = new Task({
      user: req.user.id,
      title,
      description,
      deadline
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });

  } catch (error) {

    res.status(500).json(error);

  }

});
router.get('/', authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user.id
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json(error);

  }
  // UPDATE TASK

});
router.put('/update/:id', authMiddleware, async (req, res) => {

  try {

    const { title, description, deadline, status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      updatedTask
    });

  } catch (error) {

    res.status(500).json(error);

  }

});
// DELETE TASK
router.delete('/delete/:id', authMiddleware, async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: 'Task deleted successfully'
    });

  } catch (error) {

    res.status(500).json(error);

  }

});
module.exports = router;
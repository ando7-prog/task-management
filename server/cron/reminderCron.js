// finds tasks due within 1 hour
// sends email
// marks reminder as sent


const cron = require('node-cron');

const Task = require('../models/Task');

const User = require('../models/User');

const sendReminderEmail = require('../services/emailService');

cron.schedule('* * * * *', async () => {

  console.log('Checking task reminders...');

  const now = new Date();

  const nextHour = new Date(
    now.getTime() + 60 * 60 * 1000
  );

  try {

    const tasks = await Task.find({
      deadline: {
        $gte: now,
        $lte: nextHour
      },
      reminderSent: false
    });

    for (const task of tasks) {

      const user = await User.findById(task.user);

      if (user) {

        await sendReminderEmail(
          user.email,
          task.title
        );

        task.reminderSent = true;

        await task.save();

        console.log(
          `Reminder sent for task: ${task.title}`
        );

      }

    }

  } catch (error) {

    console.log(error);

  }

});
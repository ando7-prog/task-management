const nodemailer = require('nodemailer');

const sendReminderEmail = async (to, taskTitle) => {

  try {

    const transporter = nodemailer.createTransport({

      service: 'gmail',

      auth: {
        user: 'andoboudwin077@gmail.com',
        pass: 'oznj dgbx yell gorw'
      }

    });

    const mailOptions = {

      from: 'andoboudwin077@gmail.com',

      to,

      subject: 'Task Reminder',

      text: `Reminder: Your task "${taskTitle}" deadline is approaching.`

    };

    await transporter.sendMail(mailOptions);

    console.log('Reminder email sent');

  } catch (error) {

    console.log(error);

  }

};

module.exports = sendReminderEmail;
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
require('./cron/reminderCron');
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Backend Running');
});
app.get('/protected', authMiddleware, (req, res) => {

  res.json({
    message: 'Protected route accessed',
    user: req.user
  });

});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


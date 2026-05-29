import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    createTask,
    getTasks,
    deleteTask,
    updateTask
} from '../services/taskService';

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);      // Stores the task currently being edited.
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: ''
    });

    const fetchTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateTask(editingId, formData);

                alert('Task updated');

                setEditingId(null);

            } else {

                await createTask(formData);

                alert('Task created');

            }

            setFormData({
                title: '',
                description: '',
                deadline: ''
            });

            fetchTasks();

        } catch (error) {

            alert('Operation failed');

        }

    };

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            alert('Task deleted');

            fetchTasks();

        } catch (error) {

            alert('Delete failed');

        }

    };
    const handleEdit = (task) => {

        setFormData({
            title: task.title,
            description: task.description,
            deadline: task.deadline.split('T')[0]
        });

        setEditingId(task._id);

    };
    const handleLogout = () => {

        localStorage.removeItem('token');

        navigate('/');

    };
    return (

        <div className="container">

            <div className="dashboard-header">

                <h2 className="title">
                    Dashboard
                </h2>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <form
                className="task-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="description"
                    placeholder="Task description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    {
                        editingId ? 'Update Task' : 'Add Task'
                    }
                </button>

            </form>

            <hr />

            <h3>Your Tasks</h3>

            {

                tasks.map((task) => (

                    <div
                        key={task._id}
                        className="task-card"
                    >

                        <h4>{task.title}</h4>

                        <p>{task.description}</p>

                        <p>Status: {task.status}</p>

                        <p>
                            Deadline:
                            {
                                new Date(task.deadline).toLocaleDateString()
                            }
                        </p>

                        <CountdownTimer deadline={task.deadline} />

                        <button
                            onClick={() => handleEdit(task)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(task._id)}
                        >
                            Delete
                        </button>

                        <hr />

                    </div>

                ))

            }

        </div>

    );

}

export default Dashboard;
function CountdownTimer({ deadline }) {

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {

        const interval = setInterval(() => {

            const now = new Date().getTime();

            const taskDeadline = new Date(deadline).getTime();

            const distance = taskDeadline - now;

            if (distance <= 0) {

                setTimeLeft('Task Deadline Reached');

                alert('⏰ Task deadline reached!');

                clearInterval(interval);

                return;
            }
            const days = Math.floor(
                distance / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60))
                / (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (1000 * 60))
                / 1000
            );

            setTimeLeft(
                `${days}d ${hours}h ${minutes}m ${seconds}s`
            );

        }, 1000);

        return () => clearInterval(interval);

    }, [deadline]);

    return (

        <p>
            Time Left: {timeLeft}
        </p>

    );

}
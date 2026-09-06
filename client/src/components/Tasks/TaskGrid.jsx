import { useEffect, useState } from 'react';
import axios from 'axios';

import './TaskGrid.css';
import TaskCard from './TaskCard';

export default function TaskGrid({ onViewTask, projectId }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');

                const url = projectId
                    ? `http://localhost:4000/api/tasks?projectId=${projectId}`
                    : 'http://localhost:4000/api/tasks';

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [projectId]);

    const todoTasks = tasks.filter(
        task => task.status === 'To Do'
    );

    const inProgressTasks = tasks.filter(
        task => task.status === 'In Progress'
    );

    const completedTasks = tasks.filter(
        task => task.status === 'Completed'
    );

    return (
        <section className="task-grid">

            {/* =========================
                TO DO
            ========================= */}
            <div className="task-column">
                <h2 className="task-column__title">
                    To Do
                </h2>

                <div className="task-column__cards">
                    {todoTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />
                    ))}
                </div>
            </div>

            {/* =========================
                IN PROGRESS
            ========================= */}
            <div className="task-column">
                <h2 className="task-column__title">
                    In Progress
                </h2>

                <div className="task-column__cards">
                    {inProgressTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />
                    ))}
                </div>
            </div>

            {/* =========================
                COMPLETED
            ========================= */}
            <div className="task-column">
                <h2 className="task-column__title">
                    Completed
                </h2>

                <div className="task-column__cards">
                    {completedTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}
import { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ task, onClose }) {
    const [title, setTitle] = useState(task?.title ?? '');
    const [status, setStatus] = useState(task?.status ?? 'To Do'); 
    const [assignee, setAssignee] = useState(task?.assignee ?? '');
    const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
    const [description, setDescription] = useState(task?.description ?? '');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskData = {
            title,
            status,
            assignee,
            dueDate,
            description
        };

        try {
            if (task && task._id) {
                await axios.put(`http://localhost:4000/api/tasks/${task._id}`, taskData);
            } else {
                await axios.post('http://localhost:4000/api/tasks', taskData);
            }
            
            onClose(); 
            window.location.reload(); 
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task. Is your backend server running?");
        }
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >
            {/* =========================
                TASK TITLE
            ========================= */}
            <div className="task-form__field">
                <label htmlFor="task-title">Task Title</label>
                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </div>

            {/* =========================
                STATUS + ASSIGNEE
            ========================= */}
            <div className="task-form__row">
                {/* STATUS */}
                <div className="task-form__field">
                    <label htmlFor="task-status">Status</label>
                    <div className="task-select-wrapper">
                        <select
                            id="task-status"
                            className={`task-form__select task-form__status status-${status
                                .toLowerCase()
                                .replace(/\s+/g, '-')}`}
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <span className="task-select-arrow">
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                {/* ASSIGNEE */}
                <div className="task-form__field">
                    <label htmlFor="task-assignee">Assignee</label>
                    <div className="task-select-wrapper">
                        <select
                            id="task-assignee"
                            className="task-form__select task-form__assignee"
                            value={assignee}
                            onChange={(event) => setAssignee(event.target.value)}
                            required
                        >
                            <option value="">Select member</option>
                            <option value="Yomith">Yomith</option>
                            <option value="Yasith">Yasith</option>
                            <option value="Sahseena">Sahseena</option>
                            <option value="Naduntha">Naduntha</option>
                            <option value="Samadhi">Samadhi</option>
                            <option value="Dulina">Dulina</option>
                            <option value="Zahin">Zahin</option>
                        </select>
                        <span className="task-select-arrow">
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>
                </div>
            </div>

            {/* =========================
                DUE DATE
            ========================= */}
            <div className="task-form__field">
                <label htmlFor="task-date">Due Date</label>
                <input
                    id="task-date"
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    required
                />
            </div>

            {/* =========================
                DESCRIPTION
            ========================= */}
            <div className="task-form__field">
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            {/* =========================
                ACTIONS
            ========================= */}
            <div className="task-form__actions">
                <button
                    type="submit"
                    className="task-form__create"
                >
                    {task ? 'Save Changes' : 'Create'}
                </button>
                <button
                    type="button"
                    className="task-form__cancel"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
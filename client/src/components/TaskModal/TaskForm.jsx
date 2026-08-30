import { useState } from 'react';

export default function TaskForm({ task, onClose }) {

    const [title, setTitle] = useState(task?.title ?? '');
    const [status, setStatus] = useState(task?.status ?? 'Completed');
    const [assignee, setAssignee] = useState(task?.assignee ?? '');
    const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
    const [description, setDescription] = useState(task?.description ?? '');


    const handleSubmit = (event) => {

        event.preventDefault();

        const taskData = {
            title,
            status,
            assignee,
            dueDate,
            description
        };

        console.log(taskData);

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

                <label htmlFor="task-title">
                    Task Title
                </label>

                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

            </div>


            {/* =========================
                STATUS + ASSIGNEE
            ========================= */}

            <div className="task-form__row">

                {/* STATUS */}

                <div className="task-form__field">

                    <label htmlFor="task-status">
                        Status
                    </label>

                    <div className="task-select-wrapper">

                        <select
                            id="task-status"
                            className={`task-form__select task-form__status status-${status
                                .toLowerCase()
                                .replace(/\s+/g, '-')}`}
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="To Do">
                                To Do
                            </option>

                        </select>

                        <span className="task-select-arrow">
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>

                    </div>

                </div>


                {/* ASSIGNEE */}

                <div className="task-form__field">

                    <label htmlFor="task-assignee">
                        Assignee
                    </label>

                    <div className="task-select-wrapper">

                        <select
                            id="task-assignee"
                            className="task-form__select task-form__assignee"
                            value={assignee}
                            onChange={(event) => setAssignee(event.target.value)}
                        >

                            <option value="">
                                Select member
                            </option>

                            <option value="Yomith">
                                Yomith
                            </option>

                            <option value="Yasith">
                                Yasith
                            </option>

                            <option value="Sahseena">
                                Sahseena
                            </option>

                            <option value="Naduntha">
                                Naduntha
                            </option>

                            <option value="Samadhi">
                                Samadhi
                            </option>

                            <option value="Dulina">
                                Dulina
                            </option>

                            <option value="Zahin">
                                Zahin
                            </option>

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

                <label htmlFor="task-date">
                    Due Date
                </label>

                <input
                    id="task-date"
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />

            </div>


            {/* =========================
                DESCRIPTION
            ========================= */}

            <div className="task-form__field">

                <label htmlFor="task-description">
                    Description
                </label>

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
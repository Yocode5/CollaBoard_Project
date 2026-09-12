import { useEffect, useState } from 'react';
import axios from 'axios';

import { getProject } from '../../api/projectApi';


const getInitialFormData = (task, projectId) => {

    // Editing an existing task
    if (task) {
        return {
            title: task.title ?? '',
            status: task.status ?? 'To Do',
            assignee: task.assignee ?? '',
            dueDate: task.dueDate ?? '',
            description: task.description ?? '',
            version: task.version ?? 0
        };
    }

    // Creating a new task
    const draftKey = projectId
        ? `collaboard-task-draft-${projectId}`
        : 'collaboard-task-draft';

    const savedDraft = localStorage.getItem(draftKey);

    if (savedDraft) {
        try {

            const draft = JSON.parse(savedDraft);

            return {
                title: draft.title ?? '',
                status: draft.status ?? 'To Do',
                assignee: draft.assignee ?? '',
                dueDate: draft.dueDate ?? '',
                description: draft.description ?? '',
                version: 0
            };

        } catch (error) {

            console.error(
                'Failed to restore task draft:',
                error
            );

            localStorage.removeItem(draftKey);
        }
    }

    return {
        title: '',
        status: 'To Do',
        assignee: '',
        dueDate: '',
        description: '',
        version: 0
    };
};


export default function TaskForm({
    task,
    onClose,
    projectId
}) {

    const draftKey = projectId
        ? `collaboard-task-draft-${projectId}`
        : 'collaboard-task-draft';

    const initialData = getInitialFormData(
        task,
        projectId
    );


    const [title, setTitle] = useState(initialData.title);
    const [status, setStatus] = useState(initialData.status);
    const [assignee, setAssignee] = useState(initialData.assignee);
    const [dueDate, setDueDate] = useState(initialData.dueDate);

    const [description, setDescription] = useState(
        initialData.description
    );

    const [version] = useState(initialData.version);

    const [projectMembers, setProjectMembers] = useState([]);
    const [membersLoading, setMembersLoading] = useState(false);


    // =========================
    // LOAD PROJECT MEMBERS
    // =========================

    useEffect(() => {

        const loadProjectMembers = async () => {

            if (!projectId) {
                setProjectMembers([]);
                return;
            }

            try {

                setMembersLoading(true);

                const project = await getProject(projectId);

                setProjectMembers(project.members || []);

            } catch (error) {

                console.error(
                    'Failed to load project members:',
                    error
                );

                setProjectMembers([]);

            } finally {

                setMembersLoading(false);
            }
        };

        loadProjectMembers();

    }, [projectId]);


    // =========================
    // SAVE NEW TASK DRAFT
    // =========================

    useEffect(() => {

        // Do not save drafts while editing an existing task
        if (task) {
            return;
        }

        const draft = {
            title,
            status,
            assignee,
            dueDate,
            description
        };

        localStorage.setItem(
            draftKey,
            JSON.stringify(draft)
        );

    }, [
        task,
        title,
        status,
        assignee,
        dueDate,
        description,
        draftKey
    ]);


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!assignee) {
            alert('Please select a project member.');
            return;
        }

        const taskData = {
            title,
            status,
            assignee,
            dueDate,
            description,
            projectId: task?.projectId || projectId
        };


        try {

            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `Bearer ${token}`
            };


            // =========================
            // UPDATE EXISTING TASK
            // =========================

            if (task && task._id) {

                await axios.put(
                    `${import.meta.env.VITE_API_URL || ''}/api/tasks/${task._id}`,
                    {
                        ...taskData,
                        version
                    },
                    {
                        headers
                    }
                );

            } else {

                // =========================
                // CREATE NEW TASK
                // =========================

                if (!projectId) {

                    alert(
                        'No project selected for this task.'
                    );

                    return;
                }

                await axios.post(
                    `${import.meta.env.VITE_API_URL || ''}/api/tasks`,
                    taskData,
                    {
                        headers
                    }
                );

                // Remove the draft after successful creation
                localStorage.removeItem(draftKey);
            }


            onClose();
            window.location.reload();

        } catch (error) {

            console.error(
                'Error saving task:',
                error
            );


            // =========================
            // CONCURRENCY CONFLICT
            // =========================

            if (error.response?.status === 409) {

                alert(
                    error.response.data?.message ||
                    'This task was changed by another user. Please close and reopen the task before saving again.'
                );

                return;
            }


            alert(
                error.response?.data?.message ||
                'Failed to save task. Is your backend server running?'
            );
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

                <label htmlFor="task-title">
                    Task Title
                </label>

                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    required
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
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                        >

                            <option value="To Do">
                                To Do
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
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
                            onChange={(event) =>
                                setAssignee(event.target.value)
                            }
                            required
                            disabled={membersLoading}
                        >

                            <option value="">
                                {membersLoading
                                    ? 'Loading members...'
                                    : 'Select member'}
                            </option>

                            {projectMembers.map((member) => (

                                <option
                                    key={member.id}
                                    value={member.name}
                                >
                                    {member.name}
                                </option>

                            ))}

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
                    onChange={(event) =>
                        setDueDate(event.target.value)
                    }
                    required
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
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
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
                    {task
                        ? 'Save Changes'
                        : 'Create'}
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
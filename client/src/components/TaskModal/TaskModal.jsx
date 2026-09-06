import './TaskModal.css';
import TaskForm from './TaskForm';

export default function TaskModal({
    isOpen,
    onClose,
    task,
    projectId
}) {
    if (!isOpen) {
        return null;
    }

    const isEditing = task !== null;

    return (
        <div className="task-modal-overlay">

            <div className="task-modal">

                <div className="task-modal__header">

                    <h2 className="task-modal__title">
                        {isEditing ? 'Edit Task' : 'Create a Task'}
                    </h2>

                    <button
                        type="button"
                        className="task-modal__close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                </div>

                <TaskForm
                    task={task}
                    onClose={onClose}
                    projectId={projectId}
                />

            </div>

        </div>
    );
}
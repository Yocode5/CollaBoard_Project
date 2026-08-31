import './ProjectModal.css';

import ProjectForm from './ProjectForm';

export default function ProjectModal({
    isOpen,
    onClose,
    project,
    onProjectSaved
}) {

    if (!isOpen) {
        return null;
    }


    return (
        <div className="project-modal__overlay">

            <div className="project-modal">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="project-modal__header">

                    <h2 className="project-modal__title">
                        {project ? 'Edit a Project' : 'Create a Project'}
                    </h2>

                    <button
                        type="button"
                        className="project-modal__close"
                        onClick={onClose}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                </div>


                {/* =========================
                    FORM
                ========================= */}

                <ProjectForm
                    project={project}
                    onClose={onClose}
                    onProjectSaved={onProjectSaved}
                />

            </div>

        </div>
    );
}
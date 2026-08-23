import './ProjectCard.css';

export default function ProjectCard({
    title,
    membersCount,
    description,
    onViewDetails
}) {
    return (
        <article className="project-card">

            <h3 className="project-card__title">
                {title}
            </h3>

            <hr className="project-card__divider" />

            <div className="project-card__field">

                <div className="project-card__members">

                    <i className="fa-solid fa-user"></i>

                    <span>
                        {membersCount} Members
                    </span>

                </div>

            </div>

            <div className="project-card__field">

                <label className="project-card__label">
                    Description:
                </label>

                <p className="project-card__description">
                    {description}
                </p>

            </div>

            <div className="project-card__footer">

                <button
                    type="button"
                    className="project-card__details"
                    onClick={onViewDetails}
                >
                    View Full Details
                </button>

            </div>

        </article>
    );
}
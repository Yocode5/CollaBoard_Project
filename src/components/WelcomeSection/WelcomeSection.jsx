import './WelcomeSection.css';

export default function WelcomeSection({ onAddTask }) {
    return (
        <section className="welcome-section">

            <h2 className="welcome-section__title">
                Welcome, [Name]
            </h2>

            <button
                className="welcome-section__button"
                onClick={onAddTask}
            >
                Add new Task
                <i className="fa-solid fa-plus"></i>
            </button>

        </section>
    );
}
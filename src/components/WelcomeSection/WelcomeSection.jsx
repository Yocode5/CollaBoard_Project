import './WelcomeSection.css';

export default function WelcomeSection() {
    return (
        <section className="welcome-section">
            <h2 className="welcome-section__title">
                Welcome, [Name]
            </h2>

            <button className="welcome-section__button">
                Add new Task
                <i className="fa-solid fa-plus"></i>
            </button>
        </section>
    );
}
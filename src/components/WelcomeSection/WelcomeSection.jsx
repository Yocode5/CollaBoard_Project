import './WelcomeSection.css';

export default function WelcomeSection({
    sectionName,
    buttonText,
    onButtonClick
}) {
    return (
        <section className="welcome-section">

            <h2 className="welcome-section__title">
                Welcome, [Name]
                {sectionName && (
                    <>
                        <span className="welcome-section__separator">
                            |
                        </span>

                        <span className="welcome-section__section">
                            {sectionName}
                        </span>
                    </>
                )}
            </h2>

            <button
                className="welcome-section__button"
                onClick={onButtonClick}
            >
                {buttonText}

                <i className="fa-solid fa-plus"></i>
            </button>

        </section>
    );
}
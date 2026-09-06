import './WelcomeSection.css';

export default function WelcomeSection({
    sectionName,
    buttonText,
    onButtonClick
}) {
    let userName = 'User';

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            userName = user.name || 'User';
        } catch (error) {
            console.error('Failed to read stored user:', error);
        }
    }

    return (
        <section className="welcome-section">

            <h2 className="welcome-section__title">
                Welcome, {userName}

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
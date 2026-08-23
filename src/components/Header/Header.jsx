import './Header.css';

export default function Header() {
    return (
        <header className="header">

            {/* Logo */}
            <h1 className="header__title">
                CollaBoard
            </h1>


            {/* Navigation */}
            <nav className="header__nav">

                <a href="/" className="header__link">
                    Home
                </a>

                <a href="/projects" className="header__link">
                    Projects
                </a>

            </nav>


            {/* Actions */}
            <div className="header__actions">

                <button
                    type="button"
                    className="header__button header__button--profile"
                >
                    Profile
                </button>

                <button
                    type="button"
                    className="header__button header__button--logout"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}
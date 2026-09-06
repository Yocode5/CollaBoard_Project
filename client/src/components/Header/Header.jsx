import { useState } from 'react';
import './Header.css';
import ProfileModal from '../Profile/ProfileModal';

export default function Header() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.location.href = '/';
    };

    return (
        <>
            <header className="header">
                <h1 className="header__title">
                    CollaBoard
                </h1>

                <nav className="header__nav">
                    <a
                        href="/dashboard"
                        className="header__link"
                    >
                        Home
                    </a>

                    <a
                        href="/projects"
                        className="header__link"
                    >
                        Projects
                    </a>
                </nav>

                <div className="header__actions">
                    <button
                        type="button"
                        className="header__button header__button--profile"
                        onClick={() =>
                            setIsProfileModalOpen(true)
                        }
                    >
                        Profile
                    </button>

                    <button
                        type="button"
                        className="header__button header__button--logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {isProfileModalOpen && (
                <ProfileModal
                    onClose={() =>
                        setIsProfileModalOpen(false)
                    }
                />
            )}
        </>
    );
}
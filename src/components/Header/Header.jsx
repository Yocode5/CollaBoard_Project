import React, { useState } from 'react';
import './Header.css';
import ProfileModal from '../Profile/ProfileModal';

export default function Header() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        <>
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
                        onClick={() => setIsProfileModalOpen(true)}
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

            {isProfileModalOpen && (
                <ProfileModal 
                    onClose={() => setIsProfileModalOpen(false)} 
                />
            )}
        </>
    );
}
import { useEffect, useState } from 'react';
import {
    getUserProfile,
    updateUserProfile
} from '../../api/profileApi';

export default function ProfileForm({ onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const storedUser = JSON.parse(
                    localStorage.getItem('user')
                );

                if (!storedUser?.id) {
                    throw new Error('User information not found.');
                }

                const user = await getUserProfile(storedUser.id);

                setName(user.name);
                setEmail(user.email);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSaving(true);

        try {
            const storedUser = JSON.parse(
                localStorage.getItem('user')
            );

            if (!storedUser?.id) {
                throw new Error('User information not found.');
            }

            const updatedUser = await updateUserProfile(
                storedUser.id,
                {
                    name,
                    email
                }
            );

            // Keep localStorage user data in sync
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...storedUser,
                    name: updatedUser.name,
                    email: updatedUser.email
                })
            );

            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-form">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <form
            className="profile-form"
            onSubmit={handleSubmit}
        >
            {error && (
                <p className="error-text">
                    {error}
                </p>
            )}

            <div className="profile-form__group">
                <label htmlFor="profile-name">
                    Full Name
                </label>

                <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="profile-form__group">
                <label htmlFor="profile-email">
                    Email Address
                </label>

                <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="profile-form__actions">
                <button
                    type="submit"
                    className="profile-form__submit"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                    type="button"
                    className="profile-form__cancel"
                    onClick={onClose}
                    disabled={saving}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
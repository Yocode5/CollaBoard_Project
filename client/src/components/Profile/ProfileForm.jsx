export default function ProfileForm({ onClose }) {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            
            <div className="profile-form__group">
                <label>Full Name</label>
                <input type="text" defaultValue="John Doe" />
            </div>

            <div className="profile-form__group">
                <label>Email Address</label>
                <input type="email" defaultValue="johndoe@example.com" />
            </div>

            <div className="profile-form__actions">
                <button type="submit" className="profile-form__submit">
                    Save Changes
                </button>
                <button type="button" className="profile-form__cancel" onClick={onClose}>
                    Cancel
                </button>
            </div>

        </form>
    );
}
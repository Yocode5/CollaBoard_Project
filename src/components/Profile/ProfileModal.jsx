import './ProfileModal.css';
import ProfileForm from './ProfileForm';

export default function ProfileModal({ onClose }) {

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
                
                <div className="profile-modal-header">
                    <h2 className="profile-modal-title">Your Profile</h2>
                    <button className="profile-modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="profile-modal-body">
                    <ProfileForm onClose={onClose} />
                </div>

            </div>
        </div>
    );
}
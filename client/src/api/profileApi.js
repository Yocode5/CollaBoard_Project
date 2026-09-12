const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/users`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
};

export const getUserProfile = async (id) => {
    const response = await fetch(`${API_URL}/profile/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile.');
    }

    return data;
};

export const updateUserProfile = async (id, userData) => {
    const response = await fetch(`${API_URL}/profile/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile.');
    }

    return data;
};
const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/users`;

export const searchUsers = async (query) => {
    const token = localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || 'Failed to search users.'
        );
    }

    return data;
};
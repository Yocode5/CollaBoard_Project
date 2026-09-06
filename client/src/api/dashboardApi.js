const API_URL = 'http://localhost:4000/api/dashboard';

export const getDashboardStats = async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/stats/${userId}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || 'Failed to fetch dashboard stats.'
        );
    }

    return result.data;
};
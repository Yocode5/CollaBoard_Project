
const mockUsers = [
    { id: '1', email: 'admin@collaboard.com', password: 'password123', name: 'Admin User' },
    { id: '2', email: 'user@collaboard.com', password: 'password123', name: 'Test User' }
];

class AuthService {
    async login(email, password) {
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        
        return {
            token: 'mock-jwt-token-xyz123',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    async register(userData) {
        if (!userData.email || !userData.password) {
            const error = new Error('Email and password are required for registration');
            error.statusCode = 400;
            throw error;
        }

        const newUser = {
            id: String(mockUsers.length + 1),
            email: userData.email,
            password: userData.password,
            name: userData.name || 'New User'
        };

        mockUsers.push(newUser);

        return {
            token: 'mock-jwt-token-xyz123',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            }
        };
    }
}

module.exports = new AuthService();
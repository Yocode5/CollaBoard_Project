import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from './ProfileForm';

const mocks = vi.hoisted(() => ({
    getUserProfile: vi.fn().mockResolvedValue({
        name: 'Samadhi Chandrasekara',
        email: 'samadhi@collaboard.com'
    }),
    updateUserProfile: vi.fn().mockResolvedValue({
        name: 'Samadhi C.',
        email: 'samadhi@collaboard.com'
    })
}));

vi.mock('../../api/profileApi', () => ({
    getUserProfile: mocks.getUserProfile,
    updateUserProfile: mocks.updateUserProfile
}));

describe('ProfileForm Component', () => {
    beforeEach(() => {
        localStorage.setItem('user', JSON.stringify({ id: '12345' }));
        vi.clearAllMocks();
    });

    test('loads and displays user profile data correctly', async () => {
        render(<ProfileForm onClose={vi.fn()} />);

        expect(screen.getByText(/loading profile/i)).toBeInTheDocument();

        const nameInput = await screen.findByDisplayValue('Samadhi Chandrasekara');
        expect(nameInput).toBeInTheDocument();
        expect(screen.getByDisplayValue('samadhi@collaboard.com')).toBeInTheDocument();
    });

    test('allows editing profile details and triggers close on success', async () => {
        const mockClose = vi.fn();
        render(<ProfileForm onClose={mockClose} />);

        const nameInput = await screen.findByDisplayValue('Samadhi Chandrasekara');

        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'Samadhi C.');
        expect(nameInput).toHaveValue('Samadhi C.');

        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await userEvent.click(saveButton);

        await waitFor(() => {
            expect(mockClose).toHaveBeenCalled();
        });
    });
});
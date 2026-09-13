/* eslint-env vitest */

import { render, screen } from '@testing-library/react';
import TaskGrid from './TaskGrid';
import axios from 'axios';

vi.mock('axios');
vi.mock('socket.io-client', () => ({
    io: vi.fn(() => ({
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
        disconnect: vi.fn()
    }))
}));

describe('TaskGrid Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders tasks correctly after fetching from API', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: '1', title: 'Setup database schema', status: 'To Do' },
                { _id: '2', title: 'Implement JWT authentication', status: 'In Progress' }
            ]
        });

        render(<TaskGrid />);

        expect(await screen.findByText('Setup database schema')).toBeInTheDocument();
        expect(screen.getByText('Implement JWT authentication')).toBeInTheDocument();
    });

    test('renders tasks categorized in correct columns', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: '1', title: 'Task Todo', status: 'To Do' },
                { _id: '2', title: 'Task Done', status: 'Completed' }
            ]
        });

        render(<TaskGrid />);

        expect(await screen.findByText('Task Todo')).toBeInTheDocument();
        expect(screen.getByText('Task Done')).toBeInTheDocument();
    });
});

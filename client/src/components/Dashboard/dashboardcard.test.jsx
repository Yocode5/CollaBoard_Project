import { render, screen } from '@testing-library/react';
import DashboardCard from './DashboardCard';

describe('DashboardCard Component', () => {
    test('renders number and label props correctly', () => {
        render(<DashboardCard number="12" label="Total Tasks" />);

        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    });
});
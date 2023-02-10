import { fireEvent, render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { UserTask } from '../../../../Models/UserTask';
import TaskHandler from '../TaskHandler';

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useParams: () => ({
        taskId: '1'
    }),
    useNavigate: () => ({}),
    useRouteMatch: () => ({ url: '/task/taskId' })
}));

vi.mock('@tanstack/react-query', () => ({
    ...vi.importActual('@tanstack/react-query'),
    useQuery: vi.fn().mockReturnValue({ data: { ...UserTask }, isLoading: false, error: {} }),
    useMutation: vi.fn().mockReturnValue({ data: { ...UserTask }, isLoading: false, error: {} })
}));

describe('TaskHandler', () => {
    it('renders elements properly', () => {
        render(<TaskHandler />);

        expect(screen.getByText(/task/i)).toBeDefined();
        expect(screen.getByTestId('control-subject')).toBeDefined();
        expect(screen.getByTestId('control-description')).toBeDefined();
        expect(screen.getByLabelText('Start Date and Time *')).toBeDefined();
        expect(screen.getByLabelText('End Date and Time *')).toBeDefined();
        expect(screen.getByLabelText('Is Completed?')).toBeDefined();
    });

    it('renders elements properly when task is completed', () => {
        render(<TaskHandler />);

        expect(screen.getByLabelText('Is Completed?')).toBeDefined();
    });

    it('renders elements properly when task is not completed', () => {
        render(<TaskHandler />);

        expect(screen.getByLabelText('Is Completed?')).toBeDefined();
    });

    it('submits form when data is valid', () => {
        render(<TaskHandler />);

        userEvent.type(screen.getByTestId('control-subject'), 'test');
        userEvent.type(screen.getByTestId('control-description'), 'test');
        fireEvent.change(screen.getByLabelText('Start Date and Time *'), { target: { value: '2021-06-01T00:00:00' } });
        fireEvent.change(screen.getByLabelText('End Date and Time *'), { target: { value: '2021-06-01T00:00:00' } });
        fireEvent.click(screen.getByLabelText('Is Completed?'));
        fireEvent.click(screen.getByText(/save/i));
    });

    it('does not submit form when data is invalid', () => {
        render(<TaskHandler />);

        fireEvent.click(screen.getByText(/save/i));
    });
});

import '@testing-library/jest-dom';
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, test, vi } from 'vitest';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
    it('renders elements properly', () => {
        render(<TaskForm />);

        expect(screen.getByTestId('task-form')).toBeDefined();
    });
});
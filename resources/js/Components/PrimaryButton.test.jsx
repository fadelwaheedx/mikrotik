import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'vitest-axe';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
    it('renders children and handles onClick', () => {
        const handleClick = vi.fn();
        render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire onClick when disabled', () => {
        const handleClick = vi.fn();
        render(<PrimaryButton disabled onClick={handleClick}>Click Me</PrimaryButton>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('passes accessibility checks', async () => {
        const { container } = render(<PrimaryButton>Submit</PrimaryButton>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<PrimaryButton className="custom-class">Snapshot</PrimaryButton>);
        expect(asFragment()).toMatchSnapshot();
    });
});

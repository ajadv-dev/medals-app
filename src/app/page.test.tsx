import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

test('renders main instructional text', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument();
});

test('renders "Deploy now" link', () => {
    render(<Home />);
    const deployLink = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute('href', expect.stringContaining('vercel.com'));
});

test('renders footer links', () => {
    render(<Home />);
    expect(screen.getByText(/Learn/i)).toBeInTheDocument();
    expect(screen.getByText(/Examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to nextjs.org/i)).toBeInTheDocument();
});

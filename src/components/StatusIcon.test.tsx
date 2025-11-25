import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatusIcon from './StatusIcon';

vi.mock('../assets/alarm-high.svg', () => ({ default: '/mock-high.svg' }));
vi.mock('../assets/alarm-medium.svg', () => ({ default: '/mock-medium.svg' }));
vi.mock('../assets/alarm-low.svg', () => ({ default: '/mock-low.svg' }));

describe('StatusIcon Component', () => {
  it('renders the High Priority icon correctly', () => {
    render(<StatusIcon priority={1} />);
    
    const img = screen.getByRole('img', { name: /Priority 1/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/mock-high.svg');
  });

  it('renders the Medium Priority icon correctly', () => {
    render(<StatusIcon priority={2} />);
    
    const img = screen.getByRole('img', { name: /Priority 2/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/mock-medium.svg');
  });

  it('renders the Low Priority icon correctly', () => {
    render(<StatusIcon priority={3} />);
    
    const img = screen.getByRole('img', { name: /Priority 3/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/mock-low.svg');
  });

  it('defaults to Low Priority icon for unknown priority numbers', () => {
    render(<StatusIcon priority={99} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/mock-low.svg');
  });
});
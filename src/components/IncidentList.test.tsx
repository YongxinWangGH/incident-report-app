import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import IncidentList from './IncidentList';
import type { Incident } from '../hooks/useIncidents';

vi.mock('../utils/formatters.ts', () => ({
  formatDate: vi.fn(() => 'Mocked List Date'),
  getPriorityLabel: vi.fn((p) => (p === 1 ? 'High' : 'Medium')),
}));

vi.mock('../assets/alarm-high.svg', () => ({ default: 'high.svg' }));
vi.mock('../assets/alarm-medium.svg', () => ({ default: 'medium.svg' }));
vi.mock('../assets/alarm-low.svg', () => ({ default: 'low.svg' }));

const mockData: Incident[] = [
  {
    id: 501,
    name: 'Power Outage',
    locationId: 'loc5',
    locationName: 'Server Room',
    priority: 1,
    datetime: '2023-01-01',
  }
];

describe('IncidentList Component', () => {
  it('renders a list container', () => {
    render(<IncidentList data={mockData} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    const multiData = [...mockData, { ...mockData[0], id: 502 }];
    render(<IncidentList data={multiData} />);
    
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays incident details within the card', () => {
    render(<IncidentList data={mockData} />);

    const card = screen.getByRole('listitem');

    expect(within(card).getByRole('img')).toBeInTheDocument();

    expect(card).toHaveTextContent('Mocked List Date');
    expect(card).toHaveTextContent('Server Room');
    expect(card).toHaveTextContent('Power Outage');
    expect(card).toHaveTextContent('Priority: High');
  });

  it('is accessible via tab index', () => {
    render(<IncidentList data={mockData} />);
    const card = screen.getByRole('listitem');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
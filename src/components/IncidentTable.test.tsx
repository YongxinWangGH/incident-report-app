import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import IncidentTable from './IncidentTable';
import type { Incident } from '../hooks/useIncidents';

vi.mock('../utils/formatters.ts', () => ({
  formatDate: vi.fn(() => 'Mocked Date'),
  getPriorityLabel: vi.fn((p) => (p === 1 ? 'High' : 'Unknown')),
}));

vi.mock('../assets/alarm-high.svg', () => ({ default: 'high.svg' }));
vi.mock('../assets/alarm-medium.svg', () => ({ default: 'medium.svg' }));
vi.mock('../assets/alarm-low.svg', () => ({ default: 'low.svg' }));

const mockData: Incident[] = [
  {
    id: 101,
    name: 'Fire Alarm',
    locationId: 'loc1',
    locationName: 'Lobby',
    priority: 1,
    datetime: '2023-01-01T00:00:00Z',
  },
  {
    id: 102,
    name: 'Leak',
    locationId: 'loc2',
    locationName: 'Kitchen',
    priority: 2,
    datetime: '2023-01-02T00:00:00Z',
  },
];

describe('IncidentTable Component', () => {
  it('renders the table with correct headers', () => {
    render(<IncidentTable data={mockData} />);

    expect(screen.getByText('Date and Time')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Location Name')).toBeInTheDocument();
    expect(screen.getByText('Incident Name')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<IncidentTable data={mockData} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); 
  });

  it('renders incident data correctly in cells', () => {
    render(<IncidentTable data={mockData} />);

    const rows = screen.getAllByRole('row');
    const firstRowCells = within(rows[1]).getAllByRole('cell');

    expect(within(firstRowCells[0]).getByRole('img')).toBeInTheDocument();
    expect(firstRowCells[1]).toHaveTextContent('Mocked Date');
    expect(firstRowCells[2]).toHaveTextContent('101');
    expect(firstRowCells[3]).toHaveTextContent('Lobby');
    expect(firstRowCells[4]).toHaveTextContent('Fire Alarm');
    expect(firstRowCells[5]).toHaveTextContent('High');
  });

  it('renders empty table body smoothly when no data provided', () => {
    render(<IncidentTable data={[]} />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });
});
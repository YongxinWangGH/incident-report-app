import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import App from './App';
import { useIncidents, type Incident } from './hooks/useIncidents';

vi.mock('./hooks/useIncidents', () => ({
  useIncidents: vi.fn(),
}));

vi.mock('./components/IncidentTable', () => ({
  default: ({ data }: { data: Incident[] }) => (
    <div data-testid="mock-table">Table Items: {data.length}</div>
  ),
}));

vi.mock('./components/IncidentList', () => ({
  default: ({ data }: { data: Incident[] }) => (
    <div data-testid="mock-list">List Items: {data.length}</div>
  ),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Loading state correctly', () => {
    (useIncidents as Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders Error state correctly', () => {
    (useIncidents as Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error('Network Failure'),
      data: undefined,
    });

    render(<App />);
    expect(screen.getByText(/Error: Network Failure/i)).toBeInTheDocument();
  });

  it('renders Dashboard with Table and List when data loads', () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    
    (useIncidents as Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(<App />);

    expect(screen.getByText('Incidents')).toBeInTheDocument();

    const desktopView = screen.getByTestId('mock-table').closest('.desktop-view');
    expect(desktopView).toBeInTheDocument();
    expect(screen.getByTestId('mock-table')).toHaveTextContent('Table Items: 2');

    const mobileView = screen.getByTestId('mock-list').closest('.mobile-view');
    expect(mobileView).toBeInTheDocument();
    expect(screen.getByTestId('mock-list')).toHaveTextContent('List Items: 2');
  });

  it('passes empty array to children if data is undefined but not loading', () => {
    (useIncidents as Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
    });

    render(<App />);

    expect(screen.getByTestId('mock-table')).toHaveTextContent('Table Items: 0');
  });
});
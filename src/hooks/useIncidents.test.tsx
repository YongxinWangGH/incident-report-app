import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIncidents } from './useIncidents';
import API from '../api/fake-api';

vi.mock('../api/fake-api', () => ({
  default: {
    getLocations: vi.fn(),
    getIncidentsByLocationId: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useIncidents Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches data, merges location names, removes duplicates, and sorts correctly', async () => {
    const mockLocations = [
      { id: 'loc1', name: 'Headquarters' },
      { id: 'loc2', name: 'Warehouse' },
    ];

    const incidentsLoc1 = [
      { id: 101, locationId: 'loc1', priority: 1, datetime: '2023-01-02T10:00:00Z', name: 'Theft' },
      { id: 102, locationId: 'loc1', priority: 2, datetime: '2023-01-05T10:00:00Z', name: 'Fire' },
      { id: 101, locationId: 'loc1', priority: 1, datetime: '2023-01-02T10:00:00Z', name: 'Theft' },
    ];

    const incidentsLoc2 = [
      { id: 103, locationId: 'loc2', priority: 1, datetime: '2023-01-01T10:00:00Z', name: 'Leak' },
    ];

    (API.getLocations as Mock).mockResolvedValue(mockLocations);
    (API.getIncidentsByLocationId as Mock).mockImplementation((id: string) => {
      if (id === 'loc1') return Promise.resolve(incidentsLoc1);
      if (id === 'loc2') return Promise.resolve(incidentsLoc2);
      return Promise.resolve([]);
    });

    const { result } = renderHook(() => useIncidents(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;

    expect(data).toHaveLength(3);

    expect(data![0].id).toBe(101);
    expect(data![0].locationName).toBe('Headquarters');

    expect(data![1].id).toBe(103);
    expect(data![1].locationName).toBe('Warehouse'); 

    expect(data![2].id).toBe(102);
    expect(data![2].locationName).toBe('Headquarters');
  });

  it('handles API errors gracefully', async () => {
    (API.getLocations as Mock).mockRejectedValue(new Error('API Down'));

    const { result } = renderHook(() => useIncidents(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });

  it('assigns "Unknown" location name if incident locationId is not found in location list', async () => {
    const mockLocations = [{ id: 'loc1', name: 'Headquarters' }];

    const orphanedIncident = [
      { 
        id: 999, 
        locationId: 'loc99',
        priority: 1, 
        datetime: '2023-01-01T10:00:00Z', 
        name: 'Glitch'
      }
    ];

    (API.getLocations as Mock).mockResolvedValue(mockLocations);
    (API.getIncidentsByLocationId as Mock).mockResolvedValue(orphanedIncident);

    const { result } = renderHook(() => useIncidents(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    
    expect(data![0].id).toBe(999);
    expect(data![0].locationName).toBe('Unknown');
  });
});
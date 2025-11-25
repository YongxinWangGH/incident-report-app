import { describe, it, expect } from 'vitest';
import { transformIncidentsData } from './transformer';
import type { Incident as ApiIncident, Location } from '../api/fake-api';

describe('Utility: transformIncidentsData', () => {
  
  const mockLocations: Location[] = [
    { id: 'loc1', name: 'Headquarters' },
    { id: 'loc2', name: 'Warehouse' }
  ];

  it('merges location names into incidents correctly', () => {
    const rawIncidents: ApiIncident[] = [
      { id: 1, locationId: 'loc1', priority: 1, datetime: '2023-01-01', name: 'Fire A' },
      { id: 2, locationId: 'loc2', priority: 1, datetime: '2023-01-01', name: 'Leak B' },
    ];

    const result = transformIncidentsData(rawIncidents, mockLocations);

    expect(result[0].locationName).toBe('Headquarters');
    expect(result[1].locationName).toBe('Warehouse');
  });

  it('filters out duplicate incidents by ID', () => {
    const rawIncidents: ApiIncident[] = [
      { id: 100, locationId: 'loc1', priority: 1, datetime: '2023-01-01', name: 'Original' },
      { id: 100, locationId: 'loc1', priority: 1, datetime: '2023-01-01', name: 'Duplicate' },
    ];

    const result = transformIncidentsData(rawIncidents, mockLocations);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Original'); 
  });

  it('sorts by Priority Ascending (High=1 -> Low=3)', () => {
    const rawIncidents: ApiIncident[] = [
      { id: 1, priority: 2, locationId: 'loc1', datetime: '2023-01-01', name: 'Medium' },
      { id: 2, priority: 1, locationId: 'loc1', datetime: '2023-01-01', name: 'High' },
      { id: 3, priority: 3, locationId: 'loc1', datetime: '2023-01-01', name: 'Low' },
    ];

    const result = transformIncidentsData(rawIncidents, mockLocations);

    expect(result[0].priority).toBe(1); 
    expect(result[1].priority).toBe(2); 
    expect(result[2].priority).toBe(3); 
  });

  it('sorts by Date Descending (Newest -> Oldest) when Priority is equal', () => {
    const rawIncidents: ApiIncident[] = [
      { id: 1, priority: 1, locationId: 'loc1', datetime: '2023-01-01', name: 'Old' },
      { id: 2, priority: 1, locationId: 'loc1', datetime: '2023-01-05', name: 'New' },
      { id: 3, priority: 1, locationId: 'loc1', datetime: '2023-01-03', name: 'Middle' },
    ];

    const result = transformIncidentsData(rawIncidents, mockLocations);

    expect(result[0].datetime).toBe('2023-01-05');
    expect(result[1].datetime).toBe('2023-01-03');
    expect(result[2].datetime).toBe('2023-01-01');
  });

  it('assigns "Unknown" if locationId does not exist in location list', () => {
    const rawIncidents: ApiIncident[] = [
      { id: 99, locationId: 'ghost-loc', priority: 1, datetime: '2023-01-01', name: 'Ghost' },
    ];

    const result = transformIncidentsData(rawIncidents, mockLocations);

    expect(result[0].locationName).toBe('Unknown');
  });
});
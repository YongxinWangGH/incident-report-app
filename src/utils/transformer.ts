import type { Incident as ApiIncident, Location } from '../api/fake-api';

export interface EnrichedIncident extends ApiIncident {
  locationName: string;
}

export const transformIncidentsData = (
  incidents: ApiIncident[], 
  locations: Location[]
): EnrichedIncident[] => { 
  
  const locationMap = new Map(locations.map((loc) => [loc.id, loc.name]));
  const uniqueIncidentsMap = new Map<number, EnrichedIncident>();

  incidents.forEach((inc) => {
    if (!uniqueIncidentsMap.has(inc.id)) {
      uniqueIncidentsMap.set(inc.id, {
        ...inc,
        locationName: locationMap.get(inc.locationId) || 'Unknown',
      });
    }
  });

  return Array.from(uniqueIncidentsMap.values()).sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });
};
import { useQuery } from '@tanstack/react-query';
import API from '../api/fake-api';
import type { Incident as ApiIncident } from '../api/fake-api';
import { transformIncidentsData } from '../utils/transformer';

export interface Incident extends ApiIncident {
  locationName: string;
}

const fetchIncidents = async () => {
  const locations = await API.getLocations();
  const incidentsArrays = await Promise.all(
    locations.map(loc => API.getIncidentsByLocationId(loc.id))
  );
  return transformIncidentsData(incidentsArrays.flat(), locations);
};

export const useIncidents = () => {
  return useQuery({
    queryKey: ['incidents'], 
    queryFn: fetchIncidents,
    retry: false, 
  });
};
import type { Incident } from '../hooks/useIncidents';
import { formatDate, getPriorityLabel } from '../utils/formatters.ts';
import StatusIcon from './StatusIcon';

const IncidentList = ({ data }: { data: Incident[] }) => {
  return (
    <div className="incident-list-container" role="list" aria-label="Incidents List">
      {data.map((item) => (
        <div key={item.id} className="incident-card" role="listitem" tabIndex={0}>
          <div className="card-icon">
            <StatusIcon priority={item.priority} />
          </div>
          <div className="card-info">
            <span className="card-date">{formatDate(item.datetime)}</span>
            <span className="card-location">{item.locationName}</span>
            <span className="card-title">{item.name}</span>
            <span className="card-priority">
              Priority: {getPriorityLabel(item.priority)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
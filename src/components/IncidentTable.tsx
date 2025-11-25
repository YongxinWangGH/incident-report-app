import type { Incident } from '../hooks/useIncidents';
import { formatDate, getPriorityLabel } from '../utils/formatters.ts';
import StatusIcon from './StatusIcon';

const IncidentTable = ({ data }: { data: Incident[] }) => {
  return (
    <div className="incident-table-wrapper">
      <table className="incident-table">
        <thead>
          <tr>
            <th className="col-icon" scope="col"></th>
            <th>Date and Time</th>
            <th>ID</th> 
            <th>Location Name</th>
            <th>Incident Name</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="col-icon">
                <StatusIcon priority={item.priority} />
              </td>
              <td>{formatDate(item.datetime)}</td>
              <td>{item.id}</td>
              <td>{item.locationName}</td>
              <td>{item.name}</td>
              <td>{getPriorityLabel(item.priority)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
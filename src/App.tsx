import { useIncidents } from './hooks/useIncidents';
import IncidentTable from './components/IncidentTable.tsx';
import IncidentList from './components/IncidentList.tsx';
import './styles/index.scss';

const App = () => {
  const { data: incidents, isLoading, isError, error } = useIncidents();
  const safeData = incidents || [];

  if (isLoading) return <div className="loading-state">Loading...</div>;
  if (isError) return <div className="error-state">Error: {(error as Error).message}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Incidents</h2>
      </div>
      <div className="desktop-view">
        <IncidentTable data={safeData} />
      </div>
      <div className="mobile-view">
        <IncidentList data={safeData} />
      </div>
    </div>
  );
};

export default App;
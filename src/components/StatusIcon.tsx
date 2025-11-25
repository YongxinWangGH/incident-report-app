import highIcon from '../assets/alarm-high.svg';
import mediumIcon from '../assets/alarm-medium.svg';
import lowIcon from '../assets/alarm-low.svg';

const StatusIcon = ({ priority }: { priority: number }) => {
  return (
    <img 
      src={getIcon(priority)} 
      alt={`Priority ${priority}`} 
      title={`Priority ${priority}`} 
      className="status-icon" 
    />
  );
};

export default StatusIcon;

const getIcon = (priority: number) => {
    switch (priority) {
      case 1: return highIcon;   
      case 2: return mediumIcon; 
      case 3: return lowIcon; 
      default: return lowIcon;
    }
  };
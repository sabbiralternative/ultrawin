import { settings } from "../../../api";
import "./maintenance.css";

const MaintenanceMessage = () => {
  return (
    <div className="maintenance_container">
      <div className="container">
        <h1>Scheduled Maintenance</h1>
        <p>Our website is currently under maintenance.</p>

        <div className="reason">{settings.maintenance_message}</div>
      </div>
    </div>
  );
};

export default MaintenanceMessage;

import { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => {
      return (
        <div
          key={alert.id}
          className={`flex justify-center items-center py-4 font-semibold alert-${alert.type}`}
        >
          <i className="fas fa-info-circle mr-2" />
          <p className="text-white">{alert.msg}</p>
        </div>
      );
    })
  );
};

export default Alerts;

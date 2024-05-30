import { Alert, AlertTitle } from "@mui/material";
import { ALERT_VARIANTS, ISingleAlertProps } from "./SingleAlert.model";
import { useStoreAlerts } from "../../shared/hooks/useStoreAlerts";
import { useEffect } from "react";

const SingleAlert = ({ id, message, variant }: ISingleAlertProps) => {
  const { removeAlert } = useStoreAlerts();
  const alertTitle = {
    [ALERT_VARIANTS.SUCCESS]: "Sukces",
    [ALERT_VARIANTS.WARNING]: "Uwaga",
    [ALERT_VARIANTS.ERROR]: "Błąd",
  };

  useEffect(() => {
    var timer: ReturnType<typeof setTimeout>;
    if (variant !== ALERT_VARIANTS.ERROR) {
      timer = setTimeout(() => {
        removeAlert(id);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert severity={variant} onClose={() => removeAlert(id)}>
      <AlertTitle>
        ({id}) {alertTitle[variant]}
      </AlertTitle>
      {message}
    </Alert>
  );
};

export { SingleAlert };

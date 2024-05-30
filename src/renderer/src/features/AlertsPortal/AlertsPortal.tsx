import { Collapse, Portal } from "@mui/material";
import { useStoreAlerts } from "../../shared/hooks/useStoreAlerts";
import { SingleAlert } from "../../components/SingleAlert";
import { StyledTransitionGroup } from "./AlertsPortal.style";
import { ISingleAlertProps } from "../../components/SingleAlert/SingleAlert.model";

const AlertsPortal = () => {
  const { alertsList } = useStoreAlerts();
  return (
    <Portal>
      <StyledTransitionGroup>
        {alertsList.slice(-3).map((alert: ISingleAlertProps) => {
          return (
            <Collapse key={alert.id}>
              <SingleAlert
                id={alert.id}
                message={alert.message}
                variant={alert.variant}
              />
            </Collapse>
          );
        })}
      </StyledTransitionGroup>
    </Portal>
  );
};

export { AlertsPortal };

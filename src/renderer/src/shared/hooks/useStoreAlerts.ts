import { useContext } from "react";
import { Context, STORE_ACTION_TYPES } from "../../store/Store";
import { ALERT_VARIANTS } from "../../components/SingleAlert/SingleAlert.model";

const useStoreAlerts = () => {
  const [state, dispatch] = useContext<any>(Context);

  const alertsList = state.alertsList;
  const addSuccessAlert = (message: any) => {
    dispatch({
      type: STORE_ACTION_TYPES.SET_ALERT,
      payload: { message: message, variant: ALERT_VARIANTS.SUCCESS },
    });
  };
  const addWarningAlert = (message: any) => {
    dispatch({
      type: STORE_ACTION_TYPES.SET_ALERT,
      payload: { message: message, variant: ALERT_VARIANTS.WARNING },
    });
  };
  const addErrorAlert = (message: any) => {
    dispatch({
      type: STORE_ACTION_TYPES.SET_ALERT,
      payload: { message: message, variant: ALERT_VARIANTS.ERROR },
    });
  };
  const removeAlert = (id: number) => {
    dispatch({
      type: STORE_ACTION_TYPES.REMOVE_ALERT,
      payload: { id: id },
    });
  };

  return {
    alertsList,
    addSuccessAlert,
    addWarningAlert,
    addErrorAlert,
    removeAlert,
  };
};

export { useStoreAlerts };

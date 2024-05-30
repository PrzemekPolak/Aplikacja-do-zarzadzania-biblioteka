import { AlertColor } from "@mui/material";

interface ISingleAlertProps {
  id: number;
  message: string;
  variant: AlertColor;
}

const ALERT_VARIANTS = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

export { ALERT_VARIANTS };
export type { ISingleAlertProps };

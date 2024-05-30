import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)``;

const StyledDialogContent = styled(DialogContent)`
  height: 70vh;
`;

const BasicModal = ({
  open,
  handleClose,
  title,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>{title}</DialogTitle>
        <StyledDialogContent>{children}</StyledDialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zamknij</Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export { BasicModal };

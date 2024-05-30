import { useEffect, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { SearchList } from "../SearchList";
import { BasicModal } from "../../components/BasicModal";
import { ModalCurrentOption } from "./ModalCurrentOption";
import { IUserData } from "../../shared/constants/queryModels/user.model";
import { IBookData } from "../../shared/constants/queryModels/book.model";
import { IModalSelectProps } from "./ModalSelect.model";
import { useStoreAlerts } from "../../shared/hooks/useStoreAlerts";

const ModalSelect = ({
  name,
  initialData,
  variant,
  modalTitle,
}: IModalSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const { addWarningAlert } = useStoreAlerts();
  const [currentOption, setCurrentOption] = useState<
    IUserData | IBookData | {}
  >(initialData);

  useEffect(() => {
    if (values.bookId === undefined && variant === "book") setCurrentOption({});
  }, [values]);

  return (
    <>
      <ModalCurrentOption
        handleOpen={handleOpen}
        variant={variant}
        values={currentOption}
      />
      <BasicModal open={open} handleClose={handleClose} title={modalTitle}>
        <SearchList
          variant={variant}
          onElementClick={(item: IUserData | IBookData) => {
            if (!(item as IBookData).isBorrowed) {
              setCurrentOption(item);
              setFieldValue(name, item.id);
              handleClose();
            } else
              addWarningAlert(
                "Ta książka jest obecnie wypożyczona! Nie można jej wybrać."
              );
          }}
        />
      </BasicModal>
    </>
  );
};

export { ModalSelect };

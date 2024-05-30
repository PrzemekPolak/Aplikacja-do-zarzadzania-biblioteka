import { FormDatePicker } from "../../../components/FormFields/FormDatePicker";
import { SubmitButton } from "../../../components/FormFields/SubmitButton";
import { LIST_VARIANTS } from "../../../shared/constants/listVariants";
import { IBorrowedData } from "../../../shared/constants/queryModels/borrowed.model";
import { validate, validators } from "../../../shared/validators";
import { ModalSelect } from "../../ModalSelect";
import { DeleteButton } from "../../../components/Buttons";
import { DbTable } from "../../../../database/db.model";
import { LOAD_LINK_VARIANTS } from "@renderer/src/shared/constants/loadLinkVariants";

const borrowedFieldsConfig = (data: IBorrowedData) => {
  return {
    initialValues: {
      userId: null,
      bookId: null,
      borrowedDate: new Date().getTime(),
      returnedDate: null,
      rating: null,
    },
    validationSchema: validate({
      userId: validators.reqNumber,
      bookId: validators.reqNumber,
      borrowedDate: validators.reqNumber,
    }),
    elements: {
      template: [
        ". . . deleteBtn",
        "userId userId bookId bookId",
        "borrowedDate borrowedDate returnedDate returnedDate",
        ". submitButton submitButton .",
      ],
      items: [
        {
          name: "userId",
          initialData: data
            ? {
                id: data.userId,
                userName: data.userName,
                surname: data.surname,
                street: data.street,
                streetNumber: data.streetNumber,
                city: data.city,
              }
            : {},
          variant: LIST_VARIANTS.USER,
          modalTitle: "Wybierz użytkownika",
          component: ModalSelect,
        },
        {
          name: "bookId",
          initialData: data ? { id: data.bookId, title: data.title, author: data.author } : {},
          variant: LIST_VARIANTS.BOOK,
          modalTitle: "Wybierz książkę",
          component: ModalSelect,
        },
        {
          name: "borrowedDate",
          label: "Data wypożyczenia:",
          component: FormDatePicker,
        },
        {
          name: "returnedDate",
          label: "Data oddania:",
          component: FormDatePicker,
        },
        {
          name: "submitButton",
          component: SubmitButton,
        },
        {
          name: "deleteBtn",
          dbTable: DbTable.Borrowed.toString(),
          entryId: data?.id ?? "",
          navLink: LOAD_LINK_VARIANTS.borrowed,
          component: DeleteButton,
        },
      ],
    },
  };
};

export { borrowedFieldsConfig };

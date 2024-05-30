import { EndBorrowingButton } from "../../../components/Buttons";
import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IBorrowedData } from "../../../shared/constants/queryModels/borrowed.model";
import {Rating} from "../../../components/Rating";

const borrowedRowConfig = (values: IBorrowedData) => {
  return {
    template: [
      "fullName fullName phone title title title author author borrowedDate returnedDate returnedDate rating",
    ],
    items: [
      {
        name: "fullName",
        value: [values?.userId, values?.userName, values?.surname],
        variant: STANDARD_TEXT_VARIANTS.USER_NAME,
        component: StandardText,
      },
      {
        name: "phone",
        variant: STANDARD_TEXT_VARIANTS.PHONE,
        value: values?.phone,
        component: StandardText,
      },
      {
        name: "title",
        value: [values?.bookId, values?.title],
        variant: STANDARD_TEXT_VARIANTS.TITLE,
        component: StandardText,
      },
      {
        name: "author",
        value: values?.author,
        component: StandardText,
      },
      {
        name: "borrowedDate",
        label: "",
        value: values?.borrowedDate
          ? new Date(values?.borrowedDate).toLocaleDateString("pl")
          : null,
        component: StandardText,
      },
      {
        name: "returnedDate",
        date: values?.returnedDate ? new Date(values?.returnedDate).toLocaleDateString("pl") : null,
        entryId: values?.id,
        component: EndBorrowingButton,
      },
      {
        name: "rating",
        value: values.rating,
        borrowingIdentity: values.id,
        isBorrowed: null === values.returnedDate,
        component: Rating,
      },
    ],
  };
};

export { borrowedRowConfig };

import { EndBorrowingButton } from "../../../components/Buttons";
import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IBorrowedData } from "../../../shared/constants/queryModels/borrowed.model";
import {Rating} from "../../../components/Rating";

const userBorrowedConfig = (values: IBorrowedData) => {
  return {
    template: ["title title title author author borrowedDate returnedDate returnedDate rating rating"],
    items: [
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
        value: values?.borrowedDate
          ? new Date(values?.borrowedDate).toLocaleDateString("pl")
          : null,
        component: StandardText,
      },
      {
        name: "returnedDate",
        date: values?.returnedDate
          ? new Date(values?.returnedDate).toLocaleDateString("pl")
          : null,
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

export { userBorrowedConfig };

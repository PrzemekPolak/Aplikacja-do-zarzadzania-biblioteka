import { EndBorrowingButton } from "../../../components/Buttons";
import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IBorrowedData } from "../../../shared/constants/queryModels/borrowed.model";
import {Rating} from "../../../components/Rating";

const bookBorrowedConfig = (values: IBorrowedData) => {
  return {
    template: ["fullName fullName phone address address borrowedDate returnedDate returnedDate rating rating"],
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
        name: "address",
        value: [values?.street, values?.streetNumber, values?.city],
        variant: STANDARD_TEXT_VARIANTS.ADDRESS,
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
        date: values?.returnedDate ? new Date(values?.returnedDate).toLocaleDateString("pl") : null,
        entryId: values?.id,
        component: EndBorrowingButton,
      },
      {
        name: "rating",
        value: values?.rating,
        borrowingIdentity: values?.id,
        isBorrowed: null === values?.returnedDate,
        component: Rating,
      },
    ],
  };
};

export { bookBorrowedConfig };

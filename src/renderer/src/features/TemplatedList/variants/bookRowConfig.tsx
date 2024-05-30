import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IBookData } from "../../../shared/constants/queryModels/book.model";
import {AverageRating} from "../../../components/Rating";

const bookRowConfig = (values: IBookData) => {
  return {
    additionalStyles: { isBorrowedBackground: values.isBorrowed },
    template: ["title title title author author author rating rating"],
    items: [
      {
        name: "title",
        value: [values.id, values.title],
        variant: STANDARD_TEXT_VARIANTS.TITLE,
        component: StandardText,
      },
      {
        name: "author",
        value: values.author,
        component: StandardText,
      },
      {
        name: "rating",
        value: values.avgRating,
        component: AverageRating,
      },
    ],
  };
};

export { bookRowConfig };

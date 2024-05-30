import { StandardText } from "../../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../../components/StandardText/StandardText.model";
import { IBookData } from "../../../../shared/constants/queryModels/book.model";

const bookVariant = (values: IBookData) => {
  return {
    header: "Książka",
    template: ["title title title title", "author author author author"],
    items: [
      {
        name: "title",
        value: [values?.id, values?.title],
        variant: STANDARD_TEXT_VARIANTS.TITLE,
        sizeVariant: "h5",
        align: "center",
        hideIfEmpty: true,
        component: StandardText,
      },
      {
        name: "author",
        value: values?.author,
        align: "center",
        hideIfEmpty: true,
        component: StandardText,
      },
    ],
  };
};
export { bookVariant };

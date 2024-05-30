import { LinkButton } from "../../../components/Buttons";
import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IBookData } from "../../../shared/constants/queryModels/book.model";
import {AverageRating} from "../../../components/Rating";

const bookDetailsCard = (data: IBookData) => {
  return {
    template: [
      "title title title",
      "author author author",
      "rating rating rating",
      ". editBtn .",
    ],
    items: [
      {
        name: "title",
        value: [data?.id, data?.title],
        variant: STANDARD_TEXT_VARIANTS.TITLE,
        sizeVariant: "h5",
        align: "center",
        component: StandardText,
      },
      {
        name: "author",
        label: "Autor książki",
        value: data?.author,
        component: StandardText,
      },
      {
        name: "editBtn",
        label: "Edytuj",
        link: `/editBook/${data.id}`,
        component: LinkButton,
      },
      {
        name: "rating",
        value: data.avgRating,
        component: AverageRating,
      },
    ],
  };
};

export { bookDetailsCard };

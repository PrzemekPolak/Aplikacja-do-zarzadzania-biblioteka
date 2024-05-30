import {IBookData} from "../../../shared/constants/queryModels/book.model";
import {GridTemplate} from "../../../components/GridTemplate";
import {STANDARD_TEXT_VARIANTS} from "../../../components/StandardText/StandardText.model";
import {StandardText} from "../../../components/StandardText";
import {LinkButton} from "../../../components/Buttons";
import {StyledCard} from "./RecommendedBook.style";
import {AverageRating} from "../../../components/Rating";
import {ExcludeRecommendationButton} from "../../../components/Buttons";

const RecommendedBook = (book: IBookData) => {
  const bookConfig = (values: IBookData) => {
    return {
      additionalStyles: { isBorrowedBackground: values.isBorrowed },
      template: [". . exclude", "title title title", "author author author", "rating rating rating", "bookDetails bookDetails bookDetails"],
      items: [
        {
          name: "title",
          value: [values?.id, values?.title],
          variant: STANDARD_TEXT_VARIANTS.TITLE,
          align: "center",
          component: StandardText,
        },
        {
          name: "author",
          value: values?.author,
          align: "center",
          component: StandardText,
        },
        {
          name: "rating",
          value: values.avgRating,
          component: AverageRating,
        },
        {
          name: "bookDetails",
          label: "Szczegóły",
          link: `/bookDetails/${values?.id}`,
          component: LinkButton,
        },
        {
          name: "exclude",
          bookIdentity: values.id,
          component: ExcludeRecommendationButton,
        },
      ],
    };
  };

  return (
    <StyledCard>
      <GridTemplate
        items={bookConfig(book).items}
        template={bookConfig(book).template}
      />
    </StyledCard>
  );
}

export { RecommendedBook };

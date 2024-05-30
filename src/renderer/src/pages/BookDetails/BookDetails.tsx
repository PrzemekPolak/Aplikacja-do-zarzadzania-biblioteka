import { useLoaderData } from "react-router-dom";
import { DetailsCard } from "../../features/DetailsCard";
import { PageWithHeader } from "../../features/PageWithHeader";
import { SearchList } from "../../features/SearchList";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";

const BookDetails = () => {
  const bookData: IBookData = useLoaderData() as any;
  return (
    <PageWithHeader title="Detale książki">
      <DetailsCard variant={LIST_VARIANTS.BOOK} data={bookData} />
      <SearchList variant={LIST_VARIANTS.BOOK_BORROWED} />
    </PageWithHeader>
  );
};

export { BookDetails };

import { useNavigate } from "react-router-dom";
import { PageWithHeader } from "../../features/PageWithHeader";
import { SearchList } from "../../features/SearchList";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";

const BooksList = () => {
  const navigate = useNavigate();
  return (
    <PageWithHeader title="Lista książek">
      <SearchList
        variant={LIST_VARIANTS.BOOK}
        onElementClick={(item: IBookData) => navigate("/bookDetails/" + item.id)}
      />
    </PageWithHeader>
  );
};

export { BooksList };

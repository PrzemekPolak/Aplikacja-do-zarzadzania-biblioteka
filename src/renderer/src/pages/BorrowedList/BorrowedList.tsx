import { useNavigate } from "react-router-dom";
import { PageWithHeader } from "../../features/PageWithHeader";
import { SearchList } from "../../features/SearchList";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IBorrowedData } from "../../shared/constants/queryModels/borrowed.model";

const BorrowedList = () => {
  const navigate = useNavigate();
  return (
    <PageWithHeader title="Lista wypożyczeń">
      <SearchList
        variant={LIST_VARIANTS.BORROWED}
        onElementClick={(item: IBorrowedData) => {
          navigate("/editBorrowedEntry/" + item.id);
        }}
      />
    </PageWithHeader>
  );
};

export { BorrowedList };

import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";

const AddBorrowed = () => {
  return (
    <PageWithHeader title="Dodaj wypożyczenie">
      <AddEditForm variant={LIST_VARIANTS.BORROWED} />
    </PageWithHeader>
  );
};

export { AddBorrowed };

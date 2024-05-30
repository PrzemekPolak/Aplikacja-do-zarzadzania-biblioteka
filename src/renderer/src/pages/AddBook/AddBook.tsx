import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";

const AddBook = () => {
  return (
    <PageWithHeader title="Dodaj książkę">
      <AddEditForm variant={LIST_VARIANTS.BOOK} />
    </PageWithHeader>
  );
};

export { AddBook };

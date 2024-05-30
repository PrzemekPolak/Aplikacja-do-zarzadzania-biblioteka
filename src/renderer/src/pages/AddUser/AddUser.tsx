import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";

const AddUser = () => {
  return (
    <PageWithHeader title="Dodaj Użytkownika">
      <AddEditForm variant={LIST_VARIANTS.USER} />
    </PageWithHeader>
  );
};

export { AddUser };

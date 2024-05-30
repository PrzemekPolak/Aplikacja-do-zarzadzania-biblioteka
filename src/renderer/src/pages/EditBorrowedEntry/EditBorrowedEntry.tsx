import { useLoaderData } from "react-router-dom";
import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";

const EditBorrowedEntry = () => {
  const dataLoader = useLoaderData();
  return (
    <PageWithHeader title={"Edytuj wypożyczenie"}>
      <AddEditForm data={dataLoader} variant={LIST_VARIANTS.BORROWED} />
    </PageWithHeader>
  );
};

export { EditBorrowedEntry };

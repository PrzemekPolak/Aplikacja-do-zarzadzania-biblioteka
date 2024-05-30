import { useLoaderData } from "react-router-dom";
import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";

const EditBook = () => {
  const bookData: IBookData = useLoaderData() as any;
  return (
    <PageWithHeader
      title={`Edytuj książkę: [ ${bookData.id} ] ${bookData.title}`}
    >
      <AddEditForm data={bookData} variant={LIST_VARIANTS.BOOK} />
    </PageWithHeader>
  );
};

export { EditBook };

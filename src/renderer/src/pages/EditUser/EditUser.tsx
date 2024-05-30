import { useLoaderData } from "react-router-dom";
import { AddEditForm } from "../../features/AddEditForm";
import { PageWithHeader } from "../../features/PageWithHeader";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IUserData } from "../../shared/constants/queryModels/user.model";

const EditUser = () => {
  const userData: IUserData = useLoaderData() as any;
  return (
    <PageWithHeader
      title={["Edytuj użytkownika:", userData.userName, userData.surname].join(
        " "
      )}
    >
      <AddEditForm data={userData} variant={LIST_VARIANTS.USER} />
    </PageWithHeader>
  );
};

export { EditUser };

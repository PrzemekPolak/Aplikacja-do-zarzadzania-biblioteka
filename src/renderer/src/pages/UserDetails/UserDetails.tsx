import { useLoaderData } from "react-router-dom";
import { DetailsCard } from "../../features/DetailsCard";
import { PageWithHeader } from "../../features/PageWithHeader";
import { SearchList } from "../../features/SearchList";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IUserData } from "../../shared/constants/queryModels/user.model";

const UserDetails = () => {
  const userData: IUserData = useLoaderData() as any;
  return (
    <PageWithHeader title="Detale użytkownika">
      <DetailsCard variant={LIST_VARIANTS.USER} data={userData} />
      <SearchList variant={LIST_VARIANTS.USER_BORROWED} />
    </PageWithHeader>
  );
};

export { UserDetails };

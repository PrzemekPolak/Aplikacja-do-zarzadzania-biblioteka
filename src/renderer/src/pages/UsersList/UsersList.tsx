import { useNavigate } from "react-router-dom";
import { PageWithHeader } from "../../features/PageWithHeader";
import { SearchList } from "../../features/SearchList";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { IUserData } from "../../shared/constants/queryModels/user.model";

const UsersList = () => {
  const navigate = useNavigate();
  return (
    <PageWithHeader title="Lista Użytkowników">
      <SearchList
        variant={LIST_VARIANTS.USER}
        onElementClick={(item: IUserData) => {
          navigate("/userDetails/" + item.id);
        }}
      />
    </PageWithHeader>
  );
};

export { UsersList };

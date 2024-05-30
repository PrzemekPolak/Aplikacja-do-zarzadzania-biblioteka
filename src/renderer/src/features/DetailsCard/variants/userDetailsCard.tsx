import { LinkButton } from "../../../components/Buttons";
import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IUserData } from "../../../shared/constants/queryModels/user.model";
import {Recommendations} from "../../Recommendations";

const userDetailsCard = (data: IUserData) => {
  return {
    template: [
      ". fullName fullName editBtn",
      "phone phone . .",
      "address address . .",
      "recommendations recommendations recommendations recommendations",
    ],
    items: [
      {
        name: "fullName",
        value: [data?.id, data?.userName, data?.surname],
        variant: STANDARD_TEXT_VARIANTS.USER_NAME,
        sizeVariant: "h5",
        align: "center",
        component: StandardText,
      },
      {
        name: "phone",
        label: true,
        variant: STANDARD_TEXT_VARIANTS.PHONE,
        value: data?.phone,
        component: StandardText,
      },
      {
        name: "address",
        label: true,
        value: [data?.street, data?.streetNumber, data?.city],
        variant: STANDARD_TEXT_VARIANTS.ADDRESS,
        component: StandardText,
      },
      {
        name: "editBtn",
        label: "Edytuj",
        link: `/editUser/${data.id}`,
        component: LinkButton,
      },
      {
        name: "recommendations",
        component: Recommendations,
      },
    ],
  };
};

export { userDetailsCard };

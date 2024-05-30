import { StandardText } from "../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../components/StandardText/StandardText.model";
import { IUserData } from "../../../shared/constants/queryModels/user.model";

const userRowConfig = (values: IUserData) => {
  return {
    template: ["fullName fullName fullName phone phone address address address address"],
    items: [
      {
        name: "fullName",
        value: [values?.id, values?.userName, values?.surname],
        variant: STANDARD_TEXT_VARIANTS.USER_NAME,
        component: StandardText,
      },
      {
        name: "phone",
        variant: STANDARD_TEXT_VARIANTS.PHONE,
        value: values?.phone,
        component: StandardText,
      },
      {
        name: "address",
        value: [values?.street, values?.streetNumber, values?.city],
        variant: STANDARD_TEXT_VARIANTS.ADDRESS,
        component: StandardText,
      },
    ],
  };
};

export { userRowConfig };

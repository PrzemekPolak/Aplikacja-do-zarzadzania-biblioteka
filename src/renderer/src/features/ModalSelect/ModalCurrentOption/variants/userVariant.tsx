import { StandardText } from "../../../../components/StandardText";
import { STANDARD_TEXT_VARIANTS } from "../../../../components/StandardText/StandardText.model";
import { IUserData } from "../../../../shared/constants/queryModels/user.model";

const userVariant = (values: IUserData) => {
  return {
    header: "Użytkownik",
    template: ["fullName fullName fullName fullName", "address address address address"],
    items: [
      {
        name: "fullName",
        value: [values?.id, values?.userName, values?.surname],
        variant: STANDARD_TEXT_VARIANTS.USER_NAME,
        sizeVariant: "h5",
        align: "center",
        hideIfEmpty: true,
        component: StandardText,
      },
      {
        name: "address",
        value: [values.street, values.streetNumber, values.city],
        variant: STANDARD_TEXT_VARIANTS.ADDRESS,
        align: "center",
        hideIfEmpty: true,
        component: StandardText,
      },
    ],
  };
};
export { userVariant };

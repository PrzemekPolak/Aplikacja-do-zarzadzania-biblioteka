import { SubmitButton } from "../../../components/FormFields/SubmitButton";
import { TextInput } from "../../../components/FormFields/TextInput";
import { IUserData } from "../../../shared/constants/queryModels/user.model";
import { validate, validators } from "../../../shared/validators";
import { DeleteButton } from "../../../components/Buttons";
import { DbTable } from "../../../../database/db.model";
import { LOAD_LINK_VARIANTS } from "@renderer/src/shared/constants/loadLinkVariants";

const userFieldsConfig = (data: IUserData) => {
  return {
    initialValues: {
      userName: "",
      surname: "",
      phone: "",
      city: "",
      street: "",
      streetNumber: "",
    },
    validationSchema: validate({
      userName: validators.reqString,
      surname: validators.reqString,
    }),
    elements: {
      template: [
        ". . . deleteBtn",
        "userName userName surname surname",
        "phone phone . .",
        "city city . .",
        "street street streetNumber .",
        ". submitButton submitButton .",
      ],
      items: [
        {
          name: "userName",
          label: "Imię",
          required: true,
          component: TextInput,
        },
        {
          name: "surname",
          label: "Nazwisko",
          required: true,
          component: TextInput,
        },
        {
          name: "phone",
          label: "Numer telefonu",
          component: TextInput,
        },
        {
          name: "city",
          label: "Miasto",
          component: TextInput,
        },
        {
          name: "street",
          label: "Ulica",
          component: TextInput,
        },
        {
          name: "streetNumber",
          label: "Numer domu",
          component: TextInput,
        },
        {
          name: "submitButton",
          component: SubmitButton,
        },
        {
          name: "deleteBtn",
          dbTable: DbTable.User.toString(),
          entryId: data?.id ?? "",
          navLink: LOAD_LINK_VARIANTS.user,
          component: DeleteButton,
        },
      ],
    },
  };
};

export { userFieldsConfig };

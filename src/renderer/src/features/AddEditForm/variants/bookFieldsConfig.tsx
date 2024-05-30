import { SubmitButton } from "../../../components/FormFields/SubmitButton";
import { TextInput } from "../../../components/FormFields/TextInput";
import { IBookData } from "../../../shared/constants/queryModels/book.model";
import { validate, validators } from "../../../shared/validators";
import { DeleteButton } from "../../../components/Buttons";
import { LOAD_LINK_VARIANTS } from "@renderer/src/shared/constants/loadLinkVariants";
import {DbTable} from "../../../../database/db.model";

const bookFieldsConfig = (data: IBookData) => {
  return {
    initialValues: {
      title: "",
      id: "",
      author: "",
    },
    validationSchema: validate({
      title: validators.reqString,
      id: validators.reqNumber,
    }),
    elements: {
      template: [
        ". . . deleteBtn",
        "title title title title",
        "id author author author",
        ". submitButton submitButton .",
      ],
      items: [
        {
          name: "title",
          label: "Tytuł książki",
          required: true,
          component: TextInput,
        },
        {
          name: "id",
          label: "Id książki",
          required: true,
          component: TextInput,
        },
        {
          name: "author",
          label: "Autor książki",
          component: TextInput,
        },
        {
          name: "submitButton",
          component: SubmitButton,
        },
        {
          name: "deleteBtn",
          dbTable: DbTable.Book,
          entryId: data?.id ?? "",
          navLink: LOAD_LINK_VARIANTS.book,
          component: DeleteButton,
        },
      ],
    },
  };
};

export { bookFieldsConfig };

import { Form, Formik } from "formik";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { GridTemplate } from "../../components/GridTemplate";
import { LIST_VARIANTS, TListVariants } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";
import { IUserData } from "../../shared/constants/queryModels/user.model";
import { bookFieldsConfig } from "./variants/bookFieldsConfig";
import { borrowedFieldsConfig } from "./variants/borrowedFieldsConfig";
import { userFieldsConfig } from "./variants/userFieldsConfig";
import { useAlert } from "@renderer/src/shared/hooks/useAlert";
import { LOAD_LINK_VARIANTS } from "@renderer/src/shared/constants/loadLinkVariants";
import { useState } from "react";

const AddEditForm = ({
  data,
  variant,
}: {
  data?: IUserData | IBookData | any;
  variant: TListVariants;
}) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const [navigateId, setNavigateId] = useState<number>(0);

  const formVariant: any = {
    [LIST_VARIANTS.USER]: userFieldsConfig,
    [LIST_VARIANTS.BORROWED]: borrowedFieldsConfig,
    [LIST_VARIANTS.BOOK]: bookFieldsConfig,
  };
  useAlert(fetcher, () => {
    if (currentPath.includes("edit") && fetcher.data?.state?.success) {
      if (variant === LIST_VARIANTS.BOOK) navigate(LOAD_LINK_VARIANTS.bookBorrowed + navigateId);
      if (variant === LIST_VARIANTS.USER) navigate(LOAD_LINK_VARIANTS.userBorrowed + navigateId);
      if (variant === LIST_VARIANTS.BORROWED) navigate(LOAD_LINK_VARIANTS.borrowed);
    }
  });

  return (
    <>
      <Formik
        initialValues={data ? data : formVariant[variant](data).initialValues}
        validationSchema={formVariant[variant](data).validationSchema}
        onSubmit={(values, actions) => {
          setNavigateId(values.id);
          fetcher.submit(values, { method: "post" });
          if (currentPath.includes("addBorrowed"))
            actions.resetForm({ values: { ...values, bookId: undefined } });
          else if (currentPath.includes("add")) actions.resetForm(values);
        }}
        enableReinitialize={currentPath.includes("addBorrowed") ? false : true}
      >
        {() => (
          <Form>
            <GridTemplate {...formVariant[variant](data).elements} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export { AddEditForm };

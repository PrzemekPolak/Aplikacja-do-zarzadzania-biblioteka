import * as Yup from "yup";

const validate = (validators: Yup.ObjectShape) => {
  return Yup.object().shape(validators);
};

const validators = {
  reqNumber: Yup.number().typeError('Musisz wpisać liczbę').required("Wymagane pole"),
  reqString: Yup.string().required("Wymagane pole"),
};

export { validate, validators };

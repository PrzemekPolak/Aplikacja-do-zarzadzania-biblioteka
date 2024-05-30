import { TypographyProps, TypographyVariant } from "@mui/material";

type TStandardTextVariants = "title" | "userName" | "address" | "phone";

interface IStandardTextProps {
  value: Array<string | undefined | null> | string | undefined | null;
  variant?: TStandardTextVariants;
  sizeVariant?: TypographyVariant;
  align?: TypographyProps["align"];
  label?: string | boolean;
  hideIfEmpty?: boolean;
}

interface IStandardTextVariants {
  TITLE: "title";
  USER_NAME: "userName";
  ADDRESS: "address";
  PHONE: "phone";
}

const STANDARD_TEXT_VARIANTS: IStandardTextVariants = {
  TITLE: "title",
  USER_NAME: "userName",
  ADDRESS: "address",
  PHONE: "phone",
};

export { STANDARD_TEXT_VARIANTS };
export type { IStandardTextProps };

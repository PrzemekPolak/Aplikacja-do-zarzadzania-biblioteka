import { IStandardTextProps, STANDARD_TEXT_VARIANTS } from "./StandardText.model";
import {
  StyledContainer,
  StyledLabelTypography,
  StyledTextContainer,
  StyledTypography,
} from "./StandardText.style";

const StandardText = ({
  value,
  variant,
  sizeVariant = "body1",
  align,
  label,
  hideIfEmpty = false,
}: IStandardTextProps) => {
  const [finalText, finalLabel] = (() => {
    if (value?.constructor === Array) {
      const noValues: boolean = value.every((el) => !el);
      if (noValues && hideIfEmpty) return ["", ""];
      switch (variant) {
        case STANDARD_TEXT_VARIANTS.TITLE:
          return [`[ ${value[0]} ] ${value[1] ?? "<Brak tytułu>"}`, label && "Tytuł"];
        case STANDARD_TEXT_VARIANTS.USER_NAME:
          return [
            `[ ${value[0]} ] ${value[1] ?? "<Brak imienia>"} ${value[2] ?? "<Brak nazwiska>"}`,
            label && "Imię i nazwisko",
          ];
        case STANDARD_TEXT_VARIANTS.ADDRESS:
          return [
            noValues
              ? "<Brak adresu zamieszkania>"
              : `${value[0] ? `ul. ${value[0]}` : "<Brak ulicy>"} ${value[1] ?? "<Brak numeru>"} ${
                  value[2] ?? "<Brak miasta>"
                }`,
            label && "Adres zamieszkania",
          ];
        default:
          return [value.join(" ") ?? "", label && label];
      }
    } else {
      switch (variant) {
        case STANDARD_TEXT_VARIANTS.PHONE:
          return [
            value && typeof value === "string"
              ? value.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
              : "<Brak numery telefonu>",
            label && "Numer telefonu",
          ];
        default:
          return [value ?? "", label && label];
      }
    }
  })();

  return (
    <StyledContainer>
      <StyledTextContainer>
        {finalLabel && finalText && (
          <StyledLabelTypography variant="body2" align={align}>
            {finalLabel}
          </StyledLabelTypography>
        )}
        <StyledTypography variant={sizeVariant} align={align}>
          {finalText}
        </StyledTypography>
      </StyledTextContainer>
    </StyledContainer>
  );
};

export { StandardText };

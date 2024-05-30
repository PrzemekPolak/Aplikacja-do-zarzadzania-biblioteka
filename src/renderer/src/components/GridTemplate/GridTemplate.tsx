import { styled } from "@mui/system";

type StyledItem = {
  name: string;
  componentName: string;
};

type StyledTemplate = {
  $template: string[];
};

type TSingleItem = {
  name: string;
  component: (props: any) => JSX.Element;
  [key: string]: any;
};

type GridTemplateProps = {
  items: TSingleItem[];
  template: string[];
};

const StyledBox = styled("div", {
  shouldForwardProp: (prop: any) => !prop.startsWith("$"),
})<StyledTemplate>`
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  display: grid;
  grid-template-columns: repeat(
    ${({ $template }) => $template[0].split(" ").length},
    1fr
  );
  grid-template-areas: ${({ $template }) =>
    $template.map((item) => `'${item}'`).join(" ")};
`;

const StyledItem = styled("div")<StyledItem>`
  grid-area: ${({ name }) => {
    return name;
  }};
`;
const GridTemplate = ({ items, template }: GridTemplateProps) => {
  return (
    <StyledBox $template={template}>
      {items.map(({ component, ...props }, key) => (
        <StyledItem name={props.name} componentName={component.name} key={key}>
          {component(props)}
        </StyledItem>
      ))}
    </StyledBox>
  );
};

export { GridTemplate };

import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledPage = styled("div")`
  padding: 16px;
`;

const StyledDivider = styled(Divider)`
  margin-top: 32px;
  border-bottom-width: 2px;
`;

const PageWithHeader = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => {
  return (
    <StyledPage>
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      <Typography variant="h5" align="center">
        {subtitle}
      </Typography>
      <StyledDivider />
      <>{children}</>
    </StyledPage>
  );
};

export { PageWithHeader };

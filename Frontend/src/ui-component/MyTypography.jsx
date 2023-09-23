import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * @property fontSize 18, variant body2, padding 1
 */

const MyTypography = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  variant: "body2",
  padding: theme.spacing(1),
}));
export default MyTypography;

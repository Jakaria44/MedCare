import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Slide, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import server from "./../../HTTP/Auth";

export default function ConfirmOTP() {
  const { mail } = useParams();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Pleae try again"
  );
  const [otp, setOtp] = React.useState("");

  React.useEffect(() => {
    console.log(mail);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSigningIn(true);
    const data = new FormData(event.currentTarget);
    const otp = data.get("otp").trim();
    const email = decodeURIComponent(mail);
    console.log(otp, email);

    server
      .get(`/validateOtp/${otp}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.message);
        setSigningIn(false);
        navigate("/reset-password");
      })
      .catch((err) => {
        console.log(err);
        setSigningIn(false);
        setShowErrorMessage(true);
        setErrorMessage("Something went wrong. Pleae try again");
      });
  };

  return (
    <Slide in={true} direction="left">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" fontSize={29} mb={2} variant="h5">
            Confirm OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" align="left" gutterBottom mb={2}>
              Enter the OTP sent to your email address
            </Typography>
            <TextField
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/signin" variant="body2">
                  <Typography variant="body2" color="primary.main">
                    Remember password?
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <SpinnerWithBackdrop
          backdropOpen={signingIn}
          helperText="Please wait ..."
        />
        <ErrorModal
          showErrorMessage={showErrorMessage}
          errorMessage={errorMessage}
          HandleModalClosed={() => {
            setShowErrorMessage(false), setSigningIn(false);
          }}
        />
      </Container>
    </Slide>
  );
}

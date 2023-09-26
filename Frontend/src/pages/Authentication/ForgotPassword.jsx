import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Slide } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import server from "./../../HTTP/Auth";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [signingIn, setSigningIn] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Pleae try again"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSigningIn(true);
    const data = new FormData(event.currentTarget);
    const mail = data.get("email");
    console.log(mail);
    server
      .post(`/sendOtp/${mail}`)
      .then((res) => {
        console.log(res.data);
        setSigningIn(false);
        navigate("/confirm-otp/" + encodeURIComponent(mail));
      })
      .catch((err) => {
        console.log(err);
        setSigningIn(false);
        setShowErrorMessage(true);
        setErrorMessage("Something went wrong. Pleae try again");
      });
  };

  const isEmailValid = email ? emailRegex.test(email) : true;
  return (
    <Slide in={true} direction="right">
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
          <Typography component="h1" fontSize={24} mb={2} variant="h5">
            Enter your Email address
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!isEmailValid}
              onChange={(e) => setEmail(e.target.value)}
              helperText={
                isEmailValid ? "" : "Please enter a valid email address"
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/signin" variant="body2">
                  <Typography variant="body2" color="primary.main">
                    Remember password? Sign In
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

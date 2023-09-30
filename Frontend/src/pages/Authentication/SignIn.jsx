import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, InputAdornment, Slide } from "@mui/material";
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
export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [signingIn, setSigningIn] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Pleae try again"
  );
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const signin = async (user) => {
    try {
      console.log(user);
      const response = await server.post("/login", user);
      console.log(response.data);
      // user
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("role", response.data.userDto?.role);
      localStorage.setItem("image", response.data.userDto?.imageUrl);
      localStorage.setItem("name", response.data.userDto?.name);
      localStorage.setItem("user_id", response.data.userDto?.id);
      localStorage.setItem(
        "blood_group",
        response.data.userDto?.bloodDonatePostList.length > 0
          ? response.data.userDto?.bloodDonatePostList[0].bloodGroup
          : ""
      );

      //      doctor
      if (!response.data?.userDto || response.data?.doctorDtos) {
        localStorage.setItem("role", "ROLE_DOCTOR");
        localStorage.setItem(
          "image",
          response.data.doctorDtos?.profileImageUrl
        );
        localStorage.setItem("name", response.data.doctorDtos?.name);
        localStorage.setItem("doctor_id", response.data.doctorDtos?.id);
      }

      setSigningIn(false);
      // window.location.replace("/");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong");
      setShowErrorMessage(true);
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSigningIn(true);
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    signin(user);
  };

  const isEmailValid = email ? emailRegex.test(email) : true;
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
          <Typography component="h1" variant="h2">
            Sign in
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
            <Box sx={{ mb: 1 }} />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
                  <Typography variant="body2" color="primary.main">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  <Typography variant="body2" color="primary.main">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <SpinnerWithBackdrop
          backdropOpen={signingIn}
          helperText="Please wait while we signing you in"
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

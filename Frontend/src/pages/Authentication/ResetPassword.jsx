import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, InputAdornment, Slide, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import server from "./../../HTTP/Auth";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const [signingIn, setSigningIn] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong. Pleae try again"
  );
  const [newPass, setNewPass] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSigningIn(true);
    const data = new FormData(event.currentTarget);
    const newPass = data.get("newPass");
    console.log(newPass);
    let path = `/resetpassword/${newPass}`;
    let headers = {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    if (localStorage.getItem("name") === null) {
      path = `/forgotPassword/resetpassword/${localStorage.getItem(
        "token"
      )}/${newPass}`;
      headers = { "Content-type": "application/json" };
    }

    server
      .post(
        path,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("token");
        setSigningIn(false);
        window.location.replace("/signin");
      })
      .catch((err) => {
        console.log(err);
        setSigningIn(false);
        setShowErrorMessage(true);
        setErrorMessage("Something went wrong. Pleae try again");
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
            New Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" align="left" gutterBottom mb={2}>
              Enter your new password
            </Typography>
            {/* <TextField
              required
              fullWidth
              id="newPass"
              label="New Password"
              name="newPass"
              type="password"
              autoFocus
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            /> */}
            <TextField
              required
              fullWidth
              name="newPass"
              value={newPass}
              label="New Password"
              onChange={(e) => setNewPass(e.target.value)}
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
              Confirm
            </Button>
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

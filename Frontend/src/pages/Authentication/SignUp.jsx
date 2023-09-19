import { CameraAlt, Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useMemo, useState } from "react";
import { v4 } from "uuid";
import { districts } from "../../assets/bdInfo/districts";
import { divisions } from "../../assets/bdInfo/divisions";
import { upazilas } from "../../assets/bdInfo/upazilas";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import { storage } from "../../firebaseConfig";
import server from "./../../HTTP/Auth";
const defaultImage = "https://img.freepik.com/free-icon/user_318-159711.jpg";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        MedCare
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const isEmailValid = email ? emailRegex.test(email) : true;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Pleae try again"
  );
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const distOption = useMemo(
    () =>
      districts[2].data
        .filter((e) => e.division_id == selectedDivision?.id)
        .map((e) => ({ id: e.id, division_id: e.division_id, name: e.name })) ||
      [],
    [selectedDivision]
  );
  const upazilaOption = useMemo(
    () =>
      upazilas[2].data
        .filter((e) => e.district_id == selectedDistrict?.id)
        .map((e) => ({ id: e.id, district_id: e.district_id, name: e.name })) ||
      [],
    [selectedDistrict, selectedDivision]
  );

  // console.log(divisions);
  const divOption = divisions[2].data.map((e) => ({ id: e.id, name: e.name }));
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
      // console.log(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadImage = (data) => {
    const imageRef = ref(storage, `profile/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setPreviewUrl(url);
          getFormData(data, url);
          // setShowSuccessMessage(true);
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error uploading image");
      });
  };
  const postUser = async (fields) => {
    let response;
    try {
      response = await server.post("/signup", fields);
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("role", response.data.userDto.role);
      localStorage.setItem("image", response.userDto.imageUrl);
      localStorage.setItem("name", response.userDto.name);
      localStorage.setItem("user_id", response.data.userDto.id);
      console.log(response.data);

      setSigningUp(false);
      window.location.replace("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong");
      setShowErrorMessage(true);
      setSigningUp(false);
      console.log(err);
    }
  };
  const getFormData = (data, url) => {
    console.log(data);
    const fields = {
      imageUrl: url,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      addressReq: {
        division: selectedDivision?.name,
        district: selectedDistrict?.name,
        upazila: selectedUpazila?.name,
      },
      password: data.get("password"),
    };
    console.log(fields);
    postUser(fields);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSigningUp(true);
    if (selectedImage) {
      uploadImage(data);
    } else {
      getFormData(data, previewUrl);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Avatar
              alt="Preview"
              src={previewUrl}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item mt={17}>
            <IconButton variant="contained" color="primary" component="label">
              <CameraAlt />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </IconButton>
          </Grid>
        </Grid>

        <Typography component="h1" variant="h3">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!isEmailValid}
                onChange={(e) => setEmail(e.target.value)}
                helperText={
                  isEmailValid ? "" : "Please enter a valid email address"
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={divOption}
                id="division"
                value={selectedDivision || ""}
                autoHighlight
                getOptionLabel={(option) => option?.name || ""}
                renderOption={(props, option) => (
                  <li key={option.id} {...props}>
                    {option.name}
                  </li>
                )}
                onChange={(e, value) => {
                  setSelectedDivision(value);
                  setSelectedDistrict(null);
                  setSelectedUpazila(null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Select Division"
                    placeholder="Select Division"
                  />
                )}
                isOptionEqualToValue={(option, value) => 1 === 1}
                noOptionsText="No Division Matched"
              />
            </Grid>
            {selectedDivision && (
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  options={distOption}
                  id="district"
                  value={selectedDistrict || ""}
                  autoHighlight
                  getOptionLabel={(option) => option?.name || ""}
                  renderOption={(props, option) => (
                    <li key={option.id} {...props}>
                      {option.name}
                    </li>
                  )}
                  onChange={(e, value) => {
                    setSelectedDistrict(value);
                    setSelectedUpazila(null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Select District"
                      placeholder="Select District"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => 1 === 1}
                  noOptionsText="No District Matched"
                />
              </Grid>
            )}
            {selectedDivision && selectedDistrict && (
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  options={upazilaOption}
                  id="district"
                  value={selectedUpazila || ""}
                  autoHighlight
                  getOptionLabel={(option) => option?.name || ""}
                  renderOption={(props, option) => (
                    <li key={option.id} {...props}>
                      {option.name}
                    </li>
                  )}
                  onChange={(e, value) => setSelectedUpazila(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Select Upazilla"
                      placeholder="Select Upazilla"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => 1 === 1}
                  noOptionsText="No Upazilla Matched"
                />
              </Grid>
            )}
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false), setSigningUp(false);
        }}
      />
      <SpinnerWithBackdrop backdropOpen={signingUp} helperText="Signing Up" />
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}

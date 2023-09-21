import { Add, Delete } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SuccessfulModal from "../../component/SuccessfulModal";
import uploadImage from "../../utils/UploadImage";
import api from "./../../HTTP/httpCommonParam";
const WeekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const defaultFields = {
  name: "",
  description: "",
  specialization: "",
  profileImageUrl: "",
  cvUrl: "",
  email: "",
  appointmentFee: 0,
  doctorAvailabilities: [
    {
      startTime: "10:00",
      endTime: "17:00",
      weekDays: "sunday",
    },
  ],
};

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [fields, setFields] = useState(defaultFields);
  const [dp, setDp] = useState("");
  const [cv, setCv] = useState("");
  const [uploadText, setUploadText] = useState("Please Wait...");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const res = await api.get("/getSingleDoctor/" + id);
      console.log(res.data);

      setFields(res.data);
      setFields({
        ...res.data,
        description: res.data.description.replaceAll(/''/g, "'"),
      });
      setCv(res.data.cvUrl);
      setDp(res.data.profileImageUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    const previewDp = URL.createObjectURL(file);
    setFields((prev) => ({ ...prev, [field]: file }));
    if (field == "profileImageUrl") setDp(previewDp);
    else setCv(previewDp);
  };

  const handleChange = (value, index, field) => {
    console.log(value);
    let data = [...fields.doctorAvailabilities];
    data[index][field] = value;
    setFields((prev) => ({ ...prev, doctorAvailabilities: data }));
  };

  const addFields = () => {
    const lastObject =
      fields?.doctorAvailabilities?.[fields.doctorAvailabilities?.length - 1];
    let object = {
      startTime: lastObject?.startTime,
      endTime: lastObject?.endTime,
      weekDays: WeekDays[(WeekDays.indexOf(lastObject?.weekDays) + 1) % 7],
    };

    setFields((prev) => ({
      ...prev,
      doctorAvailabilities: [...prev.doctorAvailabilities, object],
    }));
  };

  const removeFields = (index) => {
    if (fields.doctorAvailabilities.length === 1) return;
    let data = [...fields.doctorAvailabilities];
    console.log(data);
    data.splice(index, 1);
    console.log(data);
    setFields((prev) => ({
      ...prev,
      doctorAvailabilities: data,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (cv === "" || dp === "") return;
    setUploading(true);
    submit();
  };
  const submit = async () => {
    try {
      let dpUrl, cvUrl;
      if (fields.profileImageUrl != dp) {
        setUploadText("Uploading Profile Picture...");
        dpUrl = await uploadImage(fields.profileImageUrl);
      } else {
        dpUrl = dp;
      }
      if (fields.cvUrl != cv) {
        setUploadText("Uploading CV...");
        cvUrl = await uploadImage(fields.cvUrl);
      } else {
        cvUrl = cv;
      }
      setUploadText("Uploading Data...");
      const values = {
        name: fields.name,
        specialization: fields.specialization,
        profileImageUrl: dpUrl,
        cvUrl: cvUrl,
        description: fields.description.replaceAll(/'/g, "''"),
        appointmentFee: parseInt(fields.appointmentFee),
        doctorAvailabilities: fields.doctorAvailabilities.map(
          (item, index) => ({
            weekDays: item.weekDays.toLowerCase(),

            startTime:
              item.startTime.split(":").length == 3
                ? item.startTime
                : item.startTime + ":00",
            endTime:
              item.endTime.split(":").length == 3
                ? item.endTime
                : item.endTime + ":00",
          })
        ),
      };

      console.log(values);
      let res;
      res = await api.put("/protect/doctor/update/" + fields.id, values);
      console.log(res.data);
      setShowSuccessMessage(true);
    } catch (err) {
      console.log(err);
      setShowErrorMessage(true);
    } finally {
      setFields(defaultFields);
      setCv("");
      setDp("");
      setUploading(false);
      navigate("/doctorprofile/" + fields.id);
    }
  };
  return (
    <Fragment>
      <Typography variant="h1" textAlign="center" gutterBottom>
        Doctor Details
      </Typography>
      <Grid
        container
        spacing={3}
        mt={3}
        component="form"
        onSubmit={submitHandler}
      >
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={3}
        >
          <Grid direction="column" item container xs={12}>
            <Grid
              item
              container
              direction="column"
              // justifyContent="center"
              alignItems="center"
              xs={12}
              spacing={3}
            >
              <Typography variant="h4" textAlign="center" gutterBottom>
                Profile Picture and CV
              </Typography>
              {/* <Divider width="70%" /> */}
              <Grid item sm={6} xs={12}>
                <Button variant="contained" component="label">
                  <Avatar
                    variant="square"
                    alt="Preview"
                    src={dp}
                    sx={{ width: 150, height: 200 }}
                  >
                    Profile Picture
                  </Avatar>

                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "profileImageUrl")}
                    style={{ display: "none" }}
                  />
                </Button>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button variant="contained" component="label">
                  <Avatar
                    variant="square"
                    alt="C"
                    src={cv}
                    sx={{ width: 150, height: 200 }}
                  >
                    CV
                  </Avatar>

                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "cvUrl")}
                    style={{ display: "none" }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          container
          direction="column"
          spacing={3}
          xs={12}
          md={4}
          mr={3}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Basic Information
          </Typography>
          {/* <Divider width="70%" textAlign="center" /> */}
          <Grid item xs>
            <TextField
              variant="standard"
              required
              fullWidth
              value={fields.name}
              id="name"
              label="Full Name"
              name="name"
              onChange={(e) =>
                setFields((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              variant="standard"
              fullWidth
              value={fields.email}
              // required
              disabled
              id="email"
              label="Email"
              type="email"
              name="email"
              onChange={(e) =>
                setFields((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs>
            <TextField
              variant="standard"
              required
              fullWidth
              value={fields.specialization}
              id="spec"
              label="Specialization"
              type="specialization"
              name="specialization"
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  specialization: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs>
            <TextField
              variant="standard"
              fullWidth
              required
              id="fee"
              name="appointmentFee"
              label="Appointment Fee"
              type="number"
              value={fields.appointmentFee}
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  appointmentFee: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              variant="standard"
              required
              fullWidth
              multiline
              maxRows={4}
              value={fields.description}
              id="description"
              label="Description"
              name="description"
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          container
          direction="column"
          spacing={3}
          xs={12}
          md={4}
          ml={3}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Availabile Times and Days
          </Typography>
          <>
            <List>
              {fields?.doctorAvailabilities?.map((form, index) => (
                <ListItem key={index}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-evenly"
                  >
                    {index !== 0 && (
                      <Divider width="100%" sx={{ marginTop: "2vh" }} />
                    )}
                    <Grid item xs={index === 0 ? 6 : 5}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          required
                          id="startTime"
                          variant="standard"
                          name="startTime"
                          label="Start Time"
                          type="time"
                          value={form.startTime}
                          onChange={(e) =>
                            handleChange(e.target.value, index, "startTime")
                          }
                        />
                        <TextField
                          variant="standard"
                          fullWidth
                          required
                          id="endTime"
                          name="endTime"
                          label="End Time"
                          type="time"
                          value={form.endTime}
                          onChange={(e) =>
                            handleChange(e.target.value, index, "endTime")
                          }
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={6} m="auto">
                      <FormControl fullWidth>
                        <InputLabel id="weekDays">Week Days</InputLabel>
                        <Select
                          fullWidth
                          required
                          variant="standard"
                          id="weekDays"
                          labelId="weekDays"
                          name="weekDays"
                          label="Week Days"
                          value={form.weekDays}
                          onChange={(e) =>
                            handleChange(e.target.value, index, "weekDays")
                          }
                        >
                          {WeekDays.map((day) => (
                            <MenuItem value={day}>{day}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {index !== 0 && (
                      <Grid
                        item
                        container
                        spacing={2}
                        direction="row"
                        xs={1}
                        justifyContent="space-evenly"
                      >
                        <Tooltip title="Delete">
                          <Grid item m="auto" xs>
                            <IconButton
                              color="error"
                              onClick={() => removeFields(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Button margin="auto" onClick={addFields} startIcon={<Add />}>
              Add
            </Button>
          </>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Tooltip
            title={
              dp === ""
                ? "Please upload a Profile Picture"
                : cv === ""
                ? "Please upload a CV"
                : "Update"
            }
            arrow
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              sx={{ marginTop: "2vh" }}
              onClick={submitHandler}
            >
              Update
            </Button>
          </Tooltip>
        </Grid>
        {/* <SpinnerWithBackdrop open={uploading} helperText={uploadText} /> */}

        {/* spinner with backdrop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={uploading || loading}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            margin="auto"
          >
            <CircularProgress color="inherit" />
            <Typography variant="body2" color="inherit" mt={2}>
              {uploadText}
            </Typography>
          </Box>
        </Backdrop>

        {/* success and error message */}
      </Grid>
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage="Successfully Registered. Please stay tuned for confirmation E-mail."
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />

      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage="Something went wrong"
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
    </Fragment>
  );
}

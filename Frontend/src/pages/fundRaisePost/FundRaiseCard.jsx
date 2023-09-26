import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ImageListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import PrettoSlider from "../../component/PrettoSlider";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import api from "./../../HTTP/httpCommonParam";
import AddNewFundPost from "./AddPost";
import DonateNow from "./DonateNow";

const MyTypography = ({ children, ...other }) => (
  <Typography
    gutterBottom
    variant="body2"
    fontSize={15}
    component="div"
    color="text.primary"
    sx={{ maxHeight: 48 }}
    noWrap
    {...other}
  >
    {children}
  </Typography>
);

const FundRaiseCard = ({ load, item, toApprove = false }) => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [showDonate, setShowDonate] = useState(false);

  const [editingFundPost, setEditingFundPost] = useState(false); // [editingFundPost, setEditingFundPost
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const approveFundPost = async () => {
    try {
      await confirm({
        title: "Approve Fund Post",
        description: "Are you sure you want to approve this Fund Post?",
        confirmationText: "Approve",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "success" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        setLoading(true);
        const res = await api.put(`/protect/fundPost/approve/${item.id}`);
        setSuccessMessage("Post Approved Successfully");
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        // setErrorMessage(err.response.item.message);
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFundPost = async () => {
    try {
      await confirm({
        title: "Delete Fund Post",
        description: "Are you sure you want to delete this Fund Post?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        setLoading(true);
        const res = await api.delete(`/fundpost/delete/${item.id}`);
        setSuccessMessage("Post Deleted Successfully");
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        console.log(err);
        // setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Card raised sx={{ width: { xs: "100%" } }} elevation={12}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              component={Link}
              to={"/userprofile/" + item?.userid}
            >
              M
            </Avatar>
          }
          // action={
          //   isMyPost ? (
          //     <IconButton aria-label="settings">
          //       <MoreVert />
          //     </IconButton>
          //   ) : null
          // }
          title={
            <Typography
              component={Link}
              to={"/userprofile/" + item?.userid}
              variant="body2"
              fontSize={18}
              sx={{ textDecoration: "none" }}
            >
              {item?.userName}
            </Typography>
          }
          subheader={TimeFormat(item?.approveDate)}
        />
        <ImageListItem
          cols={1}
          rows={2}
          sx={{ marginTop: "1vh" }}
          // onClick={() => {
          //   navigate("/userprofile/" + item?.userid);
          // }}
        >
          {item?.postImages?.length != 0 && (
            <img
              style={{ height: 360, width: "100%" }}
              src={item?.postImages[0]?.imageName}
              alt={item?.title}
              loading="lazy"
            />
          )}
        </ImageListItem>

        <CardContent marginBottom="0px">
          <Tooltip title={item.title.replaceAll(/''/g, "'")}>
            <MyTypography variant="h2">
              {item.title.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <Tooltip title={item.postContent}>
            <MyTypography variant="body2" noWrap>
              {item.postContent.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <MyTypography variant="body2" noWrap>
            Raised {item.donatedAmount} of {item.amount} BDT
          </MyTypography>
          <PrettoSlider
            valueLabelDisplay="auto"
            value={item.donatedAmount}
            max={item.amount}
          />
        </CardContent>
        <CardActions>
          <Box display="flex" flexGrow={1} justifyContent="space-between">
            {toApprove ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={approveFundPost}
                >
                  Approve
                </Button>{" "}
                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteFundPost}
                >
                  Decline
                </Button>
              </>
            ) : item.approve ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => setShowDonate(true)}
              >
                Donate Now
              </Button>
            ) : (
              <Button variant="contained" color="error" disabled>
                Not Approved
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/fundpost/" + item.id}
            >
              Details
            </Button>
          </Box>
        </CardActions>
      </Card>

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
      <AddNewFundPost
        fundPostProp={item}
        editing={true}
        open={editingFundPost}
        close={() => {
          setEditingFundPost(false);
          load();
        }}
      />
      <DonateNow
        open={showDonate}
        close={() => {
          setShowDonate(false);
          load();
        }}
        got={item.donatedAmount}
        due={item.amount}
        postId={item.id}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </>
  );
};

export default FundRaiseCard;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  ImageListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import PrettoSlider from "../../component/PrettoSlider";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
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

const FundRaiseCard = ({ load, fundPost, toApprove }) => {
  const confirm = useConfirm();
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
        const res = await api.put(`/protect/fundPost/approve/${fundPost.id}`);
        setSuccessMessage("Post Approved Successfully");
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        // setErrorMessage(err.response.fundPost.message);
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
        const res = await api.delete(`/fundpost/delete/${fundPost.id}`);
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
        <ImageListItem cols={1} rows={2}>
          <img
            style={{ height: 360, width: "100%" }}
            src={fundPost.postImages[0]?.imageName}
            alt={fundPost.title}
            loading="lazy"
          />
        </ImageListItem>

        <CardContent marginBottom="0px">
          <Tooltip title={fundPost.title.replaceAll(/''/g, "'")}>
            <MyTypography variant="h2">
              {fundPost.title.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <Tooltip title={fundPost.postContent}>
            <MyTypography variant="body2" noWrap>
              {fundPost.postContent.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <MyTypography variant="body2" noWrap>
            Raised {fundPost.donatedAmount} of {fundPost.amount} BDT
          </MyTypography>
          <PrettoSlider
            valueLabelDisplay="auto"
            value={fundPost.donatedAmount}
            max={fundPost.amount}
          />
        </CardContent>
        <CardActions>
          <Box display="flex" flexGrow={1} justifyContent="space-between">
            {toApprove ? (
              <>
                <Button variant="outlined" onClick={approveFundPost}>
                  Approve
                </Button>{" "}
                <Button variant="outlined" onClick={deleteFundPost}>
                  Decline
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setShowDonate(true)}>
                Donate Now
              </Button>
            )}

            <Button
              variant="outlined"
              component={Link}
              to={"/fundpost/" + fundPost.id}
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
        fundPostProp={fundPost}
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
        got={fundPost.donatedAmount}
        due={fundPost.amount}
        postId={fundPost.id}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </>
  );
};

export default FundRaiseCard;

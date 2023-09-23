import {
  Beenhere,
  CheckCircleOutline,
  Delete,
  Edit,
  OpenInNew,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../HTTP/httpCommonParam";
import Carousel from "../../component/Carousel";
import ErrorModal from "../../component/ErrorModal";
import PrettoSlider from "../../component/PrettoSlider";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import TimeFormat from "./../../utils/TimeFormat";
import AddPost from "./AddPost";
import DonateNow from "./DonateNow";

const FullWidthBox = ({ children, direction = "row", align = "center" }) => {
  return (
    <Box
      container
      display="flex"
      width="100%"
      flexDirection={direction}
      alignItems={align}
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
};

const SinglePost = () => {
  const small = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { id } = useParams();
  const [data, setData] = useState();
  const confirm = useConfirm();
  const [showDonate, setShowDonate] = useState(false);

  const [editingFundPost, setEditingFundPost] = useState(false); // [editingFundPost, setEditingFundPost
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        const res = await api.delete(`/fundpost/delete/${data.id}`);
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        load();
        navigate(-1);
      } catch (err) {
        console.log(err);
        // setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editFundPost = () => {
    setEditingFundPost(true);
  };
  const load = async () => {
    try {
      let res = await api.get("/fundpost/getallpost/false");
      let a = res.data.filter((item) => item.id == id)[0];
      if (a != undefined) setData(a);
      else {
        res = await api.get("/fundpost/getallpost/true");
        a = res.data.filter((item) => item.id == id)[0];
        setData(a);
      }
      console.log(a);
    } catch (err) {
      console.log(err);
      setData({});
    }
  };
  useEffect(() => {
    load();
  }, []);

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
        const res = await api.put(`/protect/fundPost/approve/${data.id}`);
        setSuccessMessage("Post Approved Successfully");
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        // setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reportFundPost = async () => {
    try {
      await confirm({
        title: "Report Fund Post",
        description: "Are you sure you want to report this Fund Post?",
        confirmationText: "Report",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        const res = await api.put(`/fundpost/report/${data.id}`);
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        // setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Footer = () => {
    if (data?.userid == localStorage.getItem("user_id"))
      return (
        <Stack direction="row" spacing={3}>
          {/* <Button onClick={editFundPost} startIcon={<Edit />}>
            Edit Post
          </Button> */}
          <Button
            variant="outlined"
            onClick={deleteFundPost}
            startIcon={<Delete />}
          >
            Delete Post
          </Button>
        </Stack>
      );
    else if (localStorage.getItem("role") == "ROLE_ADMIN")
      return (
        <Stack direction="row" spacing={3}>
          <Button
            variant="outlined"
            onClick={deleteFundPost}
            startIcon={<Delete />}
          >
            Delete Post
          </Button>
          {!data?.approve && (
            <Button
              variant="contained"
              onClick={approveFundPost}
              startIcon={<CheckCircleOutline />}
            >
              Approve Post
            </Button>
          )}
        </Stack>
      );
    // else return <Button onClick={reportFundPost}>Report Post</Button>;
  };

  return (
    <Stack
      // justifyContent="center"
      // alignItems="center"
      height="100%"
      width="100%"
      spacing={3}
      mx={2}
      px={3}
    >
      {!data ? (
        <Skeleton m="auto" variant="rectangular" height="70%" width="70%" />
      ) : (
        <Carousel items={data.postImages?.map((item) => item.imageName)} />
      )}
      {!data?.title ? (
        <Skeleton variant="text" />
      ) : (
        <Typography variant="h2" textAlign="center">
          {data.title}
        </Typography>
      )}

      {!data?.title ? (
        <Skeleton variant="text" />
      ) : (
        <FullWidthBox
          align={small ? "left" : "center"}
          direction={small ? "column" : "row"}
        >
          <Box display={"flex"} alignItems="center" flexDirection="row">
            <Person />
            <Typography variant="subtitle2" fontSize={17} mx={2}>
              Posted by:{"  "}
              {data.userid == localStorage.getItem("user_id")
                ? "You"
                : data.userName}
            </Typography>
          </Box>

          <Box display={"flex"} flexDirection="row" alignItems="center">
            <Edit />

            <Typography variant="subtitle2" fontSize={17} mx={2}>
              Posted on: {TimeFormat(data.createdDate)}
            </Typography>
          </Box>
          {!data?.approve && (
            <Box display={"flex"} flexDirection="row" alignItems="center">
              <Beenhere />

              <Typography
                variant="subtitle2"
                fontSize={17}
                mx={2}
                color={data.approve ? "success.main" : "error.main"}
              >
                Approved: {data.approve ? "Yes" : "No"}
              </Typography>
            </Box>
          )}
        </FullWidthBox>
      )}

      <Divider width="100%" />
      {data?.title && (
        <Typography variant="body1" fontSize={19} textAlign="justify">
          {data?.postContent}
        </Typography>
      )}
      {data && (
        <FullWidthBox>
          <Typography variant="body1" fontSize={19}>
            Raised {data.donatedAmount} BDT
          </Typography>
          <Box width="50%">
            <PrettoSlider
              value={data.donatedAmount}
              max={data.amount}
              valueLabelDisplay="auto"
            />
          </Box>
          <Typography variant="body1" fontSize={19}>
            Goal {data?.amount} BDT
          </Typography>
        </FullWidthBox>
      )}
      <Box width="100%" display="flex" justifyContent="center">
        <Tooltip
          title={data?.approve ? "Donate Now" : "This post is not approved yet"}
          arrow
        >
          <Button
            variant="contained"
            onClick={() => {
              if (data?.approve) setShowDonate(true);
            }}
          >
            Donate Now
          </Button>
        </Tooltip>
      </Box>
      <Divider width="100%" />
      {data?.proveDocuments.length && (
        <Stack spacing={2} direction="row">
          <Typography variant="h2">Proof Documents</Typography>
          {/* <Carousel
            items={data?.proveDocuments?.map((item) => item.documentName)}
          /> */}

          {data?.proveDocuments?.map((item) => (
            <Chip
              variant="outlined"
              component="a"
              href={item}
              target="_blank"
              label="View Document"
              icon={<OpenInNew />}
              clickable
            />
          ))}
        </Stack>
      )}
      <Stack spacing={2} />
      <Box width="100%" display="flex" justifyContent="center">
        <Footer />
      </Box>
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
      {data && (
        <AddPost
          fundPostProp={{
            ...data,
            images: data.postImages.map((item) => item.imageName),
            documents: data.proveDocuments.map((item) => item.documentName),
          }}
          editing={true}
          open={editingFundPost}
          close={() => {
            setEditingFundPost(false);
            load();
          }}
          load={load}
        />
      )}
      <DonateNow
        open={showDonate}
        close={() => {
          setShowDonate(false);
          load();
        }}
        got={data?.donatedAmount}
        due={data?.amount}
        postId={data?.id}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </Stack>
  );
};

export default SinglePost;

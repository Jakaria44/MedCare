import { CameraAlt, NoteAdd, RemoveCircle } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import imageUpload from "./../../HTTP/imageUpload";

import api from "../../HTTP/httpCommonParam";
const defaultFundPost = {
  title: "",
  postContent: "",
  amount: "",
  images: [],
  documents: [],
};
const AddPost = ({
  fundPostProp = defaultFundPost,
  editing = false,
  open,
  close,
  load,
}) => {
  const [formData, setFormData] = useState(fundPostProp);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(fundPostProp.images ?? []);
  const [documents, setDocuments] = useState(fundPostProp.documents);
  // console.log(documents, images);
  const uploadAllImages = async (imageUrls) => {
    try {
      let uploadedUrls = [];

      console.log(imageUrls);
      if (imageUrls.length === 0) return [];
      // Use Promise.all to handle multiple asynchronous calls concurrently
      await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const formData = new FormData();
          formData.append("image", imageUrl);

          const response = await imageUpload.post(
            "/api/v1/upload/upload",
            formData
          );
          const url = response.data.url;

          uploadedUrls.push(url); // Store the URL in the 'uploadedUrls' array
        })
      );

      return uploadedUrls; // Return the array of image URLs
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  // const uploadAllDocs = async (docs) => {
  //   try {
  //     let uploadedUrls = [];

  //     // Use Promise.all to handle multiple asynchronous calls concurrently
  //     await Promise.all(
  //       docs.map(async (file) => {
  //         const fileRef = ref(storage, `PostDocuments/${v4()}`);

  //         uploadBytes(fileRef, file)
  //           .then((snapshot) => {
  //             getDownloadURL(snapshot.ref).then((url) => {
  //               console.log(url);
  //               uploadedUrls.push(url); // Store the URL in the 'uploadedUrls' array
  //             });
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             alert("Error uploading image");
  //           });
  //       })
  //     );

  //     return uploadedUrls; // Return the array of image URLs
  //   } catch (err) {
  //     console.error(err);
  //     return [];
  //   }
  // };

  const submitHandler = async () => {
    setUploading(true);
    try {
      console.log(formData.images);
      let imgs = [];
      let docs = [];
      // if (editing) {
      //   imgs = await uploadAllImages(
      //     formData.images.filter(
      //       (item) => fundPostProp?.images.indexOf(item) === -1
      //     )
      //   );
      //   docs = await uploadAllImages(
      //     formData.documents.filter(
      //       (item) => fundPostProp?.documents.indexOf(item) === -1
      //     )
      //   );
      //   docs = docs.concat(fundPostProp?.documents);
      //   imgs = imgs.concat(fundPostProp?.images);
      //   console.log(imgs, docs);
      // } else {
      imgs = await uploadAllImages(formData.images);
      docs = await uploadAllImages(formData.documents);
      // }

      console.log(docs);
      const data = {
        title: formData.title.replaceAll(/'/g, "''"),
        amount: parseInt(formData.amount),
        postContent: formData.postContent.replaceAll(/'/g, "''"),
        postImages: imgs.map((item) => ({
          imageName: item,
        })),
        proveDocuments: docs.map((item) => ({
          documentName: item,
        })),
      };
      let res;
      if (!editing) res = await api.post("/protect/fundpost/create", data);
      else res = await api.put("/protect/fundpost/update/" + formData.id, data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      if (!editing) {
        setFormData(defaultFundPost);
        setImages([]);
        setDocuments([]);
      }
      setUploading(false);
      load();
      close();
    }
  };
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    const newImage = [...images];
    newImage.splice(index, 1);
    setImages(newImage);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const removeDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);

    const newImage = [...documents];
    newImage.splice(index, 1);
    setDocuments(newImage);
    setFormData({
      ...formData,
      documents: newDocuments,
    });
  };

  const handleImageChange = (event, index) => {
    const newImages = [...formData.images];
    newImages[index] = event.target.files[0];
    const newImage = images;
    newImage[index] = URL.createObjectURL(event.target.files[0]);
    setImages(newImage);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleDocumentChange = (event, index) => {
    // const newDocuments = [...formData.documents];
    // newDocuments[index] = event.target.files[0].name;
    // const newImage = documents;
    // newImage[index] = event.target.files[0];
    // setDocuments(newImage);
    // setFormData({
    //   ...formData,
    //   documents: newDocuments,
    // });

    const newImages = [...formData.documents];
    newImages[index] = event.target.files[0];
    const newImage = documents;
    newImage[index] = URL.createObjectURL(event.target.files[0]);
    setDocuments(newImage);
    setFormData({
      ...formData,
      documents: newImages,
    });
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        if (!editing) {
          setFormData(defaultFundPost);
          setImages([]);
          setDocuments([]);
        }
        close();
      }}
      component="form"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      fullWidth
    >
      <Box p={2}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          {editing ? "Edit Post" : "New Post"}
        </Typography>
        <Divider />

        <Stack m={2} spacing={3}>
          <TextField
            required
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            required
            label="Amount"
            fullWidth
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount:
                  e.target.value > 0 ? e.target.value : e.target.value * -1,
              })
            }
          />

          <TextField
            required
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={formData.postContent}
            onChange={(e) =>
              setFormData({
                ...formData,
                postContent: e.target.value,
              })
            }
          />

          <Stack spacing={2}>
            <Grid container direction="row" spacing={2}>
              {images.map((image, index) => (
                <Grid item key={index}>
                  {image && (
                    <Paper>
                      <img src={image} alt={index} height={300} width={300} />
                      <IconButton onClick={() => removeImage(index)}>
                        <RemoveCircle />
                      </IconButton>
                    </Paper>
                  )}
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="primary" component="label">
              <CameraAlt />
              Add Image
              <input
                accept="image/*"
                type="file"
                onChange={(e) => handleImageChange(e, formData.images.length)}
                style={{ display: "none" }}
              />
            </Button>
          </Stack>

          <Stack spacing={2}>
            <Grid container direction="row" spacing={2}>
              {documents?.map((image, index) => (
                <Grid item key={index}>
                  {image && (
                    <Paper>
                      <img src={image} alt={index} height={300} width={300} />
                      <IconButton onClick={() => removeDocument(index)}>
                        <RemoveCircle />
                      </IconButton>
                    </Paper>
                  )}
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="primary" component="label">
              <NoteAdd />
              Add Document
              <input
                // accept=".doc,.docx, .pdf"
                accept="image/*"
                type="file"
                onChange={(e) =>
                  handleDocumentChange(e, formData.documents.length)
                }
                style={{ display: "none" }}
              />
            </Button>
          </Stack>
        </Stack>
      </Box>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            if (!editing) {
              setFormData(defaultFundPost);
              setImages([]);
              setDocuments([]);
            }
            close();
          }}
        >
          Cancel
        </Button>
        <Button color="success" type="submit">
          {editing ? "Update" : "Add"}
        </Button>
      </DialogActions>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography variant="h4">Uploading...</Typography>
        </Box>
      </Backdrop>
    </Dialog>
  );
};

export default AddPost;

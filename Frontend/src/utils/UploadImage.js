
import imageUpload from "../HTTP/imageUpload";

const uploadImage = async(file) => {

  console.log(file);
  const formData = new FormData();
  formData.append("image", file);

  try{
    const res = await imageUpload.post('/api/v1/upload/upload' ,formData);
    console.log(formData, res.data);
    return res.data.url;
  }catch(err){
    console.log(err);
  }
}
export default uploadImage;
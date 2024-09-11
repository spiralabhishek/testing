'use client'
import { uploadImageAction } from "@/actions/uploadImageAction";

const UploadImage = () => {

  return (
    <>
      <form encType="multipart/form-data" action={uploadImageAction}>
        <label>Choose a file:</label>

        <input onChange={(e)=> {
          if (e.target.files) console.log(e.target.files[0]) 
        }} type="file" name="file" required />
        <input type="submit" value="Upload"/>
      </form>
      ;
    </>
  );
};

export default UploadImage;

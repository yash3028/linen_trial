import { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { postRequest } from "../utils/requests";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const UploadFile = () => {
  const [files, setFiles] = useState<any[]>([]);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0].file);
    formData.append("productId", "2");

    try {
      const res = await postRequest("/products/products/upload-file", formData);
      console.log(res.data);
      alert("File uploaded successfully");
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("File upload failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Upload Product File
          </Typography>

          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            name="file"
            labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
            acceptedFileTypes={["image/png", "image/jpeg"]}
          />

          <Box mt={2}>
            <Button variant="contained" onClick={handleUpload}>
              Upload File
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadFile;

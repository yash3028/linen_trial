import { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { postRequest } from "../utils/requests";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);
import { useLocation } from "react-router";
const UploadFile = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const location = useLocation();
  const product = location.state?.product;
  const productId = product?.id;
  const handleUpload = async () => {
    if (files.length === 0) {
      snackBarFunction("Select a File", "error");
      return;
    }
    console.log("ProductId from location:", location.state);
    const formData = new FormData();
    files.forEach((fileItem) => {
      formData.append("file", fileItem.file);
    });
    formData.append("productId", String(productId));

    try {
      const { data, error, message } = await postRequest(
        "/products/products/upload-file",
        formData,
      );
      if (error) {
        snackBarFunction(message, "error");
        return;
      }
      console.log(data);
      snackBarFunction(message || "File uploaded successfully", "success");
      setFiles([]);
    } catch (error: any) {
      console.error(error);
      snackBarFunction(error, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "primary.main",
        alignItems: "flex-start",
        pt: 6,
      }}
    >
      <Card sx={{ width: 400, bgcolor: "primary.main" }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Upload Product Image
          </Typography>
          {product && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "primary.main",
              }}
            >
              <Typography variant="body1">
                Product Code: {product.productCode}
              </Typography>
              <Typography variant="body1">Name:{product.name}</Typography>
            </Box>
          )}
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            name="file"
            labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
            acceptedFileTypes={["image/png", "image/jpeg"]}
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleUpload}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadFile;

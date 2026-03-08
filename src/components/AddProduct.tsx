import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { postRequest } from "../utils/requests";
import { useNavigate } from "react-router";

const AddProduct = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const [product, setProduct] = useState<{
    productCode: string;
    productFamily: string;
    name: string;
    color: string;
    price: string;
    status: string;
  }>({
    productCode: "",
    productFamily: "",
    name: "",
    color: "",
    price: "",
    status: "A",
  });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error, message } = await postRequest(
      "/api/products/save-product",
      product,
    );
    if (error) {
      snackBarFunction(message, "error");
    }
    snackBarFunction("Product Added Successfully", "success");
    navigate("/upload-file");
    console.log("Product", data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.main",
      }}
    >
      <Card sx={{ width: 500, p: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" mb={3} textAlign="center">
            Add Product
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Product Code"
                  name="productCode"
                  value={product.productCode}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Product Family"
                  name="productFamily"
                  value={product.productFamily}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="I">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ color: "primary.main", bgcolor: "secondary.main" }}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProduct;

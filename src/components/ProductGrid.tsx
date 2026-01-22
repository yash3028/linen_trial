import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { getRequest } from "../utils/requests";
import { useNavigate } from "react-router";
import { BannerImageSlider } from "./BannerImageSlider";

export const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error, message } = await getRequest(
          `/products/products/get-all-products?limit=${limit}&page=${page}`,
        );
        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        const result: any = (data as any).products;
        setProducts(result);
        setTotalCount((data as any).count);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 0,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "primary.main",
        pb: 2,
        gap: 2,
      }}
    >
      <BannerImageSlider
        images={[
          {
            url: "https://ranadeepreddyshyamakura.info/mdms/images/combined/S_P-40.jpg",
          },
        ]}
      ></BannerImageSlider>

      {!loading && (
        <Grid
          container
          spacing={{ xs: 0, sm: 1, md: 2 }}
          sx={{ justifyContent: "center" }}
        >
          {products.map((product: any) => (
            <Grid
              size={{ xs: 6, sm: 3, md: 4, lg: 2 }}
              key={product.id}
              display={"flex"}
              gap={1}
              p={0.7}
            >
              <Card
                variant="outlined"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "0",
                  border: "none",
                  borderColor: "primary.main",
                  cursor: "pointer",
                  backgroundColor: "primary.main",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.images[0].url}
                  alt={product.name}
                  sx={{ width: "210px", height: "auto" }}
                />
                <CardContent sx={{ ml: 0, pl: 0, pt: 0 }}>
                  <Typography
                    sx={{ textTransform: "uppercase" }}
                    color="text.primary"
                    fontSize={"0.9rem"}
                    fontWeight={"bold"}
                  >
                    {product.name}
                  </Typography>
                  <Typography color="text.primary" fontSize={"0.8rem"}>
                    RS. {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        <Button
          variant="outlined"
          sx={{ color: "text.primary" }}
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          sx={{ color: "text.primary" }}
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

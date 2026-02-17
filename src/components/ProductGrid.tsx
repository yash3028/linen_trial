import React, { useEffect, useState } from "react";
import {
  Grid,
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
  function scrollToSection() {
    const element = document.getElementById("products");
    element?.scrollIntoView({
      behavior: "smooth", // Animated scroll
      block: "start", // Aligns element to top of viewport
    });
  }
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
        backgroundColor: "primary.main",
        pb: 2,
        gap: 2,
      }}
    >
      <BannerImageSlider
        images={[
          {
            url: "https://thetruetouch.in/mdms/images/combined/1.JPG",
          },
          {
            url: "https://thetruetouch.in/mdms/images/combined/2.JPG",
          },
        ]}
        onClickAction={scrollToSection}
      ></BannerImageSlider>
      {/* <div className="flex flex-col items-center w-full p-1">
        <div className="bg-slate-100 rounded-b-xl"></div>
      </div> */}
      <div id="products">
        <Typography
          variant="h5"
          textTransform={"uppercase"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          The Earth Essentials
        </Typography>
        {!loading && (
          <Grid
            container
            spacing={{ xs: 0, sm: 1, md: 2 }}
            justifyContent={{ xs: "start", md: "center" }}
          >
            {products.map((product: any) => (
              <Grid
                size={{ xs: 6, sm: 3, md: 4, lg: 2 }}
                key={product.id}
                display={"flex"}
                gap={1}
                p={0.7}
              >
                <div className="rounded-xl border-1 bg-slate-100">
                  <Box
                    onClick={() => {
                      navigate(
                        `/the-earth-essentials/product/${product.productCode}`,
                      );
                    }}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.images[0].url}
                      alt={product.name}
                      sx={{ width: "210px", height: "auto" }}
                      className="rounded-t-xl"
                    />
                    <CardContent sx={{ ml: 0, pl: 0.5, pt: 0 }}>
                      <Typography
                        sx={{ textTransform: "uppercase" }}
                        color="text.primary"
                        fontSize={"0.8rem"}
                        fontWeight={"bold"}
                      >
                        {product.name}
                      </Typography>
                      <Typography color="text.primary" fontSize={"0.8rem"}>
                        INR {product.price}
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && page > 1 && (
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
        )}
      </div>
    </Paper>
  );
};

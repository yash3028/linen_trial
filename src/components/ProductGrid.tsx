import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Paper, Box, Button, Grid } from "@mui/material";
import { getRequest } from "../utils/requests";
import { useNavigate } from "react-router";
import { BannerImageSlider } from "./BannerImageSlider";
import { product_status } from "../utils/master";

export const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string | null>(null);

  function scrollToSection() {
    const element = document.getElementById("products");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error, message } = await getRequest(
          `/products/products/get-all-products?limit=${limit}&page=${page}&category=${category}`,
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
    if (category) {
      fetchData();
    }
  }, [category, page]);

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
      />

      <div id="products">
        <Typography
          variant="h5"
          textTransform="uppercase"
          textAlign="center"
          fontWeight="bold"
        >
          The Earth Essentials
        </Typography>

        {(!category || category == "trousers") && (
          <Grid
            container
            spacing={{ xs: 0, sm: 1, md: 2 }}
            justifyContent={{ xs: "start", md: "center" }}
          >
            <Grid
              size={{ xs: 6, sm: 3, md: 4, lg: 2 }}
              display={"flex"}
              gap={1}
              p={0.7}
            >
              <div className="rounded-xl border-1 bg-slate-100">
                <Box
                  sx={{
                    height: "auto",
                    maxWidth: "210px",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => setCategory("shirts")}
                >
                  <CardMedia
                    component="img"
                    image="https://thetruetouch.in/mdms/images/white/minimized/4.jpeg"
                    sx={{ height: "auto" }}
                    className="rounded-t-xl"
                  />
                  <Box sx={{ ml: 0, pl: 0.7, pt: 0 }}>
                    <Typography
                      fontSize={"0.8rem"}
                      fontWeight={"bold"}
                      textTransform="uppercase"
                      textAlign={"center"}
                    >
                      Shirts
                    </Typography>
                  </Box>
                </Box>
              </div>
            </Grid>

            <Grid
              size={{ xs: 6, sm: 3, md: 4, lg: 2 }}
              display={"flex"}
              gap={1}
              p={0.7}
            >
              <div className="rounded-xl border-1 bg-slate-100">
                <Box
                  sx={{
                    height: "auto",
                    maxWidth: "210px",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => setCategory("trousers")}
                >
                  <CardMedia
                    component="img"
                    image="https://thetruetouch.in/mdms/images/trouser/minimized/1.jpeg"
                    sx={{ height: "auto" }}
                    className="rounded-t-xl"
                  />
                  <Box sx={{ ml: 0, pl: 0.7, pt: 0 }}>
                    <Typography
                      fontSize={"0.8rem"}
                      fontWeight={"bold"}
                      textTransform="uppercase"
                      textAlign={"center"}
                    >
                      Trousers
                    </Typography>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        )}

        {category == "shirts" && (
          <>
            <Box textAlign="center" mt={2}>
              <Button variant="outlined" onClick={() => setCategory(null)}>
                Back
              </Button>
            </Box>

            {loading && (
              <Typography textAlign="center" mt={2}>
                Loading...
              </Typography>
            )}

            {!loading && (
              <>
                <Grid
                  container
                  spacing={{ xs: 0, sm: 1, md: 2 }}
                  justifyContent={{ xs: "start", md: "center" }}
                >
                  {products?.map((product: any) => (
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
                            if (product.status === "A")
                              navigate(
                                `/the-earth-essentials/product/${product.productCode}`,
                              );
                          }}
                          sx={{
                            height: "auto",
                            maxWidth: "210px",
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={product.images[0].url}
                            alt={product.name}
                            sx={{ height: "auto" }}
                            className="rounded-t-xl"
                          />
                          <Box sx={{ ml: 0, pl: 0.7, pt: 0 }}>
                            <Typography
                              sx={{ textTransform: "uppercase" }}
                              color="text.primary"
                              fontSize={"0.8rem"}
                              fontWeight={"bold"}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              color="text.primary"
                              fontSize={"0.8rem"}
                              letterSpacing={2}
                            >
                              INR {product.price}
                            </Typography>
                            <Typography
                              color={
                                product_status[
                                  product.status as keyof typeof product_status
                                ].color
                              }
                              fontSize={"0.8rem"}
                              textTransform={"uppercase"}
                              fontWeight={"bold"}
                              letterSpacing={4}
                            >
                              {
                                product_status[
                                  product.status as keyof typeof product_status
                                ].description
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </Grid>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={2} gap={2}>
                    <Button
                      variant="outlined"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>

                    <Typography>
                      Page {page} of {totalPages}
                    </Typography>

                    <Button
                      variant="outlined"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Paper>
  );
};

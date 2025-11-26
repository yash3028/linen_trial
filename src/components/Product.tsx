import { Box, Paper, Typography } from "@mui/material";
import { ImageSlider } from "./ImageSlider";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/requests";
import { CustomButton } from "./CustomButton";

export const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [sizeArray, setSizeArray] = useState<Array<boolean>>(
    new Array(5).fill(false)
  );
  const selectSize = (
    index: number,
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newSizeArray = new Array(5).fill(false);
    newSizeArray[index] = sizeArray[index] ? false : true;
    setSizeArray(newSizeArray);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("here");
        const { data, error, message } = await getRequest(
          `/products/products/get-product/${id}`
        );

        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        setProduct(data);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Paper
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          boxSizing: "border-box",
          borderRadius: 0,
          justifyContent: "flex-start",
          gap: 2,
          backgroundColor: "primary.main",
          p: { sx: 0, lg: 5 },
        }}
      >
        <Box width={{ xs: "100%", lg: "50%" }}>
          {!loading && product && <ImageSlider images={product.images || []} />}
        </Box>
        <Box>
          <Box>
            {!loading && <Typography variant="h4">{product.name}</Typography>}
          </Box>
          <Typography>Size</Typography>
          <Box flexDirection={"row"} flexWrap={"wrap"} display={"flex"} gap={2}>
            {["XS", "S", "M", "L", "XL"].map((size: string, index: number) => (
              <CustomButton
                label={size}
                index={index}
                isSelectedArray={sizeArray}
                onClick={selectSize}
              ></CustomButton>
            ))}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

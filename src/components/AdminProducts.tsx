import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getRequest } from "../utils/requests";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AdminProducts = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getRequest<any>("/products/products/get-all-products");

      if (res.error) {
        snackBarFunction(res.message, "error");
        return;
      }
      if (res.data) {
        snackBarFunction("Products loaded", "success");
        console.log(res);

        setProducts(res.data.products || []);
      }
    };

    fetchProducts();
  }, []);

  const handleToggle = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <Box sx={{ backgroundColor: "primary.main", minHeight: "100vh", py: 3 }}>
      <Box display="flex" justifyContent="flex-end" px={4} mb={2}>
        <Button
          sx={{ backgroundColor: "secondary.main", color: "primary.main" }}
          variant="contained"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </Button>
      </Box>

      <Box sx={{ px: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Family</TableCell>
                <TableCell>Color</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product: any, index) => (
                <React.Fragment key={product.id}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggle(index)}
                        >
                          {openRow === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>

                        {product.name}
                      </Box>
                    </TableCell>

                    <TableCell>{product.price}</TableCell>

                    <TableCell>{product.productFamily}</TableCell>

                    <TableCell>{product.color}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4} sx={{ p: 0 }}>
                      <Collapse in={openRow === index}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            p: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          {product.images?.map((img: any, i: number) => (
                            <img
                              key={i}
                              src={img.url}
                              width="120"
                              style={{ borderRadius: "8px" }}
                            />
                          ))}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminProducts;

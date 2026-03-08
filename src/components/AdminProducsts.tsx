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
      const res = await getRequest<any>("/api/products/get-all-products");

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
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={() => navigate("/add-product")}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ border: "1px solid #ccc" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>Name</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                Price
              </TableCell>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                Family
              </TableCell>
              <TableCell>Color</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product: any, index) => (
              <React.Fragment key={product.id}>
                <TableRow>
                  <TableCell sx={{ borderRight: "1px solid #ccc" }}>
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

                  <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                    {product.price}
                  </TableCell>

                  <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                    {product.productFamily}
                  </TableCell>

                  <TableCell>{product.color}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} sx={{ p: 0 }}>
                    <Collapse in={openRow === index}>
                      <Box sx={{ display: "flex", gap: 2, p: 2 }}>
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
  );
};

export default AdminProducts;

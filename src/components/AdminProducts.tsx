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
  Typography,
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

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getRequest<any>(
        `/products/products/get-all-products?page=${page}&limit=${limit}`,
      );

      if (res.error) {
        snackBarFunction(res.message, "error");
        return;
      }

      if (res.data) {
        setProducts(res.data.products || []);
        setTotalCount(res.data.count || 0);
      }
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(totalCount / limit);

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
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>

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
                    <TableCell colSpan={5} sx={{ p: 0 }}>
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

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <Button
              variant="outlined"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              sx={{ bgcolor: "secondary.main", color: "primary.main" }}
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
              sx={{ bgcolor: "secondary.main", color: "primary.main" }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminProducts;

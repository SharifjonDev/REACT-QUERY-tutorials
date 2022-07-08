import axios from "axios";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Alert,
  AlertTitle,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const getAllData = () => {
  return axios.get("http://localhost:4000/rtkData");
};

const removeData = async (id: number) => {
  await fetch(`http://localhost:4000/rtkData/${id}`, {
    method: "DELETE",
  });
};

const Product = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(removeData);

  const { data, isError, isLoading } = useQuery("rtkdata", getAllData);

  const handleRemove = async (id: number) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("rtkdata");
  };

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    );
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map(
              (item: { id: number; name: string; job: string }) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.job}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Product;

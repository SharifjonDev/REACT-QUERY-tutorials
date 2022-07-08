import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const navigate = useNavigate();

  const addData = (data: { name: string; job: string }) => {
    return axios.post("http://localhost:4000/rtkData", data);
  };

  const useAddData = () => {
    return useMutation(addData);
  };

  const { mutate } = useAddData();

  const handleSubmited = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, job });
    navigate("/products");
    setName("");
    setJob("");
  };

  return (
    <React.Fragment>
      <FormGroup
        style={{ width: "100%", display: "grid", placeItems: "center" }}
      >
        <FormControl sx={{ m: 1, width: "400px" }}>
          <InputLabel htmlFor="name">Your name</InputLabel>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="name"
            aria-describedby="my-helper-text"
            value={name}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "400px" }}>
          <InputLabel htmlFor="name">Your job</InputLabel>
          <Input
            onChange={(e) => setJob(e.target.value)}
            id="name"
            aria-describedby="my-helper-text"
            value={job}
          />
        </FormControl>
        <Button sx={{ m: 1 }} variant="contained" onClick={handleSubmited}>
          Click Me
        </Button>
      </FormGroup>
    </React.Fragment>
  );
};

export default Pricing;

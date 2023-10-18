"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const FilePackViewPage = ({ params }) => {
  const [fpData, setFpData] = useState({});
  const [files, setFiles] = useState([]);

  async function getFilePack() {
    try {
      const res = await axios.get(
        `${process.env.API_URL}/filepack/${params.id}`
      );
      setFpData(res.data);
      getFiles();
    } catch (error) {
      console.log(error);
    }
  }

  async function getFiles() {
    try {
      const res = await axios.get(
        `${process.env.API_URL}/file/fromtransfer/${params.id}`
      );
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getFilePack, []);

  return (
    <Box>
      <Typography sx={{ fontSize: 14 }} noWrap component="div" color="black">
        Transfer #{fpData !== null ? fpData.id : "Error connecting to server"}
      </Typography>
      <Typography
        variant="h5"
        sx={{ marginBottom: "1rem" }}
        noWrap
        component="div"
        color="black"
      >
        {fpData !== null ? fpData.subject : "Error connecting to server"}
      </Typography>
      <Typography
        sx={{ fontSize: 14, marginBottom: "2rem" }}
        noWrap
        component="div"
        color="black"
      >
        {fpData !== null ? fpData.message : "Error connecting to server"}
      </Typography>
      <Box sx={{ minHeight: "4rem", display: "flex", flexWrap: "wrap" }}>
        {files.length > 0 ? (
          files.map((file) => {
            return (
              <Box key={file.id} sx={{ margin: "1rem 1rem 2rem 0rem" }}>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 18 }} noWrap component="div">
                      {file.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, marginBottom: "1rem" }}
                      noWrap
                      component="div"
                    >
                      {file.size > 1000
                        ? file.size / 1000 + " MB"
                        : file.size + " KB"}
                    </Typography>
                    <Button variant="contained">Download</Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </Box>
      <Button variant="contained">Download all</Button>
    </Box>
  );
};

export default FilePackViewPage;

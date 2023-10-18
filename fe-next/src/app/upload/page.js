"use client";

import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Title } from "@mui/icons-material";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sendTo, setSendTo] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const lotID = 1;

  function saveFiles(e) {
    var temp = [];
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fData = e.target.result;
        temp.push({
          name: file.name,
          size: file.size,
          content: fData,
        });
      };
      reader.readAsDataURL(file);
    });
    setFiles(Array.from(e.target.files));
    setFileData(temp);
  }

  async function uploadFiles() {
    if (files.length === 0) {
      alert("Please select a file");
      return;
    } else if (subject === "" || subject === null) {
      alert("Please enter a subject for the file transfer");
      return;
    }

    try {
      const qparams = `?sentFromID=${lotID}&sendToID=${sendTo}&subject=${subject}&message=${message}`;
      const res = await axios.post(
        `${process.env.API_URL}/transfer${qparams}`,
        fileData
      );
      console.log(res);
      setHasUploaded(true);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      {!hasUploaded ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" noWrap component="div" color="black">
            Send A Transfer
          </Typography>
          <TextField
            required
            id="subject"
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            id="message"
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
          />
          <InputLabel sx={{ marginTop: "1rem" }}>Upload Files</InputLabel>
          <input
            type="file"
            name="files"
            onChange={(e) => saveFiles(e)}
            multiple
            style={{ margin: "0.5rem 0rem 1rem 0rem" }}
          />

          <Box sx={{ minHeight: "4rem" }}>
            {files.length > 0 ? (
              files.map((file, i) => {
                if (selectedFile !== null && selectedFile === i) {
                  return (
                    <Box sx={{ width: "100%" }} key={file.name}>
                      <embed
                        className="file-viewer"
                        src={URL.createObjectURL(file)}
                        style={{ width: "100%", minHeight: "500px" }}
                      />
                    </Box>
                  );
                }
                return (
                  <Box>
                    <Typography variant="h6" noWrap component="div">
                      {file.name}{" "}
                      {file.size > 1000
                        ? file.size / 1000 + " MB"
                        : file.size + " KB"}
                    </Typography>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </Box>
          <InputLabel id="demo-simple-select-label">Send To</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={"Send To"}
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
            sx={{ "margin-bottom": "1rem" }}
          >
            <MenuItem value={0}>Colfax</MenuItem>
            <MenuItem value={1}>Charlotte</MenuItem>
            <MenuItem value={2}>Smithfield</MenuItem>
          </Select>
          <Button
            onClick={() => uploadFiles()}
            variant="contained"
            sx={{ maxWidth: "max-content" }}
          >
            Send Transfer
          </Button>
        </Box>
      ) : (
        <Box>
          Your file has been uploaded
          <Button
            variant="contained"
            onClick={() => setHasUploaded(false)}
            sx={{ maxWidth: "max-content" }}
          >
            Send another
          </Button>
        </Box>
      )}
    </>
  );
};

export default UploadPage;

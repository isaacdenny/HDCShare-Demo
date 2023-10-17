"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sendTo, setSendTo] = useState(0);
  const [subject, setSubject] = useState("New Transfer");

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
    }

    try {
      const qparams = `?sentFromID=${lotID}&sendToID=${sendTo}&subject=${subject}`;
      const res = await axios.post(
        `${process.env.API_URL}/transfer${qparams}`,
        fileData
      );
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="subject"
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label>Upload Files</label>
          <input
            type="file"
            name="files"
            onChange={(e) => saveFiles(e)}
            multiple
          />
          <Box>
            {files.length > 0 ? (
              files.map((file, i) => {
                if (selectedFile !== null && selectedFile === i) {
                  return (
                    <embed
                      className="file-viewer"
                      key={file.name}
                      src={URL.createObjectURL(file)}
                    />
                  );
                }
                return (
                  <div
                    className="file"
                    key={file.name}
                    onClick={() => setSelectedFile(i)}
                  >
                    {file.name} {file.size}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Send To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Send To"}
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
            >
              <MenuItem value={0}>Colfax</MenuItem>
              <MenuItem value={1}>Charlotte</MenuItem>
              <MenuItem value={2}>Smithfield</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => uploadFiles()} variant="contained">
            Send Transfer
          </Button>
        </Box>
      ) : (
        <Box>
          Your file has been uploaded
          <Button variant="contained" onClick={() => setHasUploaded(false)}>
            Send another
          </Button>
        </Box>
      )}
    </>
  );
};

export default UploadPage;

"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const lotID = 3;

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [lots, setLots] = useState([]);

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
      const res = await axios.post(`${process.env.API_URL}/filepack`, {
        sentFrom: lotID,
        sentTo: recipients,
        subject: subject,
        message: message,
        files: fileData,
      });
      console.log(res);
      setHasUploaded(true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getLots() {
    try {
      const res = await fetch(`${process.env.API_URL}/lot`);
      const data = await res.json();
      setLots(data);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  }

  useEffect(() => getLots, []);

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

          <Box sx={{ minHeight: "4rem", display: "flex" }}>
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
                  <Box
                    sx={{ margin: "0rem 1rem 2rem 0rem" }}
                    onClick={() => setSelFile(i)}
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="h6" noWrap component="div">
                          {file.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          noWrap
                          component="div"
                        >
                          {file.size > 1000
                            ? file.size / 1000 + " MB"
                            : file.size + " KB"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </Box>
          <InputLabel id="select-label">Send To</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            multiple
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            sx={{ "margin-bottom": "1rem" }}
            input={<OutlinedInput label="Tag" />}
            renderValue={(recipients) => {
              let ns = [];
              recipients.forEach((r) => {
                ns.push(r.name);
              });
              return ns.join(", ");
            }}
          >
            {lots.map((lot) => {
              return (
                <MenuItem key={lot.id} value={lot}>
                  <Checkbox checked={recipients.indexOf(lot) > -1} />
                  <ListItemText primary={lot.name} />
                </MenuItem>
              );
            })}
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
          <Typography sx={{ marginBottom: "1rem" }} variant="h6">
            Your files have been sent!
          </Typography>
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

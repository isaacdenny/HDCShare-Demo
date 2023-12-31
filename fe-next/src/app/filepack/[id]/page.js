"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
// import JSZip from "jszip";
import { saveAs } from "file-saver";

const FilePackViewPage = ({ params }) => {
    const [fpData, setFpData] = useState({ sentFrom: { name: "" } });
    const [files, setFiles] = useState([{ name: "", content: "" }]);

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
                `${process.env.API_URL}/file/frompack/${params.id}`
            );
            setFiles(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => getFilePack, []);

    async function downloadFile(file) {
        saveAs(file.content, file.name);
    }

    // async function downloadZip() {
    //     const zip = new JSZip();
    //     files.map((file) => {
    //         zip.file(file.name, file.content);
    //         return file;
    //     });
    //     await zip.generateAsync({ type: "blob" }).then((content) => {
    //         saveAs(content, "hdcshare-download.zip");
    //     });
    // }
    return (
        <Box>
            <Typography
                sx={{ fontSize: 14 }}
                noWrap
                component="div"
                color="black"
            >
                Transfer #
                {fpData !== null
                    ? fpData.id + " - " + fpData.sentFrom.name
                    : "Error connecting to server"}
            </Typography>
            <Typography
                sx={{ fontSize: 14 }}
                noWrap
                component="div"
                color="black"
            ></Typography>
            <Typography
                variant="h5"
                sx={{ marginBottom: "1rem" }}
                noWrap
                component="div"
                color="black"
            >
                {fpData !== null
                    ? fpData.subject
                    : "Error connecting to server"}
            </Typography>
            <Typography
                sx={{ fontSize: 14, marginBottom: "2rem" }}
                noWrap
                component="div"
                color="black"
            >
                {fpData !== null
                    ? fpData.message
                    : "Error connecting to server"}
            </Typography>
            <Box sx={{ minHeight: "4rem", display: "flex", flexWrap: "wrap" }}>
                {files.length > 0 ? (
                    files.map((file) => {
                        return (
                            <Box
                                key={file.id}
                                sx={{ margin: "1rem 1rem 2rem 0rem" }}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography
                                            sx={{ fontSize: 18 }}
                                            noWrap
                                            component="div"
                                        >
                                            {file.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                marginBottom: "1rem",
                                            }}
                                            noWrap
                                            component="div"
                                        >
                                            {file.size > 1000
                                                ? file.size / 1000 + " MB"
                                                : file.size + " KB"}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => downloadFile(file)}
                                        >
                                            Download
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        );
                    })
                ) : (
                    <></>
                )}
            </Box>
            {/* <Button variant="contained" onClick={() => downloadZip()}>
                Download all
            </Button> */}
        </Box>
    );
};

export default FilePackViewPage;

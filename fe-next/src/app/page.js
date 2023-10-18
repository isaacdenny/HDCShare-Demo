"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Tab, Tabs, TextField } from "@mui/material";
import Link from "next/link";

const lotID = 3;

const Home = () => {
    const [rows, setRows] = useState([]);
    const [lots, setLots] = useState([]);
    const [results, setResults] = useState([]);
    const [lotSelected, setLotSelected] = useState(0);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);

    function handleLotSelected(id, data) {
        setLotSelected(id);
        let temp = [];
        data.map((r) => {
            if (id == 0) {
                temp.push(r);
            } else if (r.sentFrom.id === id) {
                temp.push(r);
            }
        });
        setResults(temp);
    }

    async function handleShowMore() {
        let newSkip = skip + limit;
        try {
            let res = await fetch(
                `${process.env.API_URL}/filepack/received?id=${lotID}`
            );
            const newRows = await res.json();
            let temp = [];
            rows.map((r) => temp.push(r));
            newRows.map((r) => temp.push(r));
            const data = temp;
            setRows(temp);
            setSkip(skip + limit);
            handleLotSelected(lotSelected, data);
        } catch (error) {
            console.log(error);
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

    async function getTransfers() {
        try {
            let res = await fetch(
                `${process.env.API_URL}/filepack/received?id=${lotID}`
            );
            const data = await res.json();
            setRows(data);
			getLots();
			handleLotSelected(0, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => getTransfers, []);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Tabs
                    value={lotSelected}
                    onChange={(e) => handleLotSelected(e.target.value)}
                    aria-label="basic tabs example"
                >
                    <Tab
                        value={0}
                        label={"All"}
                        onClick={() => handleLotSelected(0)}
                    />
                    {lots.length > 0 ? (
                        lots.map((lot) => {
                            return (
                                <Tab
                                    value={lot.id}
                                    label={lot.name}
                                    key={lot.id}
                                    onClick={() => handleLotSelected(lot.id)}
                                />
                            );
                        })
                    ) : (
                        <Box>Connecting to server...</Box>
                    )}
                </Tabs>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Files</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((r) => {
                            return (
                                <TableRow
                                    key={r.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {r.id}
                                    </TableCell>
                                    <TableCell>{r.subject}</TableCell>
                                    <TableCell align="right">{"3"}</TableCell>
                                    <TableCell align="right">
                                        {new Date(r.createdAt).toDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link href={`/filepack/${r.id}`}>
                                            <Button variant="contained">
                                                View
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {rows.length < limit - 1 ? (
                <></>
            ) : (
                <Button
                    variant="contained"
                    sx={{ marginTop: "1rem" }}
                    onClick={() => handleShowMore()}
                >
                    Show More
                </Button>
            )}
        </>
    );
};

export default Home;

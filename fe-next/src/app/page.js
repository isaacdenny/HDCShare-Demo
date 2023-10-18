"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Box,
    Button,
    Container,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";

const lotID = 3;

const Home = () => {
    const [rows, setRows] = useState([]);
    const [lots, setLots] = useState([]);
    const [results, setResults] = useState([]);
    const [lotSelected, setLotSelected] = useState(0);
    const [limit, setLimit] = useState(25);
    const [skip] = useState(limit);

    function handleResultChange(id, data, l) {
        setLotSelected(id);
        let temp = [];
        data.map((r, i) => {
            if (i >= l) return;
            if (id == 0) {
                temp.push(r);
            } else if (r.sentFrom.id === id) {
                temp.push(r);
            }
        });
        setResults(temp);
    }

    async function handleShowMore() {
        let newLimit = limit + skip;
        setLimit(newLimit);
        handleResultChange(lotSelected, rows, newLimit);
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
            handleResultChange(0, data, limit);
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
                    onChange={(e) =>
                        handleResultChange(e.target.value, rows, limit)
                    }
                    aria-label="basic tabs example"
                >
                    <Tab
                        value={0}
                        label={"All"}
                        onClick={() => handleResultChange(0, rows, limit)}
                    />
                    {lots.length > 0 ? (
                        lots.map((lot) => {
                            return (
                                <Tab
                                    value={lot.id}
                                    label={lot.name}
                                    key={lot.id}
                                    onClick={() =>
                                        handleResultChange(lot.id, rows, limit)
                                    }
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
                            {lotSelected === 0 ? (
                                <TableCell>Sender</TableCell>
                            ) : (
                                <></>
                            )}
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
                                    {lotSelected === 0 ? (
                                        <TableCell>{r.sentFrom.name}</TableCell>
                                    ) : (
                                        <></>
                                    )}
                                    <TableCell align="right">
                                        {r.fileCount}
                                    </TableCell>
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {rows.length <= limit - 1 ? (
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
                <Typography
                    sx={{ fontSize: 14, padding: "1rem" }}
                >{`Showing ${results.length} of ${rows.length}`}</Typography>
            </Box>
        </>
    );
};

export default Home;

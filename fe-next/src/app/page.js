"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import Link from "next/link";

const lotID = 3;

const Home = () => {
  const [rows, setRows] = useState([]);
  const [lots, setLots] = useState([]);
  const [results, setResults] = useState([]);
  const [lotSelected, setLotSelected] = useState(0);

  let ts = [];

  function handleLotSelected(id) {
    setLotSelected(id);
    let temp = [];
    if (rows.length <= 0) {
      ts.map((t) => {
        if (t.sentFrom === id) temp.push(t);
      });
    } else {
      rows.map((t) => {
        if (t.sentFrom === id) temp.push(t);
      });
    }
    setResults(temp);
  }

  async function getLots() {
    try {
      const res = await fetch(`${process.env.API_URL}/lot`);
      const data = await res.json();
      setLots(data);
      handleLotSelected(data[0].id);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  }

  async function getTransfers() {
    try {
      let res = await fetch(
        `${process.env.API_URL}/filepack/received?id=${lotID}`
      );
      ts = await res.json();
      console.log(ts);
      setRows(ts);
      getLots();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getTransfers, []);

  return (
    <>
      <Box>
        <Tabs
          value={lotSelected}
          onChange={(e) => handleLotSelected(e.target.value)}
          aria-label="basic tabs example"
        >
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
            {results.map((row) => (
              (<TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell align="right">{"3"}</TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Link href={`/filepack/${row.id}`}>
                    <Button variant="contained">View</Button>
                  </Link>
                </TableCell>
              </TableRow>)
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;

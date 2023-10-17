"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Tab, Tabs } from "@mui/material";

const InboxPage = () => {
  const [rows, setRows] = useState([]);
  const [lots, setLots] = useState([]);
  const [results, setResults] = useState([]);
  const [lotSelected, setLotSelected] = useState(0);

  const [hasClicked, setHasClicked] = useState(false);
  const [tID, setTID] = useState(null);

  const lotID = 3;
  let ts = [];

  const handleClick = (id) => {
    console.log("running 1");
    setTID(id);
    setHasClicked(true);
  };

  function handleLotSelected(id) {
    console.log(id);
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
        `${process.env.API_URL}/transfer/received?id=${lotID}`
      );
      ts = await res.json();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {results !== null ? (
              results.map((row) => (
                <TableRow
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
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InboxPage;

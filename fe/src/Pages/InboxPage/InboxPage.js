import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InboxPage.css";

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [found, setFound] = useState([]);
  const [filter, setFilter] = useState(null);
  const [lots, setLots] = useState([]);
  const [lotSelected, setLotSelected] = useState({ id: "0", name: "Lot" });
  const navigate = useNavigate();

  const [hasClicked, setHasClicked] = useState(false);
  const [tID, setTID] = useState(null);

  const lotID = 3;
  let ts = [];

  function doSearch(e) {
    e.preventDefault();
    let temp = [];
    transfers.forEach((transfer) => {
      if (transfer.subject.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
        temp.push(transfer);
      }
    });
    setFound(temp);
  }

  const handleClick = (id) => {
    console.log("running 1");
    setTID(id);
    setHasClicked(true);
  };

  function handleLotSelected(lot) {
    setLotSelected(lot);
    let temp = [];
    if (transfers.length <= 0) {
      ts.map((t) => {
        if (t.sentFrom === lot.id) temp.push(t);
      });
    } else {
      transfers.map((t) => {
        if (t.sentFrom === lot.id) temp.push(t);
      });
    }
    setFound(temp);
  }

  async function getLots() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/lot`);
      const data = res.data;
      setLots(data);
      handleLotSelected(data[0]);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  }

  async function getTransfers() {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/transfer/received?id=${lotID}`
      );
      ts = res.data;
      setTransfers(ts);
      getLots();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getTransfers, []);

  useEffect(() => {
    if (hasClicked && tID !== null) {
      console.log("running");
      navigate(`/transfers/${tID}`);
    }
  }, [hasClicked]);

  return (
    <>
      <Navbar />
      {/* Main Section */}
      <div className="main-section">
        <form className="search-bar" onSubmit={doSearch}>
          <input
            type="text"
            name="search"
            value={filter === null ? "" : filter}
            placeholder="Search Files..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <h2>
          Transfers From {lotSelected === null ? "None" : lotSelected.name}
        </h2>
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Size</th>
                <th style={{ textAlign: "right" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {found.length >= 0 ? (
                found.map((transfer) => (
                  <tr
                    className="table-item"
                    key={transfer.id}
                    onClick={() => handleClick(transfer.id)}
                  >
                    <td style={{ fontWeight: "bold" }}>{transfer.subject}</td>
                    <td>2 MB</td>
                    <td style={{ textAlign: "right" }}>
                      {new Date(transfer.createdAt).toDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Lots Panel */}
      <div className="panel">
        <h2>Lots</h2>
        <div className="box-list">
          {lots.length > 0 ? (
            lots.map((lot) => {
              return (
                <div
                  key={lot.id}
                  className={
                    lotSelected.id === lot.id ? "box box-selected" : "box"
                  }
                  onClick={() => handleLotSelected(lot)}
                >
                  <p className="name">{lot.name}</p>
                </div>
              );
            })
          ) : (
            <div>Cannot connect to server</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransfersPage;
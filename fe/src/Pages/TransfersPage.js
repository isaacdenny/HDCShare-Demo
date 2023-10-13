import React, { useEffect, useState } from "react";
import axios from "axios";

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [found, setFound] = useState([]);
  const [filter, setFilter] = useState(null);
  const [lots, setLots] = useState([]);
  const [lotSelected, setLotSelected] = useState({ id: "0", name: "Lot" });

  const lotID = 1;
  const API_URL = process.env.REACT_APP_API_URL;

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

  function handleLotSelected(lot) {
    setLotSelected(lot);
    let temp = [];
    transfers.map((t) => {
      if (t.sentFrom === lot.id) temp.push(t);
    });
    setFound(temp);
  }
  
  async function getLots() {
    try {
      const res = await axios.get(`${API_URL}/lot`);
      const data = res.data;
      setLots(data);
      setLotSelected(data[0]);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  }

  async function getTransfers() {
    try {
      let res = await axios.get(`${API_URL}/transfer/received/${lotID}`);
      setTransfers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getTransfers, []);
  useEffect(() => getLots, []);

  return (
    <>
      <div className="main-panel">
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
        <div className="file-panel">
          {found.length >= 0 ? (
            found.map((transfer) => (
              <div className="file" key={transfer.id}>
                <p style={{ fontWeight: "bold" }}>{transfer.subject}</p>
              </div>
            ))
          ) : (
            <div>No files</div>
          )}
        </div>
      </div>
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
            <>No lots</>
          )}
        </div>
      </div>
    </>
  );
};

export default TransfersPage;

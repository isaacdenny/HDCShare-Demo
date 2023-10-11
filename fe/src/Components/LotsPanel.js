import React, { useEffect, useState } from "react";
import axios from "axios";

const LotsPanel = () => {
  const [lots, setLots] = useState([]);
  const [selected, setSelected] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL;

  async function getLots() {
    try {
      const res = await axios.get(`${API_URL}/lot`);
      const data = await res.json();
      setLots(data);
    } catch (error) {
      console.log("Error fetching and parsing data", error);
    }
  }

  useEffect(() => getLots, []);

  return (
    <div className="panel">
      <h2>Lots</h2>
      <div className="box-list">
        {lots.length > 0 ? (
          lots.map((lot) => {
            return (
              <div
                key={lot.id}
                className={selected === lot.id ? "box box-selected" : "box"}
                onClick={() => setSelected(lot.id)}
              >
                <p className="name">{lot.name}</p>
                <p className="desc">{lot.fileCount} New Files</p>
              </div>
            );
          })
        ) : (
          <>No lots</>
        )}
      </div>
    </div>
  );
};

export default LotsPanel;

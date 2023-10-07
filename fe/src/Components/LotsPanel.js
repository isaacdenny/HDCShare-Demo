import React, { useState } from "react";

const LotsPanel = () => {
  const [lots, setLots] = useState([
    { id: 0, name: "Charlotte", fileCount: 3 },
    { id: 1, name: "Colfax", fileCount: 10 },
    { id: 2, name: "Smithfield", fileCount: 4 },
  ]);
  const [selected, setSelected] = useState(0);

  return (
    <div className="panel">
      <h2>Lots</h2>
      <div className="box-list">
        {lots.length > 0 ? (
          lots.map((lot) => {
            return (
              <div
                key={lot.id}
                className={selected === lot.id ?" box box-selected" : "box"}
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

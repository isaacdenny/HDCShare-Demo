import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransferPage = () => {
  const { id } = useParams();
  const [tData, setTData] = useState({
    id: "1",
    subject: `Transfer with ID: ${id} not found`,
  });
  const [files, setFiles] = useState([]);

  async function getTransfer() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/transfer/${id}`
      );
      setTData(res.data);
      getFiles();
    } catch (error) {
      console.log(error);
    }
  }

  async function getFiles() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/file/fromtransfer/${id}`
      );
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getTransfer, []);

  return (
    <>
      <Navbar />
      <div className="main-section">
        <p style={{ marginBottom: "0px" }}>Subject</p>
        <h1>{tData.subject}</h1>
        <p style={{ marginBottom: "1rem" }}>Date Sent</p>
        <h1>{new Date(tData.createdAt).toDateString()}</h1>
        <p style={{ marginBottom: "1rem" }}>Files</p>
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f, i) => {
                return (
                  <tr key={i} className="table-item">
                    <td style={{ fontWeight: "bold" }}>{f.name}</td>
                    <td>
                      {f.size > 1000 ? f.size / 1000 + " MB" : f.size + " KB"}
                    </td>
                    <td>.pdf</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransferPage;

import React, { useState } from "react";
import axios from "axios";
import "./FileUploadPage.css";
import { Navbar } from "../../Components";

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sendTo, setSendTo] = useState(0);
  const [subject, setSubject] = useState("New Transfer");

  const API_URL = process.env.REACT_APP_API_URL;

  function saveFiles(e) {
    var temp = [];
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fData = e.target.result;
        temp.push({
          name: file.name,
          size: file.size,
          content: fData,
        });
      };
      reader.readAsDataURL(file);
    });
    setFiles(Array.from(e.target.files));
    setFileData(temp);
  }

  async function uploadFiles() {
    if (files.length === 0) {
      alert("Please select a file");
      return;
    }

    try {
      const qparams = `?sentFromID=${1}&sendToID=${sendTo}&subject=${subject}`;
      const res = await axios.post(`${API_URL}/transfer${qparams}`, fileData);
      if (res.ok) {
        setHasUploaded(true);
      }
      console.log(fileData);
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <>
      <Navbar />
      <div className="main-section">
        {!hasUploaded ? (
          <div className="panel">
            <div className="form">
              <label>Upload Files</label>
              <input
                type="file"
                name="files"
                onChange={(e) => saveFiles(e)}
                multiple
              />
              <div className="file-viewer-container">
                {files.length > 0 ? (
                  files.map((file, i) => {
                    if (selectedFile !== null && selectedFile === i) {
                      return (
                        <embed
                          className="file-viewer"
                          key={file.name}
                          src={URL.createObjectURL(file)}
                        />
                      );
                    }
                    return (
                      <div
                        className="file"
                        key={file.name}
                        onClick={() => setSelectedFile(i)}
                      >
                        {file.name} {file.size}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label>Send to </label>
              <select
                id="lots"
                name="lots"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              >
                <option value={0}>Colfax</option>
                <option value={1}>Charlotte</option>
                <option value={2}>Smithfield</option>
              </select>
              <button className="primary" onClick={() => uploadFiles()}>
                Send Transfer
              </button>
            </div>
          </div>
        ) : (
          <div className="panel">
            <h2>Transfer Sent</h2>
            <button onClick={() => setHasUploaded(!hasUploaded)}>
              Upload another file
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploadPage;

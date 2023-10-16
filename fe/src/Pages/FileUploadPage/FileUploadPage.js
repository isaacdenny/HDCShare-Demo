import React, { useState } from "react";
import axios from "axios";
import "./FileUploadPage.css";
import { Navbar } from "../../Components";

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);

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
      const qparams = `?sentFromID=${1}&sendToID=${3}&subject=${"new"}`;
      const res = await axios.post(`${API_URL}/transfer${qparams}`, fileData);
      if (res.ok) {
        setHasUploaded(true);
      }
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
            <div className="upload-form">
              <label htmlFor="files">Upload Files</label>
              <input
                type="file"
                name="files"
                onChange={(e) => saveFiles(e)}
                multiple
              />
              <label htmlFor="lots">Send to </label>
              <select id="lots" name="lots">
                <option value="Colfax">Colfax</option>
                <option value="Charlotte">Charlotte</option>
                <option value="Smithfield">Smithfield</option>
              </select>
              <button className="primary" onClick={uploadFiles}>Send Transfer</button>
            </div>
            {files.length > 0 ? (
              files.map((file) => {
                return (
                  <div className="File-viewer-container" key={file.name}>
                    <embed
                      className="File-viewer"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            Thanks for uploading
            <button onClick={() => setHasUploaded(false)}>
              Upload another file
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploadPage;

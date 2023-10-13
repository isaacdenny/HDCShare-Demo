import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target.result;
      try {
        const res = await fetch("https://localhost:32782/api/Appfiles", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            size: file.size,
            content: fileData,
          }),
        });
        if (res.ok) {
          setHasUploaded(true);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      {!hasUploaded ? (
        <>
          <div>
            <input type="file" onChange={saveFile} />
            <input type="button" value="upload" onClick={uploadFile} />
          </div>
          {file ? (
            <div className="File-viewer-container">
              <embed className="File-viewer" src={URL.createObjectURL(file)} />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>
          Thanks for uploading
          <button onClick={() => setHasUploaded(false)}>
            Upload another file
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;

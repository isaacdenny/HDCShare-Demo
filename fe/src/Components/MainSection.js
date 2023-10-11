import React, { useEffect, useState } from "react";

const MainSection = () => {
  const [files, setFiles] = useState([]);
  const [found, setFound] = useState([]);
  const [filter, setFilter] = useState(null);

  function doSearch(e) {
    e.preventDefault();
    let filtFiles = [];
    files.forEach((file) => {
      if (file.name.indexOf(filter) === 0) {
        console.log(file.name);
        filtFiles.push(file);
      }
    });
    console.log(filtFiles);
    setFound(filtFiles);
  }

  async function getFiles() {
    // try {
    //   await fetch('${REACT_APP_API_URL}/lots/', {
    //     method: "GET",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setFiles(data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("getting files");
  }

  useEffect(() => getFiles, [files]);
  // useEffect(() => doSearch, [doSearch, setFilter]);

  return (
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
      <h2>Recent Files</h2>{" "}
      {filter === null ? (
        files.length >= 0 ? (
          files.map((file) => {
            return (
              <div className="file" key={file.id}>
                <p style={{ fontWeight: "bold" }}>{file.name}</p>
                <p>
                  {file.size > 1000000
                    ? Math.round(file.size / 1000000) + " MB"
                    : Math.round(file.size / 1000) + " KB"}
                </p>
              </div>
            );
          })
        ) : (
          <div>No files</div>
        )
      ) : found.length >= 0 ? (
        found.map((file) => {
          return (
            <div className="file" key={file.id}>
              <p style={{ fontWeight: "bold" }}>{file.name}</p>
              <p>
                {file.size > 1000000
                  ? Math.round(file.size / 1000000) + " MB"
                  : Math.round(file.size / 1000) + " KB"}
              </p>
            </div>
          );
        })
      ) : (
        <div>No files match your search.</div>
      )}
    </div>
  );
};

export default MainSection;

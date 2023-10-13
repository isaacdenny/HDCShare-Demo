import "./Theme/style.css";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { TransfersPage, FileUploadPage } from "./Pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<TransfersPage />} />
          <Route path={"/upload"} element={<FileUploadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

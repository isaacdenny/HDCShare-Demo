import "./Theme/style.css";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { TransfersPage, FileUploadPage } from "./Pages";
import AuthPage from "./Pages/AuthPage/AuthPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<TransfersPage />} />
          <Route path={"/upload"} element={<FileUploadPage />} />
          <Route path={"/login"} element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

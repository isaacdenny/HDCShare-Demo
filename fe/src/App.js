import "./Theme/style.css";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { TransfersPage, FileUploadPage } from "./Pages";
import AuthPage from "./Pages/AuthPage/AuthPage";
import TransferPage from "./Pages/TransferPage.js/TransferPage";
import { StateProvider } from "./State/StateProvider";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<TransfersPage />} />
            <Route path={"/upload"} element={<FileUploadPage />} />
            <Route path={"/login"} element={<AuthPage />} />
            <Route path={"/transfers/:id"} element={<TransferPage />} />
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </div>
  );
}

export default App;

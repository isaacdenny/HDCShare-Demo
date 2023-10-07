import "./Theme/style.css";
import MainSection from "./Components/MainSection";
import FileUpload from "./Components/FileUpload";
import Navbar from "./Components/Navbar";
import LotsPanel from "./Components/LotsPanel";
import Panel2 from "./Components/Panel2";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LotsPanel />
      {/* <MainSection />
      <Panel2 /> */}
      {/* <FileUpload /> */}
    </div>
  );
}

export default App;

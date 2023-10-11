import "./Theme/style.css";
import MainSection from "./Components/MainSection";
import FileUpload from "./Components/FileUpload";
import LotsPanel from "./Components/LotsPanel";

function App() {
  return (
    <div className="App">
      <MainSection />
      <LotsPanel />
      {/* <FileUpload /> */}
    </div>
  );
}

export default App;

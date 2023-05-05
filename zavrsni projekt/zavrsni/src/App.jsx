import ModeContext from "./components/ModeContext";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <ModeContext.Provider value="admin">
        <MainComponent />
      </ModeContext.Provider>
    </div>
  );
}

export default App;

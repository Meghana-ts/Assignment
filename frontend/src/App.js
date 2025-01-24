import React from "react";
import Toolbar from "./components/Toolbar.jsx";
import FormulaBar from "./components/FormulaBar.jsx";
import Spreadsheet from "./components/Spreadsheet.jsx";
import { SpreadsheetProvider } from "./context/SpreadsheetContext";
import './App.css';

function App() {
  return (
    <SpreadsheetProvider>
      <div className="app">
        <Toolbar />
        <FormulaBar />
        <Spreadsheet />
      </div>
    </SpreadsheetProvider>
  );
}

export default App;

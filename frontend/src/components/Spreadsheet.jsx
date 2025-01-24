import React, { useContext } from "react";
import Cell from "./Cell";
import { SpreadsheetContext } from "../context/SpreadsheetContext";

function Spreadsheet() {
  const { data, addRow, addColumn } = useContext(SpreadsheetContext);

  return (
    <div className="spreadsheet">
      {data.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} />
          ))}
        </div>
      ))}
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
}

export default Spreadsheet;

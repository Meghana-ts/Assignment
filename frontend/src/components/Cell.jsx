import React, { useState, useContext } from "react";
import { SpreadsheetContext } from "../context/SpreadsheetContext";

function Cell({ rowIndex, colIndex }) {
  const { data, updateCell } = useContext(SpreadsheetContext);
  const [value, setValue] = useState(data[rowIndex][colIndex]);

  const handleChange = (e) => {
    setValue(e.target.value);
    updateCell(rowIndex, colIndex, e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="cell"
    />
  );
}

export default Cell;

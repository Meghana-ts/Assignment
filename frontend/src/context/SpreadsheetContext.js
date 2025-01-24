import React, { createContext, useState } from "react";

export const SpreadsheetContext = createContext();

export const SpreadsheetProvider = ({ children }) => {
  const [data, setData] = useState([Array(10).fill("")]);

  const updateCell = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setData(updatedData);
  };

  const addRow = () => setData([...data, Array(data[0].length).fill("")]);

  const addColumn = () => setData(data.map((row) => [...row, ""]));

  const calculateFormula = (formula) => {
    console.log("Formula applied:", formula);
    // Add formula logic here using mathjs
  };

  return (
    <SpreadsheetContext.Provider
      value={{ data, updateCell, addRow, addColumn, calculateFormula }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};

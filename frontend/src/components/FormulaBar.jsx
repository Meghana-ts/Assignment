import React, { useState, useContext } from "react";
import { SpreadsheetContext } from "../context/SpreadsheetContext";

function FormulaBar() {
  const [formula, setFormula] = useState("");
  const { calculateFormula } = useContext(SpreadsheetContext);

  const handleApplyFormula = () => {
    calculateFormula(formula);
  };

  return (
    <div className="formula-bar">
      <input
        type="text"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        placeholder="Enter formula (e.g., SUM(A1:A5))"
      />
      <button onClick={handleApplyFormula}>Apply</button>
    </div>
  );
}

export default FormulaBar;

const mathjs = require('mathjs');

class FormulaEngine {
  static calculateFormula(formula, cellMap) {
    try {
      const parsedFormula = this.replaceReferences(formula, cellMap);
      return mathjs.evaluate(parsedFormula);
    } catch (error) {
      console.error('Formula calculation error:', error);
      return '#ERROR!';
    }
  }

  static replaceReferences(formula, cellMap) {
    return formula.replace(/[A-Z]+[0-9]+/g, (cellRef) => {
      const cellValue = cellMap.get(cellRef);
      return cellValue !== undefined ? cellValue : '0';
    });
  }

  static functions = {
    SUM: (range) => range.reduce((a, b) => a + b, 0),
    AVERAGE: (range) => range.reduce((a, b) => a + b, 0) / range.length,
    MAX: Math.max,
    MIN: Math.min,
    COUNT: (range) => range.filter(val => typeof val === 'number').length,
    TRIM: (str) => str.trim(),
    UPPER: (str) => str.toUpperCase(),
    LOWER: (str) => str.toLowerCase(),
    REMOVE_DUPLICATES: (arr) => [...new Set(arr)]
  }
}

module.exports = FormulaEngine;
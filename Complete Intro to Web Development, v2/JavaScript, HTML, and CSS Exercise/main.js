"use strict";

const INITIAL_SYMBOLS = ["0"];
const OPERATIONS = ["÷", "×", "-", "+"];

const isOperation = (symbol) => OPERATIONS.includes(symbol);

const calculate = (symbols) => {
  const lastSymbol = symbols[symbols.length - 1];

  let currentSymbols = [];
  if (isOperation(lastSymbol)) currentSymbols = symbols.slice(0, -1);
  else currentSymbols = symbols.slice(0);

  currentSymbols = currentSymbols.map((currentSymbol) =>
    currentSymbol.replace(/÷/gu, "/").replace(/×/gu, "*")
  );

  // eslint-disable-next-line no-new-func
  const result = Function(`return ${currentSymbols.join("")}`)();

  return [result.toString()];
};

const erase = (symbols) => {
  const lastSymbol = symbols[symbols.length - 1];
  let remainingSymbols = symbols.slice(0, -1);

  if (lastSymbol.length > 1)
    remainingSymbols = [...remainingSymbols, lastSymbol.slice(0, -1)];

  if (remainingSymbols.length === 0) return INITIAL_SYMBOLS;

  return remainingSymbols;
};

const appendNumber = (symbols, input) => {
  const lastSymbol = symbols[symbols.length - 1];

  if (Number(lastSymbol) === 0) return [...symbols.slice(0, -1), input];
  else if (isOperation(lastSymbol)) return [...symbols, input];

  return [...symbols.slice(0, -1), `${lastSymbol}${input}`];
};

const appendOperation = (symbols, input) => {
  const lastSymbol = symbols[symbols.length - 1];

  if (isOperation(lastSymbol)) return [...symbols.slice(0, -1), input];

  return [...symbols, input];
};

const updateDisplay = (symbols) => {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = symbols.join("");
};

window.onload = () => {
  let symbols = INITIAL_SYMBOLS;
  updateDisplay(symbols);

  document.querySelector("#calculate").addEventListener("click", () => {
    symbols = calculate(symbols);
    updateDisplay(symbols);
  });

  document.querySelector("#erase").addEventListener("click", () => {
    symbols = erase(symbols);
    updateDisplay(symbols);
  });

  document.querySelector("#reset").addEventListener("click", () => {
    symbols = INITIAL_SYMBOLS;
    updateDisplay(symbols);
  });

  document.querySelectorAll(".number").forEach((numberElement) => {
    numberElement.addEventListener("click", () => {
      symbols = appendNumber(symbols, numberElement.textContent);
      updateDisplay(symbols);
    });
  });

  document.querySelectorAll(".operation").forEach((operationElement) => {
    operationElement.addEventListener("click", () => {
      symbols = appendOperation(symbols, operationElement.textContent);
      updateDisplay(symbols);
    });
  });
};

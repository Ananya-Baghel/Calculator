const boxWrapper = document.getElementById("boxWrapper");
const closedBox = document.getElementById("closedBox");
const closeBtn = document.getElementById("closeBtn");
const modeIndicator = document.getElementById("modeIndicator");

closedBox.addEventListener("click", () => {
  boxWrapper.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  boxWrapper.classList.remove("open");
});

class Calculator {
  constructor(prevEl, currEl, historyEl) {
    this.prevEl = prevEl;
    this.currEl = currEl;
    this.historyEl = historyEl;

    this.shiftActive = false;
    this.mode = "COMP";
    this.angleMode = "DEG";

    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = null;
    this.updateDisplay();
  }

  delete() {
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(num) {
    if (this.currentOperand === "0" && num !== ".") {
      this.currentOperand = num;
    } else {
      this.currentOperand += num;
    }
    this.updateDisplay();
  }

  appendSymbol(symbol) {
    this.currentOperand += symbol;
    this.updateDisplay();
  }

  chooseOperation(op) {
    if (this.previousOperand !== "") this.compute();

    this.operation = op;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
    this.updateDisplay();
  }

  toggleShift() {
    this.shiftActive = !this.shiftActive;
    alert("SHIFT " + (this.shiftActive ? "Enabled" : "Disabled"));
  }

  toggleMode() {
    if (this.angleMode === "DEG") this.angleMode = "RAD";
    else this.angleMode = "DEG";

    modeIndicator.innerText = `MODE: ${this.angleMode}`;
  }

  scientific(func) {
    let x = parseFloat(this.currentOperand);
    let result;

    if (this.angleMode === "DEG") x = (x * Math.PI) / 180;

    switch (func) {
      case "sin":
        result = this.shiftActive ? Math.asin(x) : Math.sin(x);
        break;

      case "cos":
        result = this.shiftActive ? Math.acos(x) : Math.cos(x);
        break;

      case "tan":
        result = this.shiftActive ? Math.atan(x) : Math.tan(x);
        break;

      case "sqrt":
        result = Math.sqrt(x);
        break;

      case "square":
        result = x * x;
        break;

      case "log":
        result = this.shiftActive ? Math.pow(10, x) : Math.log10(x);
        break;

      case "ln":
        result = this.shiftActive ? Math.exp(x) : Math.log(x);
        break;

      default:
        return;
    }

    this.currentOperand = result.toString();
    this.shiftActive = false;
    this.updateDisplay();
  }

  compute() {
    let prev = parseFloat(this.previousOperand);
    let curr = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    let result;

    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = curr === 0 ? "Math ERROR" : prev / curr;
        break;
      case "^":
        result = Math.pow(prev, curr);
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.previousOperand = "";
    this.operation = null;
    this.updateDisplay();
  }

  updateDisplay() {
    this.currEl.innerText = this.currentOperand;
    this.prevEl.innerText = this.operation
      ? `${this.previousOperand} ${this.operation}`
      : "";
  }
}

const calculator = new Calculator(
  document.getElementById("previousOperand"),
  document.getElementById("currentOperand"),
  document.getElementById("historyDisplay")
);

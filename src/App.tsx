import { useState, useEffect } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

function App() {
  const [inputNum, setInputNum] = useState<number>(0);
  const [monitor, setMonitor] = useState<number>(0);
  const [output, setOutput] = useState<string>("");
  const [decimal, setDecimal] = useState<boolean>(false);
  const [decimalcount, setDecimalCount] = useState<number>(1);
  const [operator, setOperator] = useState<string>("");
  const [calculatednum, setCalculatednum] = useState<number>(0);

  useEffect(() => {
    if (operator) {
      setOutput(
        `${calculatednum} ${operator} ${inputNum !== 0 ? inputNum : ""}`.trim()
      );
    } else {
      setOutput(String(inputNum));
    }
  }, [inputNum, operator, calculatednum]);

  useEffect(() => {
    setMonitor(calculatednum);
  }, [calculatednum]);

  //recieve number from input button
  const inputNumTotal = (num: number) => {
    if (decimal) {
      num = num / Math.pow(10, decimalcount);
      setDecimalCount(decimalcount + 1);
      setInputNum(parseFloat((inputNum + num).toFixed(decimalcount)));
    } else {
      setInputNum(inputNum * 10 + num);
    }
  };

  //receive operator from input button
  const inputOperator = (operator: string) => {
    setOperator(operator);
    calculate();
    setInputNum(0);
  };

  //calculate
  const calculate = () => {
    setDecimal(false);
    setDecimalCount(1);
    if (operator === "/" && inputNum === 0) {
      setCalculatednum(NaN);
      setInputNum(0);
      return;
    }
    if (calculatednum === 0 && inputNum === 0) {
      return;
    }
    switch (operator) {
      case "+":
        setCalculatednum(calculatednum + inputNum);
        break;
      case "/":
        setCalculatednum(calculatednum / inputNum);
        break;
      case "*":
        setCalculatednum(calculatednum * inputNum);
        break;
      case "-":
        setCalculatednum(calculatednum - inputNum);
        break;
    }
    if (operator === "") setCalculatednum(inputNum);
    else setInputNum(0);
    return;
  };

  //get equation
  const equal = () => {
    calculate();
    setOperator("");
  };

  //clear all
  const clearall = () => {
    setInputNum(0);
    setCalculatednum(0);
    setMonitor(0);
    setOperator("");
  };

  const toggleSign = () => {
    // If inputNum is not zero, toggle its sign
    if (inputNum !== 0) {
      setInputNum(-inputNum);
    }
  };

  const calculatePercentage = () => {
    setInputNum(inputNum / 100);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 w-screen md:h-screen min-h-screen font-jakarta">
      <section className="flex flex-col items-center justify-center bg-[#5F9DF7]">
        <main className="flex flex-col  gap-y-5 bg-[#112B3C] text-[#EFEFEF] md:p-6 p-1 rounded-md">
          <section className="output flex flex-col gap-y-8 text-lg">
            <p data-testid="monitor">{monitor}</p>
            <p className="self-end">{output}</p>
          </section>
          <section className="buttons grid grid-rows-5 grid-cols-4 md:gap-8 gap-y-8 gap-x-2  ">
            <OperationButton testId="AC" onClick={clearall} operation="AC" />
            <OperationButton
              testId="toggleMinus"
              onClick={toggleSign}
              operation="+/-"
            />
            <OperationButton
              testId="%"
              onClick={calculatePercentage}
              operation="%"
            />
            <OperationButton
              testId="/"
              onClick={() => inputOperator("/")}
              operation="/"
            />
            <DigitButton
              testId="7"
              onClick={() => inputNumTotal(7)}
              digit="7"
            />
            <DigitButton
              testId="8"
              onClick={() => inputNumTotal(8)}
              digit="8"
            />
            <DigitButton
              testId="9"
              onClick={() => inputNumTotal(9)}
              digit="9"
            />
            <OperationButton
              testId="*"
              onClick={() => inputOperator("*")}
              operation="*"
            />
            <DigitButton
              testId="4"
              onClick={() => inputNumTotal(4)}
              digit="4"
            />
            <DigitButton
              testId="5"
              onClick={() => inputNumTotal(5)}
              digit="5"
            />
            <DigitButton
              testId="6"
              onClick={() => inputNumTotal(6)}
              digit="6"
            />
            <OperationButton
              testId="-"
              onClick={() => inputOperator("-")}
              operation="-"
            />
            <DigitButton
              testId="1"
              onClick={() => inputNumTotal(1)}
              digit="1"
            />
            <DigitButton
              testId="2"
              onClick={() => inputNumTotal(2)}
              digit="2"
            />
            <DigitButton
              testId="3"
              onClick={() => inputNumTotal(3)}
              digit="3"
            />
            <OperationButton
              testId="+"
              onClick={() => inputOperator("+")}
              operation="+"
            />
            <DigitButton
              testId="0"
              onClick={() => inputNumTotal(0)}
              digit="0"
              className="col-span-2"
            />
            <OperationButton
              testId="."
              onClick={() => setDecimal(true)}
              operation="."
            />
            <OperationButton testId="=" onClick={equal} operation="=" />
          </section>
        </main>
      </section>
    </div>
  );
}

export default App;

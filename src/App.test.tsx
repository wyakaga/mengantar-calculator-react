import { render, fireEvent, screen } from "@testing-library/react";

import App from "./App";

test.each([
  { num1: "1", op: "+", num2: "2", expected: "3", desc: "addition" },
  { num1: "3", op: "-", num2: "2", expected: "1", desc: "subtraction" },
  { num1: "3", op: "*", num2: "2", expected: "6", desc: "multiplication" },
  { num1: "6", op: "/", num2: "2", expected: "3", desc: "division" },
])("$desc operation", (data) => {
  render(<App />);
  fireEvent.click(screen.getByTestId(data.num1));
  fireEvent.click(screen.getByTestId(data.op));
  fireEvent.click(screen.getByTestId(data.num2));
  fireEvent.click(screen.getByTestId("="));
  expect(screen.getByTestId("monitor").textContent).toBe(data.expected);
});

test("decimal calculation", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("1"));
  fireEvent.click(screen.getByTestId("."));
  fireEvent.click(screen.getByTestId("5"));
  fireEvent.click(screen.getByTestId("+"));
  fireEvent.click(screen.getByTestId("2"));
  fireEvent.click(screen.getByTestId("."));
  fireEvent.click(screen.getByTestId("4"));
  fireEvent.click(screen.getByTestId("="));
  expect(screen.getByTestId("monitor").textContent).toBe("3.9");
});

test("percentage calculation", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("5"));
  fireEvent.click(screen.getByTestId("0"));
  fireEvent.click(screen.getByTestId("%"));
  fireEvent.click(screen.getByTestId("*"));
  fireEvent.click(screen.getByTestId("1"));
  fireEvent.click(screen.getByTestId("0"));
  fireEvent.click(screen.getByTestId("0"));
  fireEvent.click(screen.getByTestId("="));
  expect(screen.getByTestId("monitor").textContent).toBe("50");
});

test("negative numbers calculation", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("6"));
  fireEvent.click(screen.getByTestId("toggleMinus"));
  fireEvent.click(screen.getByTestId("*"));
  fireEvent.click(screen.getByTestId("1"));
  fireEvent.click(screen.getByTestId("0"));
  fireEvent.click(screen.getByTestId("0"));
  fireEvent.click(screen.getByTestId("="));
  expect(screen.getByTestId("monitor").textContent).toBe("-600");
});

test("clear calculation result", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("6"));
  fireEvent.click(screen.getByTestId("*"));
  fireEvent.click(screen.getByTestId("7"));
  fireEvent.click(screen.getByTestId("="));
  fireEvent.click(screen.getByTestId("AC"));
  expect(screen.getByTestId("monitor").textContent).toBe("0");
});

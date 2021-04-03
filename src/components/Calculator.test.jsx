import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import Calculator from './Calculator';
import { adding, multiply, devide, subtract, isExists, keyMatch, keyMatchReg } from "./util";

describe("layout of calculator is rendered properly", () => {
  test("Calculator is rendered", () => {
    render(
      <Calculator />
    )
  })
  test("All buttons rendered properly", () => {
    const { getByText } = render(
      <Calculator />
    )
    const btn1 = getByText("1");
    const btn2 = getByText("2");
    const btn3 = getByText("3");
    const btn4 = getByText("4");
    const btn5 = getByText("5");
    const btn6 = getByText("6");
    const btn7 = getByText("7");
    const btn8 = getByText("8");
    const btn9 = getByText("9");
    const btn0 = getByText("0");
    const btnPoint = getByText(".");
    const btnDevide = getByText("/");
    const btnMultiply = getByText("*");
    const btnSubtract = getByText("-");
    const btnadd = getByText("+");
    const btnPer = getByText("%");
    expect(btn1).toBeInTheDocument();
    expect(btn1).toBeDefined();
    expect(btn2).toBeInTheDocument();
    expect(btn2).toBeDefined();
    expect(btn3).toBeInTheDocument();
    expect(btn3).toBeDefined();
    expect(btn4).toBeInTheDocument();
    expect(btn4).toBeDefined();
    expect(btn5).toBeInTheDocument();
    expect(btn5).toBeDefined();
    expect(btn6).toBeInTheDocument();
    expect(btn6).toBeDefined();
    expect(btn7).toBeInTheDocument();
    expect(btn7).toBeDefined();
    expect(btn8).toBeInTheDocument();
    expect(btn8).toBeDefined();
    expect(btn9).toBeInTheDocument();
    expect(btn9).toBeDefined();
    expect(btn0).toBeInTheDocument();
    expect(btn0).toBeDefined();
    expect(btnPoint).toBeInTheDocument();
    expect(btnPoint).toBeDefined();
    expect(btnDevide).toBeInTheDocument();
    expect(btnDevide).toBeDefined();
    expect(btnMultiply).toBeInTheDocument();
    expect(btnMultiply).toBeDefined();
    expect(btnSubtract).toBeInTheDocument();
    expect(btnSubtract).toBeDefined();
    expect(btnadd).toBeInTheDocument();
    expect(btnadd).toBeDefined();
    expect(btnPer).toBeInTheDocument();
    expect(btnPer).toBeDefined();
  })
})

describe("not called funcions", () => {
  test("not called results fired", () => {
    const callFunc = jest.fn();
    const { queryByTestId } = render(
      <Calculator />
    )
    const results = queryByTestId("results");
    fireEvent.click(results)
    expect(callFunc).not.toHaveBeenCalledTimes(1);
  })
})
describe('windowListener', () => {
  window.matchMedia = window.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }; 
  };
})

describe("testing fucntions", () => {
  test("adding", () => {
    expect(adding("5", "6%", true)).toBe('5.3');
    expect(adding("8", "7%", true)).toBe('8.6');
  })

  test("multiply", () => {
    expect(multiply("45", "8%", true)).toBe(3.6);
    expect(multiply("23", "56%", true)).toBe(12.88);
  })

  test("devide", () => {
    expect(devide("89", "69%", false)).toBe('129.0');
  })

  test("subtract", () => {
    expect(subtract("23", "56%", true)).toBe(10.1);
  })

  test("isExists", () => {
    expect(isExists(".", "5%")).toBe(true);
  })

  test("!isExists", () => {
    expect(isExists("4", "5")).toBe(false);
  })

  test("keyMatch", () => {
    expect(keyMatch("+")).toBe(true);
  })
  test("!keyMatch", () => {
    expect(keyMatch("h")).toBe(false);
  })

  test("keyMatchReg", () => {
    expect(keyMatchReg("3")).toBe(true)
  })

  test("keyMatchReg", () => {
    expect(keyMatchReg("n")).toBe(true)
  })
})

describe("display properly numbers", () => {
  test("test button number 5", () => {
    const { getByText } = render(
      <Calculator />
    )
    const btn5 = getByText("5");
    expect(btn5).toBeDefined()
    fireEvent.click(btn5);
    expect(btn5.innerHTML).toBe("5");
  })
})
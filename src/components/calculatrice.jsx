import React, { useReducer } from "react";

const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    calculation: "",
    showCalculation: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "digit":
            return {
                ...state,
                currentValue:
                    state.currentValue === "0" ? action.value : state.currentValue + action.value,
                calculation: state.showCalculation
                    ? state.calculation + action.value
                    : action.value,
            };
        case "operator":
            return {
                ...state,
                operator: action.value,
                previousValue: state.currentValue,
                currentValue: "0",
                calculation: state.showCalculation
                    ? state.calculation + ` ${action.value} `
                    : ` ${action.value} `,
                showCalculation: true,
            };
        case "equal":
            if (state.operator && state.previousValue) {
                const result = calculate(
                    parseFloat(state.previousValue),
                    parseFloat(state.currentValue),
                    state.operator
                );
                return {
                    ...state,
                    currentValue: result.toString(),
                    operator: null,
                    previousValue: null,
                    calculation: state.calculation + ` = ${result}`,
                    showCalculation: false,
                };
            }
            return state;
        case "clear":
            return initialState;
        default:
            return state;
    }
};

const calculate = (prevValue, nextValue, operator) => {
    switch (operator) {
        case "+":
            return prevValue + nextValue;
        case "-":
            return prevValue - nextValue;
        case "*":
            return prevValue * nextValue;
        case "/":
            return prevValue / nextValue;
        default:
            return nextValue;
    }
};

const Calculator = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDigitClick = (value) => {
        dispatch({ type: "digit", value });
    };

    const handleOperatorClick = (value) => {
        dispatch({ type: "operator", value });
    };

    const handleEqualClick = () => {
        dispatch({ type: "equal" });
    };

    const handleClearClick = () => {
        dispatch({ type: "clear" });
    };

    return (
        <div>
            <div>
                <input type="text" value={state.showCalculation ? state.calculation : state.currentValue} readOnly />
            </div>
            <div>
                <button onClick={() => handleDigitClick("1")}>1</button>
                <button onClick={() => handleDigitClick("2")}>2</button>
                <button onClick={() => handleDigitClick("3")}>3</button>
                <button onClick={() => handleOperatorClick("+")}>+</button>
            </div>
            <div>
                <button onClick={() => handleDigitClick("4")}>4</button>
                <button onClick={() => handleDigitClick("5")}>5</button>
                <button onClick={() => handleDigitClick("6")}>6</button>
                <button onClick={() => handleOperatorClick("-")}>-</button>
            </div>
            <div>
                <button onClick={() => handleDigitClick("7")}>7</button>
                <button onClick={() => handleDigitClick("8")}>8</button>
                <button onClick={() => handleDigitClick("9")}>9</button>
                <button onClick={() => handleOperatorClick("*")}>*</button>
            </div>
            <div>
                <button onClick={() => handleDigitClick("0")}>0</button>
                <button onClick={handleClearClick}>C</button>
                <button onClick={handleEqualClick}>=</button>
                <button onClick={() => handleOperatorClick("/")}>/</button>
            </div>
        </div>
    );
};

export default Calculator;

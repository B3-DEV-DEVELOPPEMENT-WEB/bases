import { useReducer } from "react";
import OneButton from "./OneButton.jsx";

const initialState = {
    numbers: [],
    memory: [],
    message: "",
    total: "",
    type: "",
    display: ""
};

const reducer = (state, action) => {
    let total = 0, memory, number;

    switch (action.type) {
        case "SET_NUMBER":
            return {
                ...state,
                numbers: [...state.numbers, action.number],
                display: state.display + action.number
            };

        case "SUB":
        case "MULT":
        case "ADD":
        case "DIV":
            number = parseInt(state.numbers.join(""));

            // pour le cas où on re-calcule quelque chose après avoir cliqué sur "="
            if (!isNaN(number)) {
                memory = [...state.memory, number];
            }
            else{
                memory = [...state.memory];
            }

            return {
                ...state,
                numbers: [],
                memory,
                type: action.type,
                display: state.display + action.symbol
            };

        case "RESET":
            return {
                ...state,
                numbers: [],
                memory: [],
                total: "",
                display:""
            };

        case "TOTAL":

            if (state.type === "ADD") {
                total = state.memory[0] + parseInt(state.numbers.join(""));
            }

            if (state.type === "MULT") {
                total = state.memory[0] * parseInt(state.numbers.join(""));
            }

            if (state.type === "SUB") {
                total = state.memory[0] - parseInt(state.numbers.join(""));
            }

            if(state.type === "DIV"){
                total = state.memory[0] / parseInt(state.numbers.join(""));
            }

            return {
                ...state,
                numbers: [],
                memory: [total],
                total: total,
                display: total
            };
        default:
            throw new Error();
    }
};

const Calculator = () => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const handleReset = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div style={{ width: "300px", margin: "auto" }}>
            <p>
                <input
                    style={{ height: "30px", width: "300px" }}
                    type="text"
                    value={state.display}
                />
            </p>
            <p className="numbers">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number, i) => (
                    <OneButton key={i} number={number} dispatch={dispatch} />
                ))}
            </p>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div>
                <button onClick={() => dispatch({ type: "ADD", symbol:"+" })}>+</button>
                <button onClick={() => dispatch({ type: "SUB",  symbol:"-" })}>-</button>
                <button onClick={() => dispatch({ type: "MULT", symbol:"x" })}>x</button>
                <button onClick={() => dispatch({ type: "DIV", symbol:"/" })}>/</button>
            </div>
            <p>
                {" "}
                <button onClick={() => dispatch({ type: "TOTAL" })}>=</button>
            </p>
        </div>
    );
}

export default Calculator;
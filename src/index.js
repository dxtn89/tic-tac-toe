import React from 'react';
import {useState, useEffect, createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './Board'

function Game() {
    const [history, setHistory] = useState([{squares: Array(9).fill(null), last: null}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        setHistory(history.slice(0, stepNumber + 1))
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // ignore click if game's finished or square's filled
        if (calculateWinner(squares) || squares[i]) return;

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history => history.concat([{squares: squares}]));
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
        console.log(history);
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            "Go to move #" + move :
            "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    });

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) status = "Winner " + winner;
    else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

import React from 'react';
import Square from './Square';

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    for (let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] == squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext: true,
        }
    }

    saveStateToLocalStorage() {
        for (let key in this.state) {
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }
      
    componentDidMount() {
        console.log("component mounted");

        // Mounting previous state from local storage

        if (localStorage.getItem('squares') !== null) {
            console.log(`squares address exists`);
            console.log(localStorage.getItem('squares'))
            // this.setState({
            //     squares: JSON.parse(localStorage.getItem('squares')),
            // });
        } else {
            console.log(`squares address not found`);
        }

        if (localStorage.getItem('xIsNext') !== null) {
            console.log(`xIsNext address exists`);
            // this.setState({
            //     xIsNext: localStorage.getItem('xIsNext'),
            // });
        } else {
            console.log(`xIsNext address not found`);
        }


        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }
      
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
      
        this.saveStateToLocalStorage();
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]}
            onClick= {() => this.handleClick(i)}/>;
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner : ' + winner;
        }else {
            status = 'Next Player : ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length-1];
    let squares = [...current.squares];
    if(squares[i] || calculateWinner(squares)) return;
    squares[i] = this.state.xIsNext? 'X':'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(index){
    this.setState({
      stepNumber: index,
      xIsNext: (index%2)===0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const matchDraw = isDraw(current.squares);

    const moves = history.map((currVal, index)=> {
      const desc = index? 'Go to move #'+index: 'Go to game start';

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner){
      status = `${winner} won!`;
    }else if(matchDraw){
      status = 'match Draw!';
    }else {
      status = `Next player: ${this.state.xIsNext? 'X':'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares = {current.squares}
          onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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

function isDraw(squares){
  if(!calculateWinner(squares)){
    for(let i=0;i<9;i++){
      if(!squares[i])
        return false;
    }
    return true;
  }
  return false;
}

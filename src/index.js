import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardValues: [[1, 2, 3], [4, 5, 6], [7, 8, "X"]]
    };
  }

  componentDidMount() {
    this.shuffle();
  }

  shuffle = () => {
    let n = 100;
    while (n) {
      let max = this.state.boardValues.length;
      let randomX = Math.floor(Math.random() * max);
      let randomY = Math.floor(Math.random() * max);
      this.move([randomX, randomY]);
      n--;
    }
  };

  move = (coord, cb) => {
    const [x, y] = coord;
    if (this.state.boardValues[x][y] === "X") return;
    let xcoord = this.checkAdjacent(x, y);
    if (xcoord) {
      let [xx, xy] = xcoord;
      let newBoard = [...this.state.boardValues];
      let temp = newBoard[x][y];
      newBoard[x][y] = newBoard[xx][xy];
      newBoard[xx][xy] = temp;
      this.setState({
        boardValues: newBoard
      });
    }
  };

  checkAdjacent = (x, y) => {
    let boardValues = this.state.boardValues;
    if (boardValues[x + 1] && boardValues[x + 1][y] === "X") return [x + 1, y];
    else if (boardValues[x - 1] && boardValues[x - 1][y] === "X")
      return [x - 1, y];
    else if (boardValues[x][y + 1] === "X") return [x, y + 1];
    else if (boardValues[x][y - 1] === "X") return [x, y - 1];
    else return null;
  };

  render() {
    return (
      <>
        <table>
          <tbody>
            {this.state.boardValues.map((row, x) => (
              <tr>
                {row.map((value, y) => (
                  <td onClick={this.move.bind(null, [x, y])}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.shuffle}>shuffle</button>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Board />, rootElement);

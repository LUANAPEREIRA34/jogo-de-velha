import React from "react";
import {useState,useEffect} from "react";
import "./App.css";

function Square ({ value,onClick,highlight,isWinner}) {
  return (
    <button 
    className={`square ${highlight ? "highlight":""} ${isWinner? "winner":""}`}
      onClick={onClick}
      >
 {value}
</button>
  );
}

function App (){
 const [squares,setSquares]=useState(Array(9).fill(null));
  const [xIsNext,setXIsNext]=useState(true);
  const [score,setScore]=useState({x:0,o:0,Empate:0});
  const [winningLine,setWinningLine]=useState([]);
  const[status,setStatus]=useState("Em andamento");

function calculateWinner(squares){
    const lines = [
      [0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
    ];
  
  for(let[a,b,c]of lines) {
    if (squares[a]&& squares[a]===squares[b]&& squares [a]===squares[c]) {
  return {winner:squares[a],line:[a,b,c]};
    }
  }
return{winner:null,line:[]};
}

function handleClick(i){
  const result =calculateWinner(squares);
  if(squares[i]||result.winner) return;

 const nextSquares= squares.slice();
  nextSquares[i]=xIsNext?"X" : "O";
  setSquares(nextSquares);
  setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setWinningLine([]);
    setXIsNext(true);
    setStatus("Em andamento");
  }

useEffect(()=> {
  const result= calculateWinner(squares);

  if(result.winner){
    setWinningLine(result.line);
    setScore((prev)=>({
      ...prev,
      [result.winner.toLowerCase()]:prev[result.winner.toLowerCase()]+1,
    }));
  setStatus(`Vencedor:${result.winner}!`);
}else if (!squares.includes(null)){
    setScore((prev)=>({...prev,Empate:prev.Empate+1}));
    setStatus("Empate!");
    }else {
    setStatus(`Proximo jogador:${xIsNext?"X": "O"}`);
  }
  },[squares]);

  return (
    <div className="game">
      <h1>jogo da velha</h1>
    <div className="status">{status}</div>
    
    <div className="board">{squares.map((square,i)=>(
      <Square
    key={i}
    value={square}
    onClick={()=>handleClick(i)}
    highlight={winningLine.includes(i)}
    isWinner={winningLine.includes(i)}
      />
    ))}
      </div>
 
  <div className="controls">
    <button onClick={handleRestart}>Reiniciar</button>
  </div>
  
  <div className="scoreboard">
    <h2>Placar</h2>
  <p>X:{score.x}</p>
  <p>O:{score.o}</p>
  <p>Empates:{score.Empate}</p>
  </div>
  </div>
  );
}

  export default App;
  
  
  
  
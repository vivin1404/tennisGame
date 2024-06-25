export default function Win(props){
 console.log(props.score);
    return (
      <>
        <div className="win">
        
           
            <h2 className="win--score">Score : {props.score}</h2>
            <p className="win--status">Hey You Win</p>
          <button className="roll-dice" onClick={props.diceRoller}>
            Start new
          </button>
        </div>
      </>
    );
}
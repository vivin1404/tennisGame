import React from "react";

export default function Die(props) {
  //  console.log(props.isFalse);
    const myStyle = {
      backgroundColor: props.isFalse ? "#59E391" : "white",
    };
  return (
    <div className="die-face" style={myStyle}>
      <h2 className="die-num" onClick={()=>props.holdID(props.id)}>
        {props.value}
      </h2>
    </div>
  );
}

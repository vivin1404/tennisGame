import Die from "./component/Die"
import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import "./style.css"
import Win from "./component/Win";
/**
 * Challenge:
 * 
 * Write a function (allNewDice) that returns an array 
 * of 10 random numbers between 1-6 inclusive.
 * 
 * Log the array of numbers to the console for now
 */

export default function App() {
  const [myDice, setMyDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false);
  const  [scoreTime , setScoreTime] = useState(0)

  useEffect(function () {
    let statusVal = true;
    let numberval = true;
    for (let val of myDice) {
      if (val.status === false) {
        statusVal = false // all number status not true yet 
      }
      if (myDice[0].number !== val.number) {
        numberval = false; // all number are not same till now

      }
    }
    // if all values number are same and all values status are true
    if (statusVal && numberval) {

      setTenzies(true);
    }
  }, [myDice])

  function allNewDice() {
    let randomArr = [];
    for (let i = 0; i < 10; i++) {
      randomArr[i] = genretaeNewDice();


    }
    return randomArr;
  }

  function holdId(diceId) {
    setMyDice(prvDice => prvDice.map(dice => {
      return dice.id === diceId ? { ...dice, status: !dice.status } : dice
    }))
  }
  function rollDice() {
    // when some dice clikced then that one object reamin same for others change the values
   if(tenzies ===false)
     setMyDice(prvDice => prvDice.map(dice => {
       if (dice.status === true) {
         return dice // same as it is 
       } else {
         return genretaeNewDice(); // new one
       }

     }))
    else{
      setTenzies(false);
      setMyDice(allNewDice)
      setScoreTime(0);
    }

    // count steps :
    setScoreTime(prvScore => prvScore+1)
    console.log(scoreTime);
  }

  function genretaeNewDice() {
    return ({
      number: Math.trunc(Math.random() * 6) + 1,
      status: false,
      id: nanoid()
    })
  }

  let diceElm = myDice.map((diceVal, index) => (
    <Die
      value={diceVal.number}
      key={index}
      isFalse={diceVal.status}
      id={diceVal.id}
      holdID={holdId}
    />))


  return (
    <main>
      {tenzies && <Confetti />}
    {tenzies ? <Win score ={scoreTime}  diceRoller ={rollDice}/> : <>
    
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.</p>

        <div className="dice-container">
          {diceElm}
        </div>

        <button onClick={rollDice} className="roll-dice">Roll</button> 
    </>}
      
    </main>
  )
}
import "/src/App.css";
import Dice from "./Components/Dice";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dices, setdices] = useState<Array<object>>(()=>generateNewDices());

  console.log(dices);

  function generateNewDices() {
    const min = Math.ceil(1);
    const max = Math.ceil(6);
    const newDices = [];
    for (let i = 0; i < 10; ++i) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      newDices.push({ value: randomNum, isHeld: false, id: nanoid() });
    }
    return newDices;
  }

  function rollDice() {
    setdices(generateNewDices());
  }

  const diceGrid = dices.map((diceObj) => (
    <Dice diceId={diceObj.value} key={diceObj.id}/>
  ));

  return (
    <main className="tenzie-container">
      <h1 className="tenzie__header">Tenzies</h1>
      <p className="tenzie__content">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-grid">{diceGrid}</div>
      <div className="button roll-button" onClick={rollDice}>
        Roll
      </div>
    </main>
  );
}

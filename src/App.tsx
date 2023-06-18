import "/src/App.css";
import Dice from "./Components/Dice";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function App() {
  const [dices, setDices] = useState<Array<object>>(() => generateNewDices());

  const [tenzies, setTenzies] = useState<boolean>(false);

  const [rolls, setRolls] = useState(0);

  const [gameTime, setGameTime] = useState(1);

  useEffect(() => {
    if (!tenzies) {
      const timerId = setInterval(
        () => setGameTime((prevGameTime) => prevGameTime + 1),
        1000
      );
      //Cleanup
      return () => clearTimeout(timerId);
    }
  });

  useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      console.log("Game won");
      setTenzies(true);
    }
  }, [dices]);

  function generateNewDices() {
    const newDices = [];
    for (let i = 0; i < 10; ++i) {
      newDices.push({ value: getRandomNumber(), isHeld: false, id: nanoid() });
    }
    return newDices;
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setRolls(0);
      setDices(generateNewDices());
    } else {
      setRolls((prevRolls) => prevRolls + 1);
      setDices((prevDices) => {
        const newDices = prevDices.map((prevDice) => {
          if (prevDice.isHeld != true) {
            return { ...prevDice, value: getRandomNumber() };
          }
          return prevDice;
        });
        return newDices;
      });
    }
  }

  function holdDice(diceId) {
    setDices((prevDices) => {
      const newDices = prevDices.map((dice) => {
        if (dice.id === diceId) return { ...dice, isHeld: !dice.isHeld };
        return dice;
      });
      return newDices;
    });
  }

  const diceGrid = dices.map((diceObj) => (
    <Dice
      diceValue={diceObj.value}
      isHeld={diceObj.isHeld}
      holdDice={() => holdDice(diceObj.id)}
      key={diceObj.id}
    />
  ));

  const { width, height } = useWindowSize();
  const GameMinutes = Math.floor(gameTime / 60);
  const GameSeconds = gameTime % 60;
  return (
    <main className="tenzie-container">
      {tenzies && <Confetti width={width} height={height} />}
      <div className="game-info">
        <span className="game-rolls">{rolls}</span>
        <span className="game-time">
          Time &nbsp;{`${GameMinutes} : ${GameSeconds}`}
        </span>
      </div>
      <h1 className="tenzie__header">Tenzies</h1>
      <p className="tenzie__content">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-grid">{diceGrid}</div>
      <div className="button roll-button" onClick={rollDice}>
        <span className="no_selection">{tenzies ? "New Game" : "Roll"}</span>
      </div>
    </main>
  );
}

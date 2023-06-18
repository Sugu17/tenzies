export default function Dice(props) {
  const className = props.isHeld ? "dice dice--selected" : "dice";

  return (
    <div className={className} onClick={props.holdDice}>
      <span>{props.diceValue}</span>
    </div>
  );
}

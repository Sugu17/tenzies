export default function Dice(props) {
  const className = props.isHeld ? "dice dice--selected" : "dice";

  return (
    <div className={className} onClick={props.holdDice}>
      <span className="no_selection">{props.diceValue}</span>
    </div>
  );
}

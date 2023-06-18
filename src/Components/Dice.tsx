export default function Dice(props){
    const className=props.isHeld?"dice dice--selected":"dice";
    return(
        <div className={className}><span>{props.diceId}</span></div>
    );
}
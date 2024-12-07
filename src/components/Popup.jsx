/* eslint-disable react/prop-types */
import "../css/Popup.css";
import Confetti from "react-confetti";

const Popup = ({ message, turns, onRestart }) => {
  return (
    <div className="popup-overlay">
      <Confetti numberOfPieces="800" />
      <div className="popup">
        <h2>{message}</h2>
        <h3> Number of turns: {turns}</h3>
        <button className="btn-restart" onClick={onRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Popup;

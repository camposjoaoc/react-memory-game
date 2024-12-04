import "../css/Popup.css";

const Popup = ({ message, onRestart }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{message}</h2>
        <button className="btn-restart" onClick={onRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Popup;

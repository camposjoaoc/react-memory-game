import "../css/game.css";
import { useEffect, useState } from "react";
import SingleCard from "../components/SingleCard";
import Popup from "../components/Popup";

const cardImages = [
  { src: "/img/PinappleCard.png", matched: false },
  { src: "/img/GreenAppleCard.png", matched: false },
  { src: "/img/bananaCard.png", matched: false },
  { src: "/img/CherryCard.png", matched: false },
  { src: "/img/GrapeCard.png", matched: false },
  { src: "/img/LemonCard.png", matched: false },
  { src: "/img/PeachCard.png", matched: false },
  { src: "/img/melonCard.png", matched: false },
  { src: "/img/WatermelonCard.png", matched: false },
];

function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false); // Game over state

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false); // Reset game over state
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    // Check if all cards are matched
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1 className="title-game">Magic Match</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <button onClick={shuffleCards} className="btn-reset-game">
        Reset
      </button>

      {/* Show Popup when game is over */}
      {gameOver && (
        <Popup message="Congratulations! You've matched all cards!" onRestart={shuffleCards} />
      )}
    </div>
  );
}

export default Game;

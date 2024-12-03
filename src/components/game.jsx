import "../css/game.css";
import { useEffect, useState } from "react";
import SingleCard from "../components/SingleCard";

//ObjectArray of cards

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

  // sheffle cards

  const shuffleCards = () => {
    // dublcate each card once
    const shuffleCards = [...cardImages, ...cardImages] //Now we have 18 cards instead of 9.

      //randomize the order of the cards in the array
      .sort(() => Math.random() - 0.5)
      //applay a random id to each of the 12 cards
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
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

  console.log(cards);

  //reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game automaticaly
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
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
        <p>Turns : {turns}</p>
        <button onClick={shuffleCards} className="btn-reset-game">Reset</button>
      </div>
    </>
  );
}

export default Game;

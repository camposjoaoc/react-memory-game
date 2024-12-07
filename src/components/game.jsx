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
  const [showPopup, setShowPopup] = useState(false);
  const [sound, setSound] = useState(null);
  const [bgMusic, setBgMusic] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [goSound, setGoSound] = useState(null); //GameOver SOundEffect

  const apiKey = "F5i6TlqMDuLjO5vqPUIxX38yy0ks87wmK8vO0wDF"; // Replace with your Freesound API key
  const soundId = "420668"; // Replace with the ID of the sound you want to fetch
  const bgMusicId = "653518"; // Background music ID
  const goSoundId = "173859"; //GameOver SoundId

  // Fetch sound effects and background music from Freesound API
  useEffect(() => {
    // Fetch sound for card flip
    fetch(`https://freesound.org/apiv2/sounds/${soundId}/?token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setSound(data.previews["preview-hq-mp3"]); // Save the sound preview URL
      })
      .catch((error) => console.error("Error fetching the sound:", error));

    // Fetch background music
    fetch(`https://freesound.org/apiv2/sounds/${bgMusicId}/?token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setBgMusic(data.previews["preview-hq-mp3"]); // Save the background music URL
      })
      .catch((error) =>
        console.error("Error fetching the background music:", error)
      );

    //Fetch GameOver SoundEffect
    fetch(`https://freesound.org/apiv2/sounds/${goSoundId}/?token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setGoSound(data.previews["preview-hq-mp3"]); // Save the sound preview URL
      })
      .catch((error) => console.error("Error fetching the sound:", error));
  }, []);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false); // Reset game over state
    setShowPopup(false); // Reset popup state
  };

  // Handle card choice and play sound
  const handleChoice = (card) => {
    if (sound) {
      new Audio(sound).play(); // Play sound when a card is clicked
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Handle card matching logic
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

  // Check if all cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  // Reset the game turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Play background music when the game starts
  useEffect(() => {
    if (bgMusic && !isMusicPlaying) {
      const music = new Audio(bgMusic);
      music.loop = true; // Loop the background music
      music.play();
      setIsMusicPlaying(true); // Set the music as playing
    }
  }, [bgMusic, isMusicPlaying]);

  // Timer effect
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

      {/* Show Popup when game is over with a delay 1 sec */}

      {gameOver && (
        <>
          {setTimeout(() => setShowPopup(true), 1000) && null}
          {showPopup && (
            <Popup
              message="Congratulations! You've matched all cards!"
              turns={turns}
              sound={new Audio(goSound).play()} //GameOver Sound
              onRestart={shuffleCards}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Game;

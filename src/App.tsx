import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

interface Card {
  src: string;
  matched?: boolean;
  id?: number; // Optional because it's added later
}

const cardImages: Card[] = [
  { src: "/images/helmet-1.png", matched: false },
  { src: "/images/potion-1.png", matched: false },
  { src: "/images/ring-1.png", matched: false },
  { src: "/images/scroll-1.png", matched: false },
  { src: "/images/shield-1.png", matched: false },
  { src: "/images/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
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
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div>
      <a href="https://github.com/volt-l18/memory-game-react" target="_blank">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48603 2 2 6.48604 2 12C2 17.514 6.48603 22 12 22C17.514 22 22 17.514 22 12C22 6.48604 17.514 2 12 2ZM12 3.5C16.7033 3.5 20.5 7.2967 20.5 12C20.5 15.8327 17.9785 19.0613 14.5 20.126V17.5684C14.5 16.6133 13.9497 15.7943 13.1543 15.3867C13.9276 15.2388 14.6457 14.9454 15.249 14.5309C15.8522 14.1165 16.3232 13.5929 16.6228 13.0037C16.9224 12.4145 17.0421 11.7765 16.9718 11.1429C16.9015 10.5093 16.6434 9.89818 16.2188 9.36035C16.4405 8.67771 16.6883 7.48034 16.0996 6.53809C14.9647 6.53809 14.2323 7.31604 13.8828 7.7998C13.2853 7.60352 12.6459 7.5017 12 7.5C11.3537 7.50057 10.7136 7.60139 10.1152 7.79688C9.76487 7.31289 9.03311 6.53809 7.90039 6.53809C7.22486 7.61941 7.64246 8.78228 7.86621 9.25684C7.41288 9.79235 7.12862 10.4078 7.03781 11.0505C6.94699 11.6931 7.05233 12.3438 7.34478 12.9468C7.63723 13.5498 8.10809 14.087 8.71698 14.5124C9.32587 14.9379 10.0546 15.2389 10.8408 15.3896C10.1877 15.7262 9.69864 16.337 9.54883 17.0781H8.8916C8.2431 17.0781 7.99112 16.8146 7.64062 16.3701C7.29463 15.9256 6.92259 15.6269 6.47559 15.5029C6.23459 15.4774 6.07223 15.6607 6.28223 15.8232C6.99173 16.3062 7.0407 17.0968 7.3252 17.6143C7.5842 18.0803 8.11484 18.5 8.71484 18.5H9.5V20.126C6.02153 19.0613 3.5 15.8327 3.5 12C3.5 7.2967 7.29669 3.5 12 3.5Z"
            fill="white"
          />
        </svg>
      </a>
      <div className="App">
        <h1>Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>
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
      </div>
    </div>
  );
}

export default App;

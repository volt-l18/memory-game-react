import "./SingleCard.css";

interface CardProps {
  src: string;
  id?: number; // Optional ID property
  matched?: boolean; // Optional matched property if you're implementing a matching game
}

// Define the component props interface
interface SingleCardProps {
  card: CardProps;
  handleChoice?: (card: CardProps) => void; // Optional callback for card selection
  flipped?: boolean; // Optional state to track if card is flipped
  disabled?: boolean; // Optional state to disable card interactions
}

const SingleCard: React.FC<SingleCardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled && handleChoice) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front-card" src={card.src} alt="Card Image front" />
        <img
          className="back-card"
          src="/images/cover.png"
          alt="Card Image back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;

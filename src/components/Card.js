import React from "react";
import backpic from "../image/backimg.jpg";
import classnames from "classnames";

const Card = ({ onClick, card, index, isInactive, isFlipped}) => {
  const handleClick = () => {
    !isFlipped && onClick(index);
  };
  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={backpic} alt="backpic" className="img" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="frontpic" className="img" />
      </div>
    </div>
  );
};
export default Card;

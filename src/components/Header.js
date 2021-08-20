import React from "react";
import { Container } from "react-bootstrap";
import { FaRedo } from "react-icons/fa";

const Header = ({ Score, handleRestart }) => {
  return (
    <div>
      <h1>Card Memory Game</h1>
      <Container>
        <div className="sub-header">
          <div className="reshuffle">
            <button onClick={handleRestart}>
              <FaRedo />
            </button>
          </div>
            <div className="high-score">
              <span>Score:</span>
              {Score}
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

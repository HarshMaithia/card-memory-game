import React, { useEffect, useRef, useState } from "react";
import uniqueCardsArray from "./data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

import Header from "./components/Header";
import Card from "./components/Card";

function shuffleCards(array) {
  var length = array.length;
  var j,temp;
  while(--length > 0){
    j = Math.floor(Math.random()*(length+1));
    temp = array[j];
    array[j] = array[length];
    array[length] = temp;  
  }
  return array;
}

const App = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpencards] = useState([]);
  const [matchedCards, setMatchedcards] = useState([]);
  const [Score, setScore] = useState(0);
  const timeout = useRef(null);

  

  const evaluate = () => {
    const [first, second] = openCards;
    
    if (cards[first].type === cards[second].type) {
      setMatchedcards((prev) => [...prev, cards[first].type]);
      setScore((prev) => prev + 1);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpencards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpencards((prev) => [...prev, index]);
      
    } else {
      clearTimeout(timeout.current);
      setOpencards([index]);
    }
  };

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === uniqueCardsArray.length) {
      alert(`You have Won ! your Score is : ${Score}` )
    }
  };


  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };
  const checkIsInactive = (card) => {
    return matchedCards.includes(card.type);
  };
  const handleRestart = () => {
    setMatchedcards([]);
    setOpencards([]);
    setScore(0);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  return (
    <div>
      <Header
        Score={Score}
        handleRestart={handleRestart}
      />
      <Container>
        <Row>
          {cards.map((card, index) => {
            return (
              <Col xs={6} md={3} lg={2}>
                <Card
                  key={index}
                  card={card}
                  index={index}
                  isInactive={checkIsInactive(card)}
                  isFlipped={checkIsFlipped(index)}
                  onClick={handleCardClick}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
      
    </div>
  );
};

export default App;

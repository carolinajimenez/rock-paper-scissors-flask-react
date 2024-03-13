/*
Rock-Paper-Scissors Game

References:
- How to Create a Flask + React Project | Python Backend + React Frontend - https://www.youtube.com/watch?v=7LNl2JlZKHA
- Python + JavaScript - Full Stack App Tutorial - https://www.youtube.com/watch?v=PppslXOR7TA
- React Icons - https://react-icons.github.io/react-icons/
- Rock Paper Scissors React Tutorial in 12 Minutes - https://www.youtube.com/watch?v=7G7n1SnHnDk
*/ 

import React, { useState, useEffect } from 'react';
import { FaHand, FaHandPeace, FaHandFist } from "react-icons/fa6";
import start from './images/start.png';
import rock from './images/rock.gif';
import paper from './images/paper.gif';
import scissors from './images/scissors.gif';
import './App.css';

function ActionButton({action, onActionSelected}) {
  const ICONS = {
    "r": <FaHandFist className="icon" />,
    "p": <FaHand className="icon" />,
    "s": <FaHandPeace className="icon" />,
  }
  const Icon = ICONS[action]

  const handleClick = () => {
    // Enviar acción al servidor Flask
    fetch('/play_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    })
    .then(response => response.json())
    .then(response => {
      // Manejar la respuesta del servidor
      onActionSelected(response, action);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <button className="round-btn" onClick={handleClick}>
      {Icon}
    </button>
  )
}

function ActionIcon({name, action}) {
  const ICONS = {
    "start": {"icon": start, "word": "start"},
    "r": {"icon": rock, "word": "rock"},
    "p": {"icon": paper, "word": "paper"},
    "s": {"icon": scissors, "word": "scissors"},
  }
  const icon = ICONS[action]["icon"]
  const action_word = ICONS[action]["word"]
  const clase = `${action_word}-${name == "Player" ? "user" : "pc" }-icon`
  return (
    <img src={icon} className={clase} alt="icon" />
  )
}

function Player({name = "Player", action="start"}) {
  return (
  <div className="player">
    <div className="score">{`${name}`}</div>
    <div className="action">
        {action && <ActionIcon name={name} action={action} />}
    </div>
  </div>
  )
}

export default function App() {
  const [playerAction, setPlayerAction] = useState("start");
  const [computerAction, setComputerAction] = useState("start");

  const [winner, setWinner] = useState("");

  const onActionSelected = (response, selectedAction) => {
    setPlayerAction(selectedAction);
    setComputerAction(response['computer_action'])
    setWinner(response['result'])
  }

  return (
    <div className="App">
      <header className="App-container">
        <h1>Rock Paper Scissors</h1>
        <div>
          <div className="container">
              <Player name="Player" action={playerAction} />
              <h2>vs</h2>
              <Player name="Computer" action={computerAction} />
          </div>
          <div className="action-btn">
              <ActionButton action="r" onActionSelected={onActionSelected} />
              <ActionButton action="p" onActionSelected={onActionSelected} />
              <ActionButton action="s" onActionSelected={onActionSelected} />
          </div>
          <h2>{winner}</h2>
        </div>
      </header>
    </div>
  );
}

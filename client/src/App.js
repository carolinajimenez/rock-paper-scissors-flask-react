/*
Rock-Paper-Scissors Game

References:
- How to Create a Flask + React Project | Python Backend + React Frontend - https://www.youtube.com/watch?v=7LNl2JlZKHA
- Python + JavaScript - Full Stack App Tutorial - https://www.youtube.com/watch?v=PppslXOR7TA
- React Icons - https://react-icons.github.io/react-icons/
- Rock Paper Scissors React Tutorial in 12 Minutes - https://www.youtube.com/watch?v=7G7n1SnHnDk
- Build Rock, Paper and Scissors Game with React JS - https://www.youtube.com/watch?v=tCSaSDgz2Hw
*/ 

import React, { useState, useEffect } from 'react';
import { FaHand, FaHandPeace, FaHandFist } from "react-icons/fa6";
import start from './images/start.png';
import rock from './images/rock.gif';
import paper from './images/paper.gif';
import scissors from './images/scissors.gif';
import './App.css';

function ActionButton({ action, onActionSelected, activeButton, setActiveButton }) {
  /**
   * Button component for rock, paper, scissors actions.
   * 
   * @param {string} action - The action associated with the button ('r' for rock, 'p' for paper, 's' for scissors).
   * @param {function} onActionSelected - Callback function invoked when the button is clicked, passing the selected action and server response.
   * @param {string} activeButton - The currently active button.
   * @param {function} setActiveButton - Function to set the currently active button.
   */
  const ICONS = {
    "r": <FaHandFist className="icon" />,
    "p": <FaHand className="icon" />,
    "s": <FaHandPeace className="icon" />,
  };
  const Icon = ICONS[action];

  const handleClick = () => {
    setActiveButton(action); // Set this button as active
    // Send action to the Flask server
    fetch('/play_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    })
    .then(response => response.json())
    .then(response => {
      // Handle server response
      onActionSelected(response, action);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <button
      className={`round-btn ${action} ${activeButton === action ? 'active' : ''}`}
      onClick={handleClick}
    >
      {Icon}
    </button>
  )
}

function ActionIcon({name, action}) {
  /**
   * Component for displaying action icons.
   * 
   * @param {string} name - The name associated with the icon ('Player' or 'Computer').
   * @param {string} action - The action associated with the icon ('start', 'r' for rock, 'p' for paper, 's' for scissors).
   */
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

function Player({name = "Player", action="start", winner}) {
  /**
   * Component representing a player in the game.
   * 
   * @param {string} name - The name of the player ('Player' or 'Computer').
   * @param {string} action - The action chosen by the player ('start', 'r' for rock, 'p' for paper, 's' for scissors).
   * @param {string} winner - The result of the game ('Player won!', 'Player lost!', 'It's a tie', or '').
   */
  const result = (winner === undefined || winner === "" ) ? "" : winner === "Player won!" ? "you" : winner === "Player lost!" ? "pc" : "draw";
  return (
  <div className={`player ${name}-${result}`}>
    <div className={`score ${name}-${result}`}>{`${name}`}</div>
    <div className="action">
        {action && <ActionIcon name={name} action={action} />}
    </div>
  </div>
  )
}

export default function App() {
  // State variables for player and computer actions, and game winner
  const [playerAction, setPlayerAction] = useState("start");
  const [computerAction, setComputerAction] = useState("start");

  const [winner, setWinner] = useState("");

  const [activeButton, setActiveButton] = useState(null);

  // Function to handle action selection
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
          <div className="action-btn">
              <ActionButton action="r" onActionSelected={onActionSelected} activeButton={activeButton} setActiveButton={setActiveButton} />
              <ActionButton action="p" onActionSelected={onActionSelected} activeButton={activeButton} setActiveButton={setActiveButton} />
              <ActionButton action="s" onActionSelected={onActionSelected} activeButton={activeButton} setActiveButton={setActiveButton} />
          </div>
          <div className="container">
              <Player name="Player" action={playerAction} winner={winner} />
              <h2>vs</h2>
              <Player name="Computer" action={computerAction} winner={winner} />
          </div>
          <h2>{winner}</h2>
        </div>
      </header>
    </div>
  );
}

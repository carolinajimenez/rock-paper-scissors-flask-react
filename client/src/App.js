/*
Rock-Paper-Scissors Game

References:
- https://www.youtube.com/watch?v=7LNl2JlZKHA
- https://www.youtube.com/watch?v=PppslXOR7TA
- https://react-icons.github.io/react-icons/search/#q=hand
*/ 

import React, { useState, useEffect } from 'react';
import { FaHand, FaHandPeace, FaHandFist } from "react-icons/fa6";
import start from './images/start.png';
import paper from './images/paper.gif';
import rock from './images/rock.gif';
import scissors from './images/scissors.gif';
import './App.css';

export default function App() {
    return (
      <div className="App">
        <header className="App-container">
          <h1>Rock Paper Scissors</h1>
          <div>
            <div className="container">
                <div className="player">
                    <div className="score">Player: 0</div>
                    <div>
                        <img src={start} className="start-user-icon" alt="start" />
                    </div>
                </div>
                <h2>vs</h2>
                <div className="player">
                    <div className="score">Computer: 0</div>
                    <div>
                        <img src={start} className="start-pc-icon" alt="start" />
                    </div>
                </div>
            </div>
            <div className="action-btn">
                <button className="round-btn"><FaHandFist  className="icon" /></button>
                <button className="round-btn"><FaHand  className="icon" /></button>
                <button className="round-btn"><FaHandPeace  className="icon" /></button>
            </div>
            <h2>Player wins!</h2>
          </div>
        </header>
      </div>
    );
}

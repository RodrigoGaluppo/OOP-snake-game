import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
        <div className="wn">
            <canvas id="stage" >
            </canvas>
        </div>
        <div className="infoScore" >
            <p id="score" >score 200</p>
        </div>
        <div className="infoHighScore" >
            <p id="highscore" >highscore 200</p>
        </div>
        <div className="joystick">
            <div className="buttons">
                <div className="ButtonLine"></div>
                <div id="TrueButton" className="ButtonLine">
                    <button id="up" className="control" >up</button>
                </div>
                <div  className="ButtonLine"></div>

                <div id="TrueButton" className="ButtonLine">
                    <button id="left" className="control" > left </button>
                </div>
                <div className="ButtonLine"></div>
                <div id="TrueButton" className="ButtonLine">
                    <button id="right" className="control"> right </button>
                </div>

                <div className="ButtonLine"></div>
                <div id="TrueButton" className="ButtonLine">
                    <button id="down" className="control" >down</button>
                </div>
                <div className="ButtonLine"></div>
            </div>
        </div>
    </div>


  );
}

export default App;

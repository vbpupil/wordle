import React from 'react';
import ReactDOM from 'react-dom';
import Wordle from "./Components/Wordle";

ReactDOM.render(
    <Wordle numOfRounds={6} wordLength={5}/>,
    document.getElementById('root')
);
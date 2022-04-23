import React from 'react';
import ReactDOM from 'react-dom';
import Wordle from "./Components/Wordle";

ReactDOM.render(
    <Wordle NumOfRounds={6} WordLength={5}/>,
    document.getElementById('root')
);
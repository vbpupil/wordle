import React from 'react';
import Row from "./Row";
import '../Style.css';
import {words} from '../words'
import SubmitAnswer from "./SubmitAnswer";

interface WordleProps {
    NumOfRounds: number;
    WordLength: number;
};

interface BoardState {
    rounds: number;
    letterCount: number;
    word: string;
    activeRound: number;
    rows: JSX.Element[],
    reavealAnswer?: boolean
}

export default class Wordle extends React.Component<WordleProps, BoardState> {
    constructor(props: WordleProps) {
        super(props);

        this.state = {
            letterCount: this.props.WordLength,
            rounds: this.props.NumOfRounds,
            activeRound: 0,
            word: '',
            rows: [],
            reavealAnswer: false
        };
    }

    componentDidMount() {
        this.initialiseBoard();
    }

    initialiseBoard(){
        this.setWord();
    }

    setWord() {
        const randKey = Math.floor(Math.random() * words.length);
        this.setState({
            ...this.state,
            word: words[randKey]
        }, this.setRows);
    }

    setRows() {
        let rows = [];
        for (let i = 0; i < 5; i++) {
            rows.push(<Row key={i} word={this.state.word} revealAnswer={false} disabled={true}/>);
        }
        this.setState({
            ...this.state,
            rows
        });
    }

    startRound():void{
        // this.state.rows[this.state.activeRound].disabled = false;
    }

    handleSubmit(): void {
        console.log('handleSubmit clicked');
        // this.state.rows[this.state.activeRound - 1].revealAnswer = true;
    }

    render() {
        return (
            <>
                <div className="wordle_board">
                    {this.state.rows}
                </div>
                <SubmitAnswer handleClick={this.handleSubmit}/>
            </>
        );
    };
}
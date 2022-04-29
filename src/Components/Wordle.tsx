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
    rowData: RowDataInterface[]
}

interface RowDataInterface {
    disabled: boolean;
    revealAnswer: boolean;
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
            rowData: [],
            reavealAnswer: false
        };
    }

    componentDidMount() {
        this.setWord();
    }

    setWord() {
        const randKey = Math.floor(Math.random() * words.length);
        this.setState({
            ...this.state,
            word: words[randKey]
        }, this.setRowData);
    }

    setRowData() {
        let rowData: RowDataInterface[] = this.state.rowData;
        for (let i = 0; i < this.state.rounds; i++) {
            rowData.push({disabled: true, revealAnswer: false})
        }
        this.setState({
            ...this.state,
            rowData
        }, this.setRows);
    }

    setRows() {
        let rows = [];
        for (let i = 0; i < this.state.rounds; i++) {
            rows.push(<Row key={i} word={this.state.word} revealAnswer={this.state.rowData[i].revealAnswer}
                           disabled={this.state.rowData[i].disabled}/>);
        }
        this.setState({
            ...this.state,
            rows,
        }, this.incrementRound);
    }

    incrementRound(): void {
        const rowData = this.state.rowData.map((data, key) => {
            return key === this.state.activeRound ? {...data, disabled: !data.disabled} : data;
        });

        this.setState({
            ...this.state,
            rowData,
            activeRound: this.state.activeRound + 1
        });
    }

    handleSubmit(): void {
        console.log('handleSubmit clicked');
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
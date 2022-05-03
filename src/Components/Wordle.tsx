import React from 'react';
import Row from "./Row";
import '../Style.css';
import {words} from '../words'
import SubmitAnswer from "./SubmitAnswer";

interface WordleProps {
    numOfRounds: number;
    wordLength: number;
};

interface BoardState {
    rounds: number;
    letterCount: number;
    word: string;
    activeRound: number;
    rowData: RowDataInterface[],
    won: boolean;
}

interface RowDataInterface {
    disabled: boolean;
    revealAnswer: boolean;
    cellData: CellDataInterface[]
}

export interface CellDataInterface {
    word: string;
    cellNum: number;
    answerLetter: string;
    guessLetter: string;
}

export default class Wordle extends React.Component<WordleProps, BoardState> {
    constructor(props: WordleProps) {
        super(props);

        this.state = {
            won: false,
            letterCount: this.props.wordLength,
            rounds: this.props.numOfRounds,
            activeRound: 0,
            word: '',
            rowData: [],
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
        const wordCount = this.state.word.split('')

        for (let i = 0; i < this.state.rounds; i++) {
            let cellData: CellDataInterface[] = [];

            for (let c = 0; c < wordCount.length; c++) {
                cellData.push({
                    word: this.state.word,
                    cellNum: c,
                    answerLetter: wordCount[c],
                    guessLetter: ''
                })
            }

            rowData.push({disabled: true, revealAnswer: false, cellData: cellData})
        }

        this.setState({
            ...this.state,
            rowData
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

    handleCellGuess = (rowNumber: number, cellNumber: number, guess: string): void => {
        const rowData = this.state.rowData;
        rowData[rowNumber].cellData[cellNumber] = {...this.state.rowData[rowNumber].cellData[cellNumber], guessLetter:guess}

        this.setState({
            ...this.state,
            rowData
        })
    }

    handleSubmit = (): void => {
        const rowData = this.state.rowData.map((data, index) => {
            return (index + 1) === this.state.activeRound ? {...data, revealAnswer: !data.revealAnswer} : data
        });

        this.setState({
            ...this.state,
            rowData
        }, this.incrementRound)
    }



    render() {
        let rows = [];

        for (let i = 0; i < this.state.rounds; i++) {
            if (this.state.rowData[i]) {
                rows.push(<Row key={i}
                               word={this.state.word}
                               revealAnswer={this.state.rowData[i].revealAnswer}
                               disabled={this.state.rowData[i].disabled}
                               rowNum={i}
                               handleGuess={this.handleCellGuess}
                               cellData={this.state.rowData[i].cellData}
                />);
            }
        }

        return (
            <>
                <div className="wordle_board">
                    {rows}
                </div>
                {this.state.activeRound < this.props.numOfRounds &&
                    <SubmitAnswer handleClick={this.handleSubmit}/>
                }
            </>
        );
    };
}
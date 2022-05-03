import React from 'react';
import Cell from './Cell';
import {CellDataInterface} from "./Wordle";

interface RowProps {
    word: string;
    revealAnswer: boolean;
    disabled: boolean;
    handleGuess: (rowNumber: number, cellNumber: number, guess: string) => void;
    rowNum: number;
    cellData: CellDataInterface[];
};

export default class Row extends React.Component<RowProps> {
    render() {
        let cells = [];

        const wordCount = this.props.word.split('')
        for (let i = 0; i < wordCount.length; i++) {
            cells.push(<Cell key={i}
                             cellNum={i}
                             cellData={this.props.cellData}
                             disabled={this.props.disabled}
                             word={this.props.word}
                             revealAnswer={this.props.revealAnswer}
                             handleGuess={this.props.handleGuess}
                             rowNum={this.props.rowNum}
            />);
        }

        return (
            <div className="wordle_row">
                {cells}
            </div>
        )
            ;
    }
}
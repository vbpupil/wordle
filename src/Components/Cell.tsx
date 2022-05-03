import React, {SyntheticEvent} from 'react';
import {CellDataInterface} from "./Wordle";

interface CellProps {
    revealAnswer: boolean;
    rowNum: number;
    cellNum: number;

    word: string;
    disabled: boolean;
    handleGuess: (rowNumber: number, cellNumber: number, guess: string) => void;

    cellData: CellDataInterface[];
};

export default class Cell extends React.Component<CellProps> {
    constructor(props: CellProps) {
        super(props);
    }

    handleDownKeyPress(event:any) {
        // console.log('hit')
        // return false
        // const value = event.target.value.split('');
        //
        // if (value.length > 1) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
    }

    render() {
        let baseClass = '';

        if (this.props.cellData[this.props.cellNum].guessLetter !== '' && this.props.revealAnswer) {
            if (this.props.word.includes(this.props.cellData[this.props.cellNum].guessLetter)) {
                baseClass = 'in-word'; // orange
            } else {
                if (this.props.cellData[this.props.cellNum].answerLetter !== this.props.cellData[this.props.cellNum].guessLetter) {
                    baseClass = 'not-matched'; // gray
                }
            }

            if (this.props.cellData[this.props.cellNum].guessLetter === this.props.cellData[this.props.cellNum].answerLetter) {
                baseClass = 'match'; // green
            }
        }

        return (
            <div className="wordle_cell_wrapper">
                <input type="text" maxLength={1}
                       onChange={(e) => {
                           this.props.handleGuess(
                               this.props.rowNum,
                               this.props.cellNum,
                               e.target.value
                           )
                       }}
                       onKeyDown={this.handleDownKeyPress}
                       className={baseClass}
                       disabled={this.props.disabled}
                />
            </div>
        );
    }
}

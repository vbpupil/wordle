import React from 'react';
import Cell from './Cell';

interface RowProps {
    word: string;
    revealAnswer: boolean;
};

interface RowState{
    word: string;
    cells: JSX.Element[];
    revealAnswer: boolean;
};

export default class Row extends React.Component<RowProps, RowState> {
    constructor(props: RowProps) {
        super(props);
        this.state = {
            word: this.props.word,
            cells: [],
            revealAnswer: this.props.revealAnswer
        };
    }

    componentDidMount() {
        this.setCells();
    }

    setCells() {
        let cells = [];
        const wordCount = this.state.word.split('')
        for (let i = 0; i < wordCount.length; i++) {
            cells.push(<Cell key={i} disabled={true} word={this.state.word} answerLetter={wordCount[i]} revealAnswer={this.state.revealAnswer} />);
        }

        this.setState({
           ...this.state,
           cells
        });
    }

    render() {
        return (
            <div className="wordle_row">
                {this.state.cells}
            </div>
        );
    }
}
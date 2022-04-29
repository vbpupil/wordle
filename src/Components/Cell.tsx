import React from 'react';

interface CellProps {
    answerLetter: string;
    revealAnswer: boolean;
    word: string;
    disabled: boolean;
};

interface CellState {
    answer: string;
    guess: string;
    reveal: boolean;
    word: string;
    disabled: boolean;
}

export default class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
        this.state = {
            word: this.props.word,
            answer: this.props.answerLetter,
            reveal: this.props.revealAnswer,
            guess: '',
            disabled: this.props.disabled
        };
    }

    onInputchange = (event: any) => {
        this.setState({
            ...this.state,
            guess: event.target.value
        });
    }

    render() {
        let baseClass = '';

        if (this.state.guess !== '' && this.state.reveal) {
            if (this.state.word.includes(this.state.guess)) {
                baseClass = 'in-word'; // orange
            } else {
                if (this.state.answer !== this.state.guess) {
                    baseClass = 'not-matched'; // gray
                }
            }

            if (this.state.guess === this.state.answer) {
                baseClass = 'match'; // green
            }
        }

        return (
            <div className="wordle_cell_wrapper">
                <input type="text" maxLength={1} onChange={this.onInputchange}
                       className={baseClass}
                       disabled={this.state.disabled}
                />
            </div>
        );
    }
}
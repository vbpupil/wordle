import React from 'react';

interface SubmitAnswerProp {
    handleClick: () => void;
};

export default class SubmitAnswer extends React.Component<SubmitAnswerProp, any> {

    render() {
        return (
            <button onClick={() => this.props.handleClick() }>Submit</button>
        );
    };
}
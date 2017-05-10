import * as React from "react";

export interface BtnProps {
    textLabel: string;
    clickHandler: () => any;
}

class Btn extends React.Component<BtnProps, any> {
    public render() {
        return (
            <button onClick={() => { this.props.clickHandler(); }}>
                {this.props.textLabel}
            </button>
        );
    }
}

export default Btn;

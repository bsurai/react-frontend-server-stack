import * as React from "react";
import Btn from "../../components/btn_component";
import { BtnProps } from "../../components/btn_component";


class ButtonGithub extends React.Component<any, any> {
    
    public render() {

        const title = "Connet with GitHub";

        return (
            <div>
                <Btn clickHandler={this.props.fetchLogin} textLabel={title} />
            </div>
        );
    }
}

export default ButtonGithub;
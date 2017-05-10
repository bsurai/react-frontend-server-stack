import * as React from "react";
import Btn from "../../components/btn_component";
import { BtnProps } from "../../components/btn_component";


class ButtonFacebook extends React.Component<any, any> {
    
    public render() {

        const title = "Connet with Facebook";
        
        return (
            <div>
                <Btn clickHandler={this.props.fetchLogin} textLabel={title} />
            </div>
        );
    }
}

export default ButtonFacebook;
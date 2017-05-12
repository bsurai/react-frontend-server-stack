import * as React from "react";
import Btn from "../../components/btn_component";
import { BtnProps } from "../../components/btn_component";


/*class ButtonFacebook extends React.Component<any, any> {
    
    public render() {

        const title = "Connet with Facebook";
        
        return (
            <Btn clickHandler={this.props.fetchLogin} textLabel={title} />
        );
    }
}*/

class ButtonFacebook extends React.Component<any, any> {

    public render() {

        const title = "Connect with Facebook";
        const style = {
            appearance: 'button',
            decoration: 'none',
            color: 'initial',
        };
    return(
            <a href={"http://localhost:4000/auth/facebook"} style={style}>{title}</a>
        );
    }
}

export default ButtonFacebook;
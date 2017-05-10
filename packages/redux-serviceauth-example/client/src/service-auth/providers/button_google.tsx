import * as React from "react";
import Btn from "../../components/btn_component";
import { BtnProps } from "../../components/btn_component";


class ButtonGoogle extends React.Component<any, any> {
    
    public render() {

        const title = "Connet with Google";
        //const someFunc = ()=>{ };

        return (
            <div>
                <Btn clickHandler={this.props.fetchLogin} textLabel={title} />
            </div>
        );
    }
}

export default ButtonGoogle;
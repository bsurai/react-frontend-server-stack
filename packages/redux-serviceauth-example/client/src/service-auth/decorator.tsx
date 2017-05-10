import * as React from "react";
import providers from "./providers";

let DefaultComponent: any;

class ServiceButtons extends React.Component<any, any> {
    public render() {
        return (
            <div>{
                providers.buttons.map(
                    (btn, ind) => <btn.component key={ind} fetchLogin={() => { this.props.actionsAuth.fetchLogin(btn.name) }} />
                )
            }</div>
        )
    }
};

export class Wrapped extends React.Component<any, any> {
    public render() {
        let { authentication, actionsAuth } = this.props;
        let { isAuthenticated } = this.props.authentication;

        return (
            <div>{
                isAuthenticated ?
                    <DefaultComponent {...this.props} /> :
                    <ServiceButtons actionsAuth={actionsAuth} />
            }</div>
        )
    }
};

const decorator = () => {
    return (_defaultComponent: any) => {
        DefaultComponent = _defaultComponent;
        return Wrapped;
    };
};

export default decorator;


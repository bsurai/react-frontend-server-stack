import * as React from "react";
import * as createReactClass from "create-react-class";
import providers from "./components";

let DefaultComponent: any;

class ServiceButtons extends React.Component<any, any> {
    public render() {
        return (
            <ul>{
                providers.buttons.map(
                    (btn, ind) => <li key={ind}><btn.component name={btn.name} /></li>
                )
            }</ul>
        )
    }
};

/* export class Wrapped extends React.Component<any, any> {

    componentDidMount() {
        const { actionsAuth } = this.props;
        actionsAuth.fetchLogin();
    }

    public render() {
        const { authentication: { isAuthenticated } } = this.props;
        console.log("render isAuthenticated = " + isAuthenticated);

        return (
            <div>{
                isAuthenticated ?
                    <DefaultComponent {...this.props} /> :
                    <ul>{
                        providers.buttons.map(
                            (btn, ind) => <li key={ind}><btn.component name={btn.name} /></li>
                        )
                    }</ul>
            }</div>
        )
    }
};*/

const decorator = () => {
    return (_defaultComponent: any) => {
        let DefaultComponent = _defaultComponent;
        return createReactClass({
            componentDidMount() {
                const { actionsAuth } = this.props;
                actionsAuth.fetchLogin();
            },
            render() {
                const { authentication: { isAuthenticated } } = this.props;
                console.log("render isAuthenticated = " + isAuthenticated);

                return (
                    <div>{
                        isAuthenticated ?
                            <DefaultComponent {...this.props} /> :
                            <ServiceButtons />
                    }</div>
                )
            }
        });;
    };
};

export default decorator;


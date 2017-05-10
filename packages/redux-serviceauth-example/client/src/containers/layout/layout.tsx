import * as React from "react";
import { Link } from "react-router";
// import serviceAuth from "../../service-auth";

// @serviceAuth.decorator()
class AppLayout extends React.Component<any, any> {
    public render() {
        return (
            <div className="container">
                <div className="navbar">
                    <Link id="link_to_home" className="link_to" to="/">Home</Link>
                    <Link id="link_to_users" className="link_to" to="/users">Users</Link>
                    <Link id="link_to_repos" className="link_to" to="/repos">Repos</Link>
                </div>
                {this.props.children}
                <div className="break"/>
                {this._renderDevtoolsNote()}
            </div>
        );
    }

    private _renderDevtoolsNote() {
        if (process.env.NODE_ENV === "production") {
            return <div/>;
        } else {
            return (
                <p>
                    Note: Use <span className="label">Ctrl</span> + <span className="label">h</span>
                    to show/hide the redux development tools!
                </p>
            );
        }
    }
}

export default AppLayout;

import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import userActions from "../../actions/user_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";
import serviceAuth from "../../service-auth";

function mapStateToPropsUserPage(state: any) {
    return { users: state.users, authentication: state.authentication };
}

function mapDispatchToPropsUserPage(dispatch: Redux.Dispatch<any>) {
    return { 
        actions : bindActionCreators(userActions, dispatch),
        actionsAuth: bindActionCreators(serviceAuth.actions, dispatch)
    };
}

@connect(mapStateToPropsUserPage, mapDispatchToPropsUserPage)
@serviceAuth.decorator()
class UsersPage extends React.Component<any, any> {
    public render() {
        let label = "Loading...";
        if (this.props.users !== undefined && this.props.users.loading === false) {
            label = this.props.users.usersCount;
        }
        return (
            <div>
                <h1>Users Page!</h1>
                <Counter count={label}
                         addBtnTextLabel={"Add User"}
                         incrementAsync={() => { this.props.actions.addUserAsync(); } } />
            </div>);
    }
}

export default UsersPage;

import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import repoActions from "../../actions/repo_actions";
import Counter from "../../components/counter_component";
import * as Redux from "redux";
import serviceAuth from "../../service-auth";

function mapStateToPropsReposPage(state: any) {
    return { repos: state.repos, authentication: state.authentication };
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch<any>) {
    return {
        actions: bindActionCreators(repoActions, dispatch),
        actionsAuth: bindActionCreators(serviceAuth.actions, dispatch)
    };
};

@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
@serviceAuth.decorator()
class ReposPage extends React.Component<any, any> {
    public render() {

        console.log(" ReposPage this.props")
        console.log(this.props)

        let label = "Loading...";
        if (this.props.repos !== undefined && this.props.repos.loading === false) {
            label = this.props.repos.reposCount;
        }

        return (
            <div>
                <h1>Repos Page!</h1>
                <Counter count={label}
                    addBtnTextLabel={"Add Repo"}
                    incrementAsync={() => { this.props.actions.addRepoAsync(); }} />
            </div>);
    }
}

export default ReposPage;
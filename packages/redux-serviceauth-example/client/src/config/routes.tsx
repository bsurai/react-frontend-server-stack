import * as React from "react";
import { IndexRoute, Route, Redirect, browserHistory } from "react-router";
import AppLayout from "../containers/layout/layout";
import HomePage from "../containers/pages/home_page";
import UsersPage from "../containers/pages/users_page";
import ReposPage from "../containers/pages/repos_page";
import NotFoundPage from "../containers/pages/not_found_page";

const routes = (
        <Route path="/" component={AppLayout}>
                <IndexRoute component={HomePage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/repos" component={ReposPage} />
                <Route path="/404" component={NotFoundPage} />
                <Redirect from="*" to="/404" />
        </Route>
);
export default routes;

import * as fetch from 'isomorphic-fetch';
import ACTION_TYPES from "../constants/action_types";
import * as I from "../interfaces";

const loginBegin: I.IActionCreatorSync = () => {

    console.log("loginBegin");
    return {
        type: ACTION_TYPES.LOGIN_BEGIN
    }
};

const loginSuccess: I.IActionCreatorSync = (params: I.IUserParams) => {
    console.log("loginSuccess");
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS,
        user: params.user,
        service: params.service
    }
};

const loginError: I.IActionCreatorSync = () => {
    console.log("loginError");
    return {
        type: ACTION_TYPES.LOGIN_ERROR
    }
};

const fetchLogin = (service: string) => ({ dispatch }) => {//(service: string) => {

    return (dispatch) => {

        dispatch(loginBegin());
        return fetch("http://localhost:4000/auth/" + service)
            .then(response => {
                console.log(`response.status ${response.status}`);
                if (response.status >= 400) {
                    dispatch(loginError());
                    return;
                };
                console.log(`response ${response}`);
                response.json();
            })
            .then(json => {
                console.log(`parsed data ${json}`);
                dispatch(loginSuccess(json));
            })
            .catch(error => {
                console.log(`request failed ${error}`);
                dispatch(loginError());
            });
    };
};

export default {
    loginBegin,
    loginSuccess,
    loginError,
    fetchLogin
};

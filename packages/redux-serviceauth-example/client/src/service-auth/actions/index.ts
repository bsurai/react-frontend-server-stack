import * as fetch from 'isomorphic-fetch';
import ACTION_TYPES from "../constants/action_types";
import * as I from "../interfaces";

type RequestCredentials = "omit" | "same-origin" | "include";
const credentials: RequestCredentials = "include";

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

const fetchLogin = () => ({ dispatch }) => {//(service: string) => {

    return (dispatch) => {
        console.log('fetchLogin')
        
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
            credentials
        };

        dispatch(loginBegin());
        return fetch("http://localhost:4000/auth/login", options)
            .then(response => {
                console.log(`response.status ${response.status}`);
                console.log('response\'s headers');
                response.headers.forEach((item) => console.log(item));

                if (response.status >= 400) {
                    dispatch(loginError());
                    return;
                };
                return response.json();
            })
            .then(json => {
                console.log(`parsed data ${json}`);
                console.log(json);
                if (!json) return;
                dispatch(loginSuccess(json));
            })
            .catch(error => {
                console.log(`request failed ${error}`);
                console.log(error);
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

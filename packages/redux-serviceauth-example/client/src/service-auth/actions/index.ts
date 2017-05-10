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

        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }/*,
            body: JSON.stringify({
                email: 'foo',
                pass: 'bar'
            })*/
        };

        dispatch(loginBegin());
        return fetch("http://localhost:4000/auth/" + service, options)
            .then(response => {
                console.log(`response.status ${response.status}`);
                console.log(response);
                if (response.status >= 400) {
                    dispatch(loginError());
                    return;
                };
                console.log(`response ${response}`);
                return response.json();
            })
            .then(json => {
                console.log(`parsed data ${json}`);
                console.log(json);
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

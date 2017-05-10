import * as Redux from "redux";
import ACTION_TYPES from "../constants/action_types";
import * as I from "../interfaces";

const defaultAuthState: I.IAuthState = {
    isAuthenticated: false,
    isFetching: false,
    user: "",
    service: ""
};

const authReducer = (previousState: I.IAuthState = defaultAuthState, action: any): I.IAuthState => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_BEGIN:
            return { ...previousState, isFetching: true };
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...previousState,
                isFetching: false,
                isAuthenticated: true,
                user: action.user,
                service: action.service
            };
        case ACTION_TYPES.LOGIN_ERROR:
            return defaultAuthState;
        default:
            return previousState;
    }
}

export default authReducer;
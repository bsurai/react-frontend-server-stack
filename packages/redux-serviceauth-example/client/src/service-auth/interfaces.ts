export interface IAuthState {
    isAuthenticated: boolean, 
    isFetching: boolean,
    user: string,
    service: string
};

export interface IActionSync {
    type: string,
    user?: string,
    service?: string
};

export interface IUserParams {
    user: string,
    service: string
}

export type IActionCreatorSync = (params?: any) => IActionSync;
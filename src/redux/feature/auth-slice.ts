import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState
}
type AuthState = {
    token: string;
    isAuth: boolean;
    isModerator:boolean;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        sex: string;
        isEmailValidated: boolean;
        address: string;
        phone: string;
        createdTime: Date;
        profilePicture: string;
        role: string;
    };
}
const initialState = {
    value: {
        token:'',
        isAuth: false,
        isModerator: false,
        user: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            sex: '',
            isEmailValidated: '',
            address: '',
            phone: '',
            createdTime: '',
            profilePicture: '',
            role: '',
        },
    } as AuthState
} as InitialState
export const auth = createSlice({
    name:"auth",
    initialState,
    reducers: {
        logOut: () => {return initialState},
        logIn: (state, action) => {
            return {
                value: {
                    isAuth: true,
                    token:action.payload.token,
                    isModerator:false,
                    user: action.payload.user
                },
            };
        },
        // toggleModerator: (state) => {
        //     state.value.isModerator = !state
        // }
    }
})
export const {logIn, logOut} = auth.actions;
export default auth.reducer
// {
//     id: action.payload.user?.id,
//         firstName: action.payload.user?.firstName,
//     lastName: action.payload.user?.lastName,
//     email: action.payload.user?.email,
//     sex: action.payload.user?.sex,
//     isEmailValidated: action.payload.user?.isEmailValidated,
//     address: action.payload.user?.address,
//     phone: action.payload.user?.phone,
//     createdTime: action.payload.user?.createdTime,
//     profilePicture: action.payload.user?.profilePicture,
//     role: action.payload.user?.role,
// }
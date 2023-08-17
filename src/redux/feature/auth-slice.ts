import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState
}
type AuthState = {
    token: {
        access: string;
        refresh: string;
    };
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
        store: {
            id: string,
            name:string,
            slogan:string,
            imgUrl:string,
            isActive:boolean,
            userId:string,
        }
    };
}
const initialState = {
    value: {
        token: {
            access: '',
            refresh: '',
        },
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
            store: {
                id: '',
                name:'',
                slogan:'',
                imgUrl:'',
                isActive:'',
                userId:'',
            }
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
                    token: action.payload.token,
                    isModerator:false,
                    user: action.payload.user
                },
            };
        },
    }
})
export const {logIn, logOut} = auth.actions;
export default auth.reducer
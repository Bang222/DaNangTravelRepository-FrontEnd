import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialState = {
    value: AuthState
}
export type AuthState = {
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
            isActive:string,
            userId:string,
            paymentId:string,
            createdAt:Date,
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
                name: '',
                slogan: '',
                imgUrl: '',
                isActive: '',
                paymentId: '',
                createdAt:'',
                userId: '',
            }
        },
    } as unknown as AuthState
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
        updateUserDetails: (state, action) => {
            const { name, paymentId } = action.payload;
            state.value.user.store.name = name;
            state.value.user.store.paymentId = paymentId;
        },
    }
})
export const {logIn, logOut,updateUserDetails} = auth.actions;
export default auth.reducer

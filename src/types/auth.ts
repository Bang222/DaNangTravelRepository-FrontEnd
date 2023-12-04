import {StatusCodeDTO} from "@/types/StatusCode";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    firstName: string;
    lastName: string;
    address: string;
    sex: string;
    email: string;
    password: string;
}

export interface UserRequestDTO extends StatusCodeDTO{
    token: {
        access: string;
        refresh: string;
    };
    user?: {
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

export interface UserDTO {
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
}

export interface TourIdEndToken {
    token: string
    tourId: string
}

export interface UserReduxDTO {
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
        name: string,
        slogan: string,
        imgUrl: string,
        isActive: boolean,
        userId: string,
        paymentId: string,
    }
}

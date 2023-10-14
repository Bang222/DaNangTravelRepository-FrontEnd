import {userDTO} from "@/types/userExperience";

interface CommentGetAllTour {
    id: string;
    experienceId: string;
    tourId: string;
    content: string;
    createdAt: Date;
    userId: string
    user: userDTO
}

export interface TourDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string[];
    lastRegisterDate: Date;
    address: string;
    startDate: Date;
    endDate: Date;
    endingAddress: string;
    startAddress: string;
    upVote: string[];
    createdAt: Date;
    status: string;
    comments: CommentGetAllTour[]
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
        imgUrl: string;
    }
}

export interface CommentTourDTO {
    id: string;
    experienceId?: string;
    tourId?: string;
    content: string;
    createdAt: Date;
    user: {
        lastName: string;
        firstName: string;
        profilePicture: string;
    }
}

export interface voteDTO {
    status: string[];
    total: number;
}

export interface CommentsDTO {
    content: string;
    tourId: string;
}

export interface TourDetailInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    baseQuantity: number;
    imageUrl: string[];
    lastRegisterDate: Date;
    address: string;
    startDate: Date;
    endDate: Date;
    endingAddress: string;
    startAddress: string;
    comments?: [
        {
            id: string;
            content: string;
            createdAt: Date;
        },
    ]
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
        imgUrl: string;
        paymentId:string;
    }
    upVote: string[];
    createdAt: Date;
    status: string;
    schedules: [
        {
            id: string;
            title: string;
            day: string;
            imgUrl: string;
            description: string;
        }

    ]
}

export interface BookingDTO {
    email: string;
    firstName: string;
    fullName: string;
    adultPassengers: number;
    childPassengers?: number;
    toddlerPassengers?: number;
    infantPassengers?: number;
    address: string;
    phone: string;
    passenger?: {
        name: string;
        type: string;
        sex: string;
        dayOfBirth?: number;
    }
}

export interface CartDTO {
    id: string
    isActive: boolean
    CreateAt: Date
    userId: string
    tourId: string
    tour: {
        id: string;
        name: string;
        description: string;
        price: number;
        quantity: number;
        imageUrl: string[];
        lastRegisterDate: Date;
        address: string;
        startDate: Date;
        endDate: Date;
        endingAddress: string;
        startAddress: string;
        upVote: string[];
        createdAt: Date;
        status: string;
    }
}
export interface SendBackEndDTO {
    accessToken: string;
    userId: string;
}

export interface TourDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    lastRegisterDate: Date;
    address: string;
    startDate: Date;
    endDate: Date;
    endingAddress: string;
    startAddress: string;
    comments?: [
    ]
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
    }
    upVote: string[];
    createdAt: Date;
    status: string;
}
export interface CommentTourDTO {
    id: string;
    experienceId?: string;
    tourId?: string;
    content: string;
    createdAt: Date;
    user: {
        lastName:string;
        firstName:string;
        profilePicture: string;
    }
}
export interface voteDTO {
    status: string[];
    total: number;
}
export interface CommentsDTO{
    content: string;
    tourId: string;
}

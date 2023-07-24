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
        {
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

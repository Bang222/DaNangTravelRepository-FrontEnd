export interface CreateStoreDTO {
    name: string
    slogan: string
}

export interface informationStoreDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    isActive: boolean
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
    }
}

export interface TourOfStore {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    baseQuantity:number;
    imageUrl: string[];
    lastRegisterDate: Date;
    address: string;
    startDate: Date;
    endDate: Date;
    endingAddress: string;
    startAddress: string;
    upVote: string[];
    createdAt: Date;
    comments: [
        {
            id: string;
            experienceId?: string;
            tourId?: string;
            content: string;
            createdAt: Date;
        }
    ];
    schedules: [
        {
            id: string;
            day: string;
            imgUrl: string;
            description: string;
        }

    ]
    status: string;
}
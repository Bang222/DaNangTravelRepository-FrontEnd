interface UserDTO {
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

export interface PassengerDTO {
    id: string
    type: string,
    name: string,
    sex: string,
    dayOfBirth: number
}

export interface CreateStoreDTO {
    name: string
    slogan: string
}
export interface OrderDTO {
    id:string,
    firstName:string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    createdAt: Date,
    participants: number,
    totalPrice: number,
    status: string,
    userId: string,
    orderDetailId:string,
}
export interface informationStoreDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    isActive: boolean
    user: UserDTO
}

export interface OrderDetailDTO {
    id: string,
    adultPassengers: number,
    childPassengers: number,
    toddlerPassengers: number,
    infantPassengers: number,
    orderId: string,
    tourId:string
    order: OrderDTO
    passengers: PassengerDTO[]
}
export interface ScheduleDTO  {
    id: string;
    day: string;
    imgUrl: string;
    description: string;
}
export interface CommentDTO {
    id: string;
    experienceId?: string;
    tourId?: string;
    content: string;
    createdAt: Date;
}

export interface TourOfStore {
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
    upVote: string[];
    createdAt: Date;
    comments: CommentDTO[];
    schedules: ScheduleDTO[]
    orderDetails: OrderDetailDTO[]
    status: string;
}
export interface CreateStoreDTO {
    name: string
    slogan: string
}
export interface informationStoreDTO {
    id:string
    name: string
    slogan: string
    imgUrl:string
    isActive:boolean
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
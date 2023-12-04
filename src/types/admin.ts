import {UserDTO} from "@/types/auth";


interface AdminAStoreDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    createdAt: Date
    paidMonth:string[]
    isActive: string
    userId: string
    user: {
        email: string
    }
    totalIncome:number
}

export interface dataAllStoreAdminDTO {
    data: AdminAStoreDTO[]
    totalStore?: number
    message?:string;
}

export interface getAllUserDTO {
    data: UserDTO[]
    message:string
    totalUser: number
}

interface orderTotalDTO {
    id: string
    totalPrice: number
}

export interface paymentConfirmDTO {
    id: string,
    isPaymentConfirmed: boolean,
    totalProfit: number,
    month: number,
    year: number,
    storeId: string
}

interface TotalDataAMonthDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    createdAt: Date
    isActive: string
    userId: string
    user: {
        email:string
    }
    paidMonth:string[]
    payments: paymentConfirmDTO[]
}
export interface getProfileAMonthDTO {
    data:TotalDataAMonthDTO[]
    totalData:number;
    message:string;
}
export interface getDataAMonthOfAdmin {
    storeCreate: number,
    totalProfitSum: number,
    userCreate: number
    message?:string,
}
export interface dataEachMonthOfAdmin {
    totalIncomeAMonthAdmin: number,
    month: number
}

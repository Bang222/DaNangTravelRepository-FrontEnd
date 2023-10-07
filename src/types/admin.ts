import {UserDTO} from "@/types/auth";


interface AdminAStoreDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    createdAt: Date
    isActive: string
    userId: string
}

export interface dataAllStoreAdminDTO {
    data: AdminAStoreDTO[]
    totalStore: number
}

export interface getAllUserDTO {
    data: UserDTO[]
    totalUser: number
}

interface orderTotalDTO {
    id: string
    totalPrice: number
}

interface paymentConfirmDTO {
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
    payments: paymentConfirmDTO[]
    orders: orderTotalDTO[]
    totalOrderPriceAMonth: number
}
export interface  getProfileAMonthDTO {
    data:TotalDataAMonthDTO[]
    totalData:number;
}

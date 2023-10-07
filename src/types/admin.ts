import {UserDTO} from "@/types/auth";

interface AdminAStoreDTO {
    id: string
    name: string
    slogan: string
    imgUrl: string
    createdAt: Date
    isActive: string
    userId:string
}
export interface dataAllStoreAdminDTO {
    data: AdminAStoreDTO[]
    totalStore:number
 }
 export interface getAllUserDTO {
    data : UserDTO[]
     totalUser:number
 }

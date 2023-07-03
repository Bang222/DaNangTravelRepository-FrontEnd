
import {LoginDTO, RegisterDTO} from "@/types";
import axios from "../axiosCustomize"

export const loginAPI = async (loginDTO:LoginDTO,router) => {
    const res = await axios.post('auth/login',loginDTO)
    if(res.data) {
        router.push('/', undefined, { shallow: true })
    }
    return res
}
export const RegisterApi = async (registerDTO:RegisterDTO,router) => {
    const res = await axios.post('auth/register',registerDTO)
    if(res.data) {
        router.push('/login', undefined, { shallow: true })
    }
    return res
}
import {LoginDTO, RegisterDTO, UserRequestDTO} from "@/types";
import axios from "axios";

export const loginAPI = async (loginDTO:LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/auth/login', loginDTO)
        if (!res.data) {
            throw new Error("Login failed");
        }
        return res.data
    } catch(err) {
        throw new Error('Login Failed');
    }
}
export const RegisterApi = async (registerDTO:RegisterDTO,router) => {
    const res = await axios.post('auth/register',registerDTO)
    if(res.data) {
        router.push('/', undefined, { shallow: true })
    }
    return res
}
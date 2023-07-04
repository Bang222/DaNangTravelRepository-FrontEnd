import {LoginDTO, RegisterDTO, UserDTO, UserRequestDTO} from "@/types";
import axios from "axios";
import {useQuery} from "react-query";

export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/auth/login', loginDTO)
        if (!res.data) {
            throw new Error("can not find user");
        }
        return res.data
    } catch (err) {
        throw new Error('Login Failed');
    }
}
const userDetailAPI = async (): Promise<UserDTO> => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/user-detail',
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        if (!res.data) {
            throw new Error("can not find user");
        }
        return res.data
    } catch (err) {
        throw new Error(err)
    }
}

export function useUserDetail() {
    return useQuery<UserDTO, Error>('user', userDetailAPI);
}

export const RegisterApi = async (registerDTO: RegisterDTO, router) => {
    const res = await axios.post('auth/register', registerDTO)
    if (res.data) {
        router.push('/', undefined, {shallow: true})
    }
    return res
}
import {LoginDTO, RegisterDTO, UserDTO, UserRequestDTO} from "@/types";
import axios from "axios";
import {useQuery} from "react-query";

export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', loginDTO)
        if (!res.data) {
            throw new Error("can not find user");
        }
        return res.data
    } catch (err) {
        throw new Error('Login Failed');
    }
}
export const useUserDetailAPI = () => {
    try {
        return useQuery({
            queryFn: async () => {
                const token = localStorage.getItem('token')
                const {data} = await axios.get('http://localhost:4000/api/user-detail',{
                    headers: {Authorization: `Bearer ${token}`}
                })
                return data as UserDTO
            }
        })
    } catch (err) {
        throw new Error(err)
    }
}
export const useUsersDetailAPI = () => {
    try {
       return useQuery({
           queryFn: async () => {
               const token = localStorage.getItem('token')
               const {data} = await axios.get('http://localhost:4000/api',{
                   headers: {Authorization: `Bearer ${token}`}
               })
               return data as UserDTO[]
           }
       })
    } catch (err) {
        throw new Error(err)
    }
}

export const RegisterApi = async (registerDTO: RegisterDTO, router) => {
    const res = await axios.post('auth/register', registerDTO)
    if (res.data) {
        router.push('/', undefined, {shallow: true})
    }
    return res
}
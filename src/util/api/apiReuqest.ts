import {LoginDTO, RegisterDTO, UserDTO, UserRequestDTO} from "@/types";
import axios from "axios";
import {endPointAPI} from "../../../constants";
import {TourDTO} from "@/types/tourDTO";
import {useQuery} from "@tanstack/react-query";
import {getCookie} from "@/util/api/cookies";

export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', loginDTO)
        console.log('haha',endPointAPI.login)
        if (!res.data) {
            throw new Error("can not find user");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Login Failed');
    }
}
export const RegisterApi = async (registerDTO: RegisterDTO) => {
    try {
        return await axios.post('http://localhost:4000/api/auth/register', registerDTO)
    } catch(e) {
        throw new Error('can not register')
    }
}
export const useGetAllTourApi = () => {
    try {
        return useQuery({
            queryKey:['All-Tour'],
            queryFn: async () => {
                const data = await axios.get('http://localhost:4000/api/tour/all')
                return data.data as TourDTO[]
            },
        })
    } catch(e) {
        throw new Error(e)
    }
}
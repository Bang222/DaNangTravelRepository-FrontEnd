import axios from 'axios';
import {LoginDTO} from "@/types";

export const loginAPI = async (loginDTO:LoginDTO,router) => {
    const res = await axios.post('http://localhost:4000/auth/login',loginDTO)
    if(res.data) {
        router.push('/register', undefined, { shallow: true })
    }
    return res
}
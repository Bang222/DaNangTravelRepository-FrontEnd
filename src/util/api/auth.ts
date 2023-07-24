import axios from "axios";
import {getCookie} from "@/util/api/cookies";
import {UserDTO} from "@/types";
import {useQuery} from "@tanstack/react-query";

export const useUserDetailAPI = () => {
    try {
        return useQuery({
            queryFn: async () => {
                const token = getCookie('token')
                const data = await axios.get('http://localhost:4000/api/user-detail',{
                    headers: {"Authorization": `Bearer ${token}`}
                })
                localStorage.setItem('userId',data.data.id)
                return data as UserDTO
            }
        })
    } catch (err) {
        throw new Error(err)
    }
}
// export const useUsersDetailAPI = () => {
//     try {
//        return useQuery({
//            queryFn: async () => {
//                const token = localStorage.getItem('token')
//                const {data} = await axios.get('http://localhost:4000/api',{
//                    headers: {Authorization: `Bearer ${token}`}
//                })
//                return data as UserDTO[]
//            }
//        })
//     } catch (err) {
//         throw new Error(err)
//     }
// }

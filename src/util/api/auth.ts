import axios from "axios";
import {getCookie} from "@/util/api/cookies";
import {UserDTO} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";

export const useUserDetailAPI = () => {
    try {
        const tokenRedux = useSelector((state)=> state.auth.value?.token)
        const tokenCookie = getCookie('token')
        let token = tokenCookie ? tokenCookie:tokenRedux
        return useQuery({
            queryFn: async () => {
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

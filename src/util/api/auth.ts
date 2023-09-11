import axios from "axios";
import {getCookie} from "@/util/api/cookies";
import {UserDTO} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "@/util/api/apiReuqest";

export const useUserDetailAPI = () => {
    try {
        const tokenRedux = useSelector((state) => state.auth.value?.token?.access)
        const dispatch = useDispatch()
        const dataRedux =useSelector((state) => state.auth?.value)
        let axiosJWT = createAxios(dataRedux,dispatch)
        const userId = useSelector((state) => state.auth.value?.user?.id)
        const tokenCookie = getCookie('token')
        let token = tokenCookie ? tokenCookie : tokenRedux
        return useQuery({
            queryFn: async () => {
                const data = await axiosJWT.get('http://localhost:4000/api/user-detail', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-client-id": userId
                    }
                })
                localStorage.setItem('userId', data.data.id)
                return data as UserDTO
            }
        })
    } catch (err) {
        throw new Error(err)
    }
}
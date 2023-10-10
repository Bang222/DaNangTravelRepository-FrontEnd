import React, {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {banStoreAdmin, banUserAdmin, unBanStoreAdmin, unBanUserAdmin} from "@/util/api/apiReuqestAdmin";
import {toast} from "react-toastify";
import {AppDispatch} from "@/redux/store";
import {AxiosInstance} from "axios";

interface TableUserProps {
    userId:string
    index: number
    email:string
    phone:string
    created:Date
    active:boolean
    emailValidated:boolean
    dispatch:AppDispatch
    dataRedux:any
    userBanId:string
    axiosJWT: AxiosInstance
    accessToken: string
}

//bang

const TableUser: FC<TableUserProps> = ({accessToken,index,email,phone,created,active,emailValidated,axiosJWT,dataRedux,dispatch,userBanId,userId}) => {
    const queryClient = useQueryClient()
    const {mutate: banUser, isLoading: banUserIsLoading, isError: banUserIsError, data: dataBanUser} = useMutation(
        async (userBanId: string) => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await banUserAdmin(accessToken, axiosJWT, userId,userBanId)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await banUserAdmin(accessToken, axiosJWT, userId,userBanId)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: (dataBanUser) => {
                if (dataBanUser.message) {
                    return toast.warn(dataBanUser.message)
                }
                queryClient.prefetchQuery(['getAllUserAdmin', userId]).then(r => console.log('user oke'))
                toast.success("Baned User:",dataBanUser.email )
            },
            onError: (error) => {
                return toast.warn(error)
            }
        }
    )
    const {
        mutate: unBanUser,
        isLoading: unBanUserIsLoading,
        isError: unBanUserIsError,
        data: dataUnBanUser
    } = useMutation(
        async (userBanId: string) => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await unBanUserAdmin(accessToken, axiosJWT, userId,userBanId)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await unBanUserAdmin(accessToken, axiosJWT, userId,userBanId)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: (dataUnBanUser) => {
                if (dataUnBanUser.message) {
                    return toast.warn(dataUnBanUser.message)
                }
                queryClient.prefetchQuery(['getAllUserAdmin', userId]).then(r => console.log('user oke'))
                toast.success("un Band Success:",dataUnBanUser.email)
            },
            onError: (error) => {
                return toast.warn(error)
            }
        }
    )


    const handleBan = (userId) => {
        banUser(userId)
    }
    const handleUnBan = (userId) => {
        unBanUser(userId)
    }
    return (
        <tr className={'text-[10px] lg:text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{email}</td>
            <td className={"p-2 border border-solid"}> {phone ? phone: 'null'}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={created}/></td>
            <td className={ active ? "p-2 border border-solid text-green-400" : "p-2 border border-solid text-red-400" }>{String(active)}</td>
            <td className={"p-2 border border-solid"}>{String(emailValidated)}</td>
            <td className={"p-2 border border-solid"}>{active ?
                <button className= "font-extrabold text-red-600"
                onClick={()=>handleBan(userBanId)}
                >
                    {banUserIsLoading ? "Loading..." : "Ban"}
                </button>
                :  <button className= "font-extrabold text-yellow-600 hover:text-green-400"
                           onClick={()=>handleUnBan(userBanId)}
                >
                    {unBanUserIsLoading ? "Loading..." : "UnBan"}
                </button>
            }
            </td>
        </tr>
    );
}

export default TableUser;

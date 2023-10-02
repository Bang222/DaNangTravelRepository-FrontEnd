'use client'
import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch} from "@/redux/store";
import {createAxios, DashboardDataManagerAMonth} from "@/util/api/apiReuqest";
import {DataDashBoardDTO} from "@/types/seller";
import HomeManager from "@/components/seller/dasboard/HomeManager";
import {CircularProgress} from "@mui/material";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const currenDay = new Date()
    const [month, setMonth] = React.useState<number>(currenDay.getMonth() + 1);
    const queryClient = useQueryClient()

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)

    const {
        data: dataManagerAMonth,
        isLoading: isLoadingManagerAMonth,
        isError: isErrorManagerAMonth
    }: DataDashBoardDTO = useQuery(['dataDashBoard', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await DashboardDataManagerAMonth(accessToken, userId, axiosJWT, month)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await DashboardDataManagerAMonth(accessToken, userId, axiosJWT, month)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    useEffect(() => {
        queryClient.fetchQuery(['dataDashBoard', userId])
    }, [month])
    return isLoadingManagerAMonth ? <div className={'flex justify-center'}>
        <CircularProgress color="secondary"/>
    </div> :(
        <HomeManager dataManagerAMonth={dataManagerAMonth} month={month} setMonth={setMonth}/>
    );
}

export default Page;

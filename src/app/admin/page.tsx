'use client'
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch, RootState} from "@/redux/store";
import {createAxios, DashboardDataManagerAMonth} from "@/util/api/apiReuqest";
import {CircularProgress} from "@mui/material";
import HomeManager from "@/components/seller/dasboard/HomeManager";
import HomeAdmin from "@/components/admin/HomeAdmin";
import {DataDashBoardDTO} from "@/types/seller";
import {getDataProfitAdminAMonth, getDataProfitAdminEachMonth} from "@/util/api/apiReuqestAdmin";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state:RootState) => state.auth.value?.token.access)
    const [loading,setLoading] = React.useState<boolean>(false);
    const userId = useSelector((state:RootState) => state.auth.value?.user?.id)
    const currenDay = new Date()
    const [month, setMonth] = React.useState<number>(currenDay.getMonth());
    const queryClient = useQueryClient()

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state:RootState) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)
    const {
        data: dataAdminAMonth,
        isLoading: isLoadingAdminAMonth,
        isError: isErrorManagerAMonth
    } = useQuery(['dataDashBoardAdmin', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await getDataProfitAdminAMonth(accessToken,axiosJWT,userId, month)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await getDataProfitAdminAMonth(accessToken,axiosJWT,userId, month)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e:any) {
                throw new e
            }
        }
    )
    const {
        data: dataAdminEachMonth,
        isLoading: isLoadingAdminEachMonth,
        isError: isErrorManagerEachMonth
    } = useQuery(['dataDashBoardEachMonthAdmin', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await getDataProfitAdminEachMonth(accessToken,axiosJWT,userId)
                if (res?.message) {
                    setTimeout(async () => {
                        const res = await getDataProfitAdminEachMonth(accessToken,axiosJWT,userId)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e:any) {
                throw new e
            }
        }
    )
    React.useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]);
    React.useEffect(() => {
        queryClient.prefetchQuery(['dataDashBoardAdmin', userId]).then((data) => {})
    }, [month]);
    useEffect(() => {
        document.title = `Admin`
    }, [])
    return isLoadingAdminAMonth || isLoadingAdminEachMonth ? <div className={'flex justify-center'}>
        <CircularProgress color="secondary"/>
    </div> :(
        <HomeAdmin dataAdminAMonth={dataAdminAMonth} month={month} setMonth={setMonth} loading={loading} setLoading={setLoading} dataAdminEachMonth={dataAdminEachMonth}/>
    );
}

export default Page;

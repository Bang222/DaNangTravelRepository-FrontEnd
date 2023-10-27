'use client'
import React, {FC, useEffect, useState} from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {BillTotalPagesDTO, TourOfStore} from "@/types/seller";
import ModalDetailOrder from "@/components/seller/modal/ModalDetailOrder";
import {createAxios, getBillOfStore} from "@/util/api/apiReuqest";
import {AppDispatch, RootState} from "@/redux/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface BillManagerProps {
}

//bang

const BillManager: FC<BillManagerProps> = ({}) => {
    const accessToken = useSelector((state:RootState) => state.auth.value?.token.access)
    const userId = useSelector((state:RootState) => state.auth.value?.user.id)
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [money, setMoney] = useState<number>()
    const queryClient = useQueryClient()


    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state:RootState) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)


    const optionVND = {style: 'currency', currency: 'VND'}
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }


    const {data, isLoading, isError} = useQuery(['billStore', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await getBillOfStore(axiosJWT, accessToken, userId, page)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await getBillOfStore(axiosJWT, accessToken, userId, page)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e:any) {
                throw new e
            }
        }
    )
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    React.useEffect(() => {
        if (data?.orders) {
            const totalIncome = data?.orders?.reduce((total, item) => {
                const money = item.totalPrice
                return total + money;
            }, 0);
            setMoney(totalIncome);
            setTotalPages(data.totalPages)
            // const totalParticular
            // query.invalidateQueries(['TourOfStore', userId])
        }
    }, [data, userId])
    React.useEffect(() => {
        queryClient.prefetchQuery(['billStore', userId])
    }, [page])
    useEffect(() => {
        document.title = `Bill`
    }, [])
    return isLoading ? <div> Loading...</div> : <> {data?.orders ? <section className={'w-full p-3 bg-white'}>
        <div className="overflow-x-scroll md:overflow-x-auto">
            <div className=" w-[79vw] h-[73vh] md:w-full">
            <table className="table-auto w-full border border-solid">
                <thead>
                <tr className={'text-left border border-solid bg-black text-white text-[12px] md:text-[15px]'}>
                    <th className={'border border-solid p-2'}>Code Tour</th>
                    <th className={'border border-solid p-2'}>Tour Name</th>
                    <th className={'border border-solid p-2'}>Created</th>
                    <th className={'border border-solid p-2'}>Total Participants</th>
                    <th className={'border border-solid p-2'}>Total Price</th>
                    <th className={'border border-solid p-2'}>Detail</th>
                </tr>
                </thead>
                {data?.orders.map((order) => {
                    // let Money = item.orderDetails.reduce((a, cur) => {
                    //     return a + cur.order.totalPrice
                    // }, 0)
                    let orderDetail = order.orderDetail
                    const totalParticular = orderDetail.toddlerPassengers + orderDetail.infantPassengers + orderDetail.adultPassengers + orderDetail.childPassengers
                    const createAt = new Date(order.createdAt)
                    const formatCreateAt = createAt.toLocaleDateString('es-us', options)
                    const formatPrice = order.totalPrice.toLocaleString('vi-VN', optionVND)
                    return (
                        <tbody key={order.id}>
                        <tr className={'text-left border border-solid text-[10px] md:text-[13px]'}>
                            <td className={'border border-solid px-2 py-3'}>{order.id}</td>
                            <td className={'border border-solid px-2 py-3'}>{order.orderDetail.tour.name} </td>
                            <td className={'border border-solid px-2 py-3'}>{formatCreateAt} </td>
                            <td className={'border border-solid px-2 py-3'}>{totalParticular}</td>
                            <td className={'border border-solid px-2 py-3'}>{formatPrice}</td>
                            <td className={'border border-solid px-2 py-3'}><ModalDetailOrder
                                order={order}/></td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
        </div>
        <Stack sx={{paddingTop: '12px'}} spacing={2}>
            <Pagination sx={{display: 'flex', justifyContent: 'center'}} count={Math.ceil(totalPages / 10)} page={page}
                        onChange={handleChange}/>
        </Stack>
        <div className={'text-right pr-4 pt-4'}>
            <b>Total Income:</b> {money?.toLocaleString('vi-VN', optionVND)}
        </div>
    </section> : <div> Data Null </div>} </>
}

export default BillManager;

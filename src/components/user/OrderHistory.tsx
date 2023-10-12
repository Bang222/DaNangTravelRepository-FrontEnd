'use client'
import React, {FC} from 'react';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {createAxios, userOrderHistory} from "@/util/api/apiReuqest";
import {useQuery} from "@tanstack/react-query";
import {getDataProfitAdminAMonth} from "@/util/api/apiReuqestAdmin";
import {UserDTO} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import LoadingComponent from "@/components/LoadingComponent";
import OrderHistoryTable from "@/components/user/table/OrderHistoryTable";

interface OrderHistoryProps {
    user: UserDTO
}

//bang

const OrderHistory: FC<OrderHistoryProps> = ({user}) => {

    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)
    const {
        data: dataOrder,
        isLoading: isLoadingDataOrder,
        isError: isErrorDataOrder
    } = useQuery(['dataOrderUser', user.id],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await userOrderHistory(accessToken, axiosJWT, user.id)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await userOrderHistory(accessToken, axiosJWT, user.id)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingY: "24px",
                backgroundColor: "#A9A9A9",
                boxShadow: '0 2px 4px 0 black'
            }}>
            <Box sx={{width: "98%"}}>
                <div className={'h-[60vh] w-full  overflow-auto  md:w-full'}>
                    <table className="table-auto border border-solid w-full text-left">
                        <thead className={'border text-white border-solid'}>
                        <tr>
                            <th className={'p-2'}>Tour Name</th>
                            <th className={'p-2'}>Created</th>
                            <th className={'p-2'}>Status</th>
                            <th className={'p-2'}>Parti</th>
                            <th className={'p-2'}>store</th>
                            <th className={'p-2'}>Price</th>
                        </tr>
                        </thead>
                        {isLoadingDataOrder ? <LoadingComponent/> : <>
                            {dataOrder?.map((order) => {
                                return (
                                    <tbody key={order.id}>
                                            <OrderHistoryTable order={order}/>
                                    </tbody>
                                )
                            })
                            }
                        </>
                        }
                    </table>
                </div>
            </Box>
        </Card>
    );
}

export default OrderHistory;

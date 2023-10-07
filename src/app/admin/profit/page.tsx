'use client'
import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch} from "@/redux/store";
import {createAxios} from "@/util/api/apiReuqest";
import {adminGetAllStore, adminGetProfit, adminUpdateProfit} from "@/util/api/apiReuqestAdmin";
import {CircularProgress, Pagination, Stack} from "@mui/material";
import TableStore from "@/components/admin/table/tableStore";
import TableProfit from "@/components/admin/table/tableProfit";
import {useMutation} from "@tanstack/react-query";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [page, setPage] = React.useState(1);
    const [profit, setProfit] = React.useState(undefined);
    const [storeId, setStoreId] = React.useState(undefined);
    const currenDay = new Date()
    const [month, setMonth] = React.useState<number>(currenDay.getMonth() + 1);
    const queryClient = useQueryClient()


    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)
    const {data, isLoading, isError} = useQuery(['getProfitOfStoreAdmin', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await adminGetProfit(accessToken, axiosJWT, userId, page, month)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await adminGetAllStore(accessToken, axiosJWT, userId, page)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    const {mutate, isLoading: updatePaidIsLoading, isError: updatePaidIsError} = useMutation(
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await adminUpdateProfit(accessToken, axiosJWT, userId, storeId, profit)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await adminUpdateProfit(accessToken, axiosJWT, userId, storeId, profit)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['getProfitOfStoreAdmin', userId]).then(r => console.log("oke"))
            }
        }
    )
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    React.useEffect(() => {
        queryClient.fetchQuery(['getAllStoreAdmin', userId])
    }, [page])
    return isLoading || isError ? (
        <div className={'flex justify-center w-screen items-center absolute z-100 h-screen bg-light'}>
            <CircularProgress color="secondary"/>
        </div>
    ) : (
        <>
            <div className={'overflow-x-auto'}>
                <div className={'h-[60vh] w-[50vw]  md:w-full'}>
                    <table className="table-auto border border-solid w-full text-left">
                        <thead className={'border bg-black text-white border-solid'}>
                        <tr>
                            <th className={'p-2'}>#</th>
                            <th className={'p-2'}>id</th>
                            <th className={'p-2'}>Name</th>
                            <th className={'p-2'}>Total Income</th>
                            <th className={'p-2'}>Total Profit</th>
                            <th className={'p-2'}>Status</th>
                        </tr>
                        </thead>
                        {data?.data?.length < 1 ? <tbody>
                        <td colSpan={5} className={'font-bold text-center'}>There is no entry yet</td>
                        </tbody> : <>
                            {data?.data?.map((item, index) => (
                                <tbody key={item}>
                                <TableProfit index={index} id={item.id} name={item.name}
                                             status={item.payments.length > 0} totalPrice={item.totalOrderPriceAMonth}
                                             setStoreId={setStoreId} setProfit={setProfit} mutate={mutate} updatePaidIsLoading={updatePaidIsLoading}
                                />
                                </tbody>
                            ))}
                        </>
                        }
                    </table>
                </div>
            </div>
            <Stack sx={{paddingTop: '12px'}} spacing={2}>
                <Pagination sx={{display: 'flex', justifyContent: 'center'}} color="secondary"
                            count={Math.ceil(data?.totalData / 10)} page={page}
                            onChange={handleChange}/>
            </Stack>
        </>
    )

}

export default Page;

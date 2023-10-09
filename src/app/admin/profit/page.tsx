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
import {toast} from "react-toastify";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [page, setPage] = React.useState(1);
    const [loadingMonth, setLoadingMonth] = React.useState<boolean>(false);
    const [profit, setProfit] = React.useState<number>(0);
    const [storeId, setStoreId] = React.useState<string>("");

    const currentDay = new Date()
    const [month, setMonth] = React.useState<number>(currentDay.getMonth() + 1);
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
    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoadingMonth(true)
        const selectedMonth = parseInt(event.target.value, 10);
        if (selectedMonth <= currentDay.getMonth() + 2) {
            setMonth(selectedMonth);
        } else {
            toast.warn('can not choose ')
        }
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    React.useEffect(() => {
        if (loadingMonth) {
            setTimeout(() => {
                setLoadingMonth(false);
            }, 1000);
        }
    }, [loadingMonth]);
    React.useEffect(() => {
        queryClient.fetchQuery(['getProfitOfStoreAdmin', userId])
    }, [page, month, queryClient, userId])
    return isLoading || isError ? (
        <div className={'flex justify-center items-center absolute z-100 h-screen bg-light'}>
            <CircularProgress color="secondary"/>
        </div>
    ) : (
        <>
            <section className={'mb-3 p-2'}>
                <label htmlFor="months">Select a month: </label>
                <select name="months" id="months" onChange={handleChangeMonth} disabled={loadingMonth} defaultValue={month}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </section>
            <div className={'overflow-x-auto'}>
                <div className={'h-[60vh] w-[50vw]  md:w-full'}>
                    <table className="table-auto border border-solid w-full text-left">
                        <thead className={'border bg-black text-white border-solid'}>
                        <tr>
                            <th className={'p-2'}>#</th>
                            <th className={'p-2'}>id</th>
                            <th className={'p-2'}>Name</th>
                            <th className={'p-2'}>Day Paid</th>
                            <th className={'p-2'}>Total Profit</th>
                        </tr>
                        </thead>
                        {data?.data?.length < 1 ? <tbody>
                        <td colSpan={5} className={'font-bold text-center'}>There is no entry yet</td>
                        </tbody> : <>
                            {data?.data?.map((item, index) => (
                                <tbody key={item}>
                                <TableProfit index={index} id={item.id} name={item.name}
                                              payments={item.payments}
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

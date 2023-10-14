'use client'
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch} from "@/redux/store";
import {createAxios, getBillOfStore} from "@/util/api/apiReuqest";
import {BillTotalPagesDTO} from "@/types/seller";
import {adminGetAllStore, adminUpdateProfit, banStoreAdmin, unBanStoreAdmin} from "@/util/api/apiReuqestAdmin";
import {CircularProgress, Pagination, Stack} from "@mui/material";
import TableStore from "@/components/admin/table/tableStore";
import {toast} from "react-toastify";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const currentDay = new Date()
    const [page, setPage] = React.useState(1);
    const queryClient = useQueryClient()
    const [month, setMonth] = React.useState<number>(currentDay.getMonth());

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)

    const {data, isLoading, isError} = useQuery(['getAllStoreAdmin', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await adminGetAllStore(accessToken, axiosJWT, userId, page, month)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await adminGetAllStore(accessToken, axiosJWT, userId, page, month)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    const {mutate, isLoading: updatePaidIsLoading, isError: updatePaidIsError, data: dataConfirm} = useMutation(
        async ({storeId, month}) => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await adminUpdateProfit(accessToken, axiosJWT, userId, storeId, month)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await adminUpdateProfit(accessToken, axiosJWT, userId, storeId, month)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: (dataConfirm) => {
                if (dataConfirm.message) {
                    return toast.warn(dataConfirm.message)
                }
                queryClient.fetchQuery(['getAllStoreAdmin', userId]).then(r => console.log('oke f'))
                toast.success("Confirmed")
            },
            onError: (error) => {
                return toast.warn(error)
            }
        }
    )
    const {mutate: banStore, isLoading: banStoreIsLoading, isError: banStoreIsError, data: dataBanStore} = useMutation(
        async (storeId: string) => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await banStoreAdmin(accessToken, axiosJWT, userId, storeId)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await banStoreAdmin(accessToken, axiosJWT, userId, storeId)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: (dataBanStore) => {
                if (dataBanStore.message) {
                    return toast.warn(dataBanStore.message)
                }
                queryClient.prefetchQuery(['getAllStoreAdmin', userId]).then(r => console.log('oke f'))
                toast.success("Baned")
            },
            onError: (error) => {
                return toast.warn(error)
            }
        }
    )
    const {
        mutate: unBanStore,
        isLoading: unBanStoreIsLoading,
        isError: unBanStoreIsError,
        data: dataUnBanStore
    } = useMutation(
        async (storeId: string) => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await unBanStoreAdmin(accessToken, axiosJWT, userId, storeId)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await unBanStoreAdmin(accessToken, axiosJWT, userId, storeId)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }, {
            onSuccess: (dataUnBanStore) => {
                if (dataUnBanStore.message) {
                    return toast.warn(dataUnBanStore.message)
                }
                queryClient.prefetchQuery(['getAllStoreAdmin', userId]).then(r => console.log('oke f'))
                toast.success("un Band Success")
            },
            onError: (error) => {
                return toast.warn(error)
            }
        }
    )
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(event.target.value, 10);
        if (selectedMonth <= currentDay.getMonth()) {
            setMonth(selectedMonth);
        } else {
            toast.warn('can not choose ')
        }
    };
    React.useEffect(() => {
        queryClient.fetchQuery(['getAllStoreAdmin', userId]).then(r => console.log('oke f'))
    }, [page, queryClient, userId, data, month])
    useEffect(() => {
        document.title = `Manager Store`
    }, [])
    return isLoading ? (
        <div className={'flex justify-center items-center absolute  h-screen '}>
            <CircularProgress color="secondary"/>
        </div>
    ) : (
        <>
            <div className={'overflow-x-auto'}>
                <div className={'p-4'}>
                    <select name="months" id="months" value={month} onChange={handleChangeMonth} defaultValue={month}>
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
                </div>
                <div className={'h-[60vh] w-[50vw]  md:w-full'}>
                    <table className="table-auto border border-solid w-full text-left">
                        <thead className={'border bg-black text-white border-solid'}>
                        <tr>
                            <th className={'p-2'}>#</th>
                            <th className={'p-2'}>Name</th>
                            <th className={'p-2'}>Email</th>
                            <th className={'p-2'}>Created</th>
                            <th className={'p-2'}>Active</th>
                            <th className={'p-2'}>Paid</th>
                            <th className={'p-2'}>Income</th>
                            <th className={'p-2'}>Profit</th>
                            <th className={'p-2'}>Action</th>
                        </tr>
                        </thead>
                        {data?.data.map((item, index) => (
                            <tbody key={item.id}>
                            <TableStore createdAt={item.createdAt} id={item.id} index={index} isActive={item.isActive}
                                        name={item.name} email={item.user.email} mutate={mutate}
                                        updatePaidIsLoading={updatePaidIsLoading}
                                        paidMonth={item.paidMonth} userId={userId} banStore={banStore}
                                        unBanStore={unBanStore} month={month} setMonth={setMonth}
                                        totalIncome={item.totalIncome}
                                        currentDay={currentDay}/>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <Stack sx={{paddingTop: '12px'}} spacing={2}>
                <Pagination sx={{display: 'flex', justifyContent: 'center'}} color="secondary"
                            count={Math.ceil(data?.totalStore / 10)} page={page}
                            onChange={handleChange}/>
            </Stack>
        </>
    )

}

export default Page;

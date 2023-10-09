'use client'
import React, {FC, useEffect} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";

interface TableStoreProps {
    index: number
    id: string
    name: string
    slogan: string
    createdAt: Date
    isActive: string
    updatePaidIsLoading:boolean
    paidMonth: string[]
    mutate: (p: { month: number; storeId: string }) => void
    userId:string
    banStore: (storeId: string) => void
    unBanStore: (storeId: string) => void
}

//bang

const TableStore: FC<TableStoreProps> = ({  unBanStore,
                                             banStore,
                                             userId,
                                             id,
                                             name,
                                             slogan,
                                             createdAt,
                                             isActive,
                                             index,
                                             updatePaidIsLoading,
                                             mutate,
                                             paidMonth
                                         }) => {
    const currentDay = new Date()
    const queryClient = useQueryClient()
    const [month, setMonth] = React.useState<number>(currentDay.getMonth());
    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(event.target.value, 10);
        if (selectedMonth <= currentDay.getMonth()) {
            setMonth(selectedMonth);
        } else {
            setMonth(currentDay.getMonth());
            toast.warn('can not choose ')
        }
    };
    const handleConfirm = (storeId) => {
        const data = {
            month:month,
            storeId:storeId,
        }
        mutate(data)
    }
    const handleBanStore = (storeId) => {
        banStore(storeId)
    }
    const handleUnBanStore = (storeId) => {
        unBanStore(storeId)
    }
    useEffect(()=>{
        queryClient.fetchQuery(['getAllStoreAdmin', userId]).then(r => console.log('oke f'))
    },[month])
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}>{slogan}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={createdAt}/></td>
            <td className={isActive === "active" ? "p-2 border border-solid text-green-400" : "p-2 border border-solid text-red-400"}>{String(isActive)}</td>
            <td className={'p-2 border border-solid'}>
                <select name="months" id="months" onChange={handleChangeMonth} defaultValue={month}>
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

            </td>
            <td className={"p-2 border border-solid"}>
                {
                    updatePaidIsLoading ? <span>Loading...</span> :
                        <> {paidMonth?.includes(`${month}`) ? <span className={'text-green-400'} >PAID</span> : <button className={'hover:text-blue-400'} onClick={()=>handleConfirm(id)}>
                            CONFIRM
                        </button>}</>

                }
            </td>
            <td className={"p-2 border border-solid"}>


            </td>
            <td className={"p-2 border border-solid"}>{isActive === 'active' ? <button className={'font-extrabold text-red-300 hover:text-red-700 cursor-pointer'} onClick={()=>handleBanStore(id)}>Ban</button> :
                <button className={'font-extrabold text-yellow-300 hover:text-yellow-700 cursor-pointer'} onClick={()=>handleUnBanStore(id)}>UnBan</button>
            }</td>
        </tr>
    );
}

export default TableStore;

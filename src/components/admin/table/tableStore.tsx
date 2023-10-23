'use client'
import React, {FC, useEffect} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import FormatPriceToVnd from "@/components/ui/FormatPriceToVND";

interface TableStoreProps {
    index: number
    id: string
    name: string
    email: string
    createdAt: Date
    isActive: string
    updatePaidIsLoading: boolean
    paidMonth: string[]
    mutate: (p: { month: number; storeId: string }) => void
    userId: string
    banStore: (storeId: string) => void
    unBanStore: (storeId: string) => void
    month: number
    storeId:string
    setMonth: React.Dispatch<React.SetStateAction<number>>
    currentDay: Date
    totalIncome: number
}

//bang

const TableStore: FC<TableStoreProps> = ({
    storeId,
                                             unBanStore,
                                             banStore,
                                             userId,
                                             id,
                                             name,
                                             email,
                                             createdAt,
                                             isActive,
                                             index,
                                             updatePaidIsLoading,
                                             mutate,
                                             paidMonth,
                                             month, setMonth, currentDay, totalIncome
                                         }) => {
    const handleConfirm = (storeId:string) => {
        const data = {
            month: month,
            storeId: storeId,
        }
        mutate(data)
    }
    const handleBanStore = (storeId:string) => {
        banStore(storeId)
    }
    const handleUnBanStore = (storeId:string) => {
        unBanStore(storeId)
    }
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}>{email}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={createdAt}/></td>
            <td className={isActive === "active" ? "p-2 border border-solid text-green-400" : "p-2 border border-solid text-red-400"}>{String(isActive)}</td>
            <td className={"p-2 border border-solid"}>
                {
                    updatePaidIsLoading ? <span>Loading...</span> :
                        <>{totalIncome === 0 ? <span className={'cursor-default'}>not yet</span> : <> {paidMonth?.includes(`${month}`) ?
                            <span className={'text-green-400'}>PAID</span> :
                            <button className={'hover:text-blue-400'} onClick={() => handleConfirm(id)}>
                                CONFIRM
                            </button>}</>} </>
                }
            </td>
            <td className={"p-2 border border-solid"}>
                <FormatPriceToVnd price={totalIncome}/>
            </td>
            <td className={"p-2 border border-solid"}>
                <FormatPriceToVnd price={Number((totalIncome * 0.17).toFixed(2))}/>
            </td>
            <td className={"p-2 border border-solid"}>{isActive === 'active' ?
                <button className={'font-extrabold text-red-300 hover:text-red-700 cursor-pointer'}
                        onClick={() => handleBanStore(id)}>Ban</button> :
                <button className={'font-extrabold text-yellow-300 hover:text-yellow-700 cursor-pointer'}
                        onClick={() => handleUnBanStore(id)}>UnBan</button>
            }</td>
        </tr>
    );
}

export default TableStore;

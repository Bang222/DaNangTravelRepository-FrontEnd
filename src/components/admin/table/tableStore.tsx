'use client'
import React, {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import {toast} from "react-toastify";

interface TableStoreProps {
    index: number
    id: string
    name: string
    slogan: string
    createdAt: Date
    isActive: string
    updatePaidIsLoading:boolean
    mutate: (data: { month: number; storeId: string }) => void
}

//bang

const TableStore: FC<TableStoreProps> = ({
                                             id,
                                             name,
                                             slogan,
                                             createdAt,
                                             isActive,
                                             index,
                                             updatePaidIsLoading,
                                             mutate
                                         }) => {
    const currentDay = new Date()
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
    const handleConfirm = () => {
        const data = {
            month:month,
            storeId:id,
        }
        mutate(data)
    }
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
                        <button className={'hover:text-green-400'} onClick={handleConfirm}>
                            Confirm
                        </button>
                }
            </td>
            <td className={"p-2 border border-solid"}>Ban</td>
        </tr>
    );
}

export default TableStore;

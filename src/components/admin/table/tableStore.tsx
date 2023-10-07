'use client'
import {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";

interface TableStoreProps {
    index: number
    id: string
    name: string
    slogan: string
    createdAt: Date
    isActive: string
}

//bang

const TableStore: FC<TableStoreProps> = ({id, name, slogan, createdAt, isActive, index}) => {
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}>{slogan}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={createdAt}/></td>
            <td className={"p-2 border border-solid"}>{String(isActive)}</td>
            <td className={"p-2 border border-solid"}>Ban</td>
        </tr>
    );
}

export default TableStore;

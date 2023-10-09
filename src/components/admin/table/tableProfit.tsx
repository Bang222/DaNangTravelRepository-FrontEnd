import React, {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import FormatPriceToVnd from "@/components/ui/FormatPriceToVND";

interface TableProfitProps {
    index: number
    name: string
    totalPrice: number
    status: boolean
    id: string
    setStoreId: React.Dispatch<React.SetStateAction<string>>
    setProfit: React.Dispatch<React.SetStateAction<number>>
}

//bang

const TableProfit: FC<TableProfitProps> = ({index, name, totalPrice, status, id, setStoreId, setProfit}) => {
    const currentDay = new Date()
    const data = totalPrice * 0.17;
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{id}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}><FormatPriceToVnd price={totalPrice}/></td>
            <td className={"p-2 border border-solid"}><FormatPriceToVnd price={data}/></td>
        </tr>
    );
}

export default TableProfit;

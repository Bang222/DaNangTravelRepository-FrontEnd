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
    updatePaidIsLoading
    mutate: () => void
}

//bang

const TableProfit: FC<TableProfitProps> = ({index, name, totalPrice, status, id, setStoreId, setProfit, mutate, updatePaidIsLoading}) => {
    const currentDay = new Date()
    const data = totalPrice * 0.17;
    const handleOnClick = (e) => {
        setStoreId(id)
        setProfit(totalPrice)
        mutate()
    }
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{id}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}><FormatPriceToVnd price={totalPrice}/></td>
            <td className={"p-2 border border-solid"}><FormatPriceToVnd price={data}/></td>
            <td className={"p-2 border border-solid"}>{updatePaidIsLoading ? <span>Loading...</span> : <> { status ?
                <span className={'text-green-400'}>Paid </span> : <button className={'text-red-400'}
                                                                          onClick={(e) => handleOnClick(e)}
                >Pay not yet</button>}</>} </td>
        </tr>
    );
}

export default TableProfit;

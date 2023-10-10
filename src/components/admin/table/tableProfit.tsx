import React, {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";
import FormatPriceToVnd from "@/components/ui/FormatPriceToVND";
import {paymentConfirmDTO} from "@/types/admin";

interface TableProfitProps {
    index: number
    name: string
    payments: paymentConfirmDTO[]
    email:string
}

//bang

const TableProfit: FC<TableProfitProps> = ({index, name, totalPrice, payments, email}) => {
    // const data = payments[totalPrice][0] * 0.17;
    return (
        <tr className={'text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{email}</td>
            <td className={"p-2 border border-solid"}>{name}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={payments[0]["createdAt"]}/></td>
            <td className={"p-2 border border-solid"}><FormatPriceToVnd price={payments[0]["totalProfit"]}/></td>
        </tr>
    );
}

export default TableProfit;

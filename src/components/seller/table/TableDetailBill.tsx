import {FC} from 'react';
import * as React from "react";

interface TableDetailBillProps {
}

//bang

const TableDetailBill: FC<TableDetailBillProps> = ({orderDetail}) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }   
    let order = orderDetail.order
    const createAt = new Date(order?.createdAt)
    const formattedOrderDay = createAt.toLocaleDateString('es-uk',options)
    const totalPrice = order.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    return (
        <tr>
            <td className={'p-2 border border-solid text-[10px]'}>{order.firstName}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{order.fullName}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{order.email}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{formattedOrderDay}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{totalPrice}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.adultPassengers} </td>
            <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.childPassengers} </td>
            <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.toddlerPassengers} </td>
            <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.infantPassengers}</td>
            <td className={'p-2 border border-solid text-[10px]'}>{order.participants}Passengers</td>
            <td className={'p-2 border border-solid text-[10px]'}>{order.status}</td>
        </tr>
    );
}

export default TableDetailBill;
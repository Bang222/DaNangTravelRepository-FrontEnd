import {FC} from 'react';
import * as React from "react";
import {BillDTO} from "@/types/seller";

interface TableDetailBillProps {
    order: BillDTO
}

//bang

const TableDetailBill: FC<TableDetailBillProps> = ({order}) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    let orderDetail = order.orderDetail
    const createAt = new Date(order.createdAt)
    const formattedOrderDay = createAt.toLocaleDateString('es-uk', options)
    const totalPrice = order.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    return (
        <table className="table-auto border border-solid w-full">
            <thead className={'border bg-black text-white border-solid'}>
            <tr className={'text-[12px]'}>
                <th className={'p-1'}>First Name</th>
                <th className={'p-1'}>Full Name</th>
                <th className={'p-1'}>Email</th>
                <th className={'p-1'}>Phone</th>
                <th className={'p-1'}>Order Day</th>
                <th className={'p-1'}>Price</th>
                <th className={'p-1'}>Adult</th>
                <th className={'p-1'}>Children</th>
                <th className={'p-1'}>Toddler</th>
                <th className={'p-1'}>Infant</th>
                <th className={'p-1'}>Status</th>
            </tr>
            </thead>
            <tr>
                <td className={'p-2 border border-solid text-[10px]'}>{order.firstName}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{order.fullName}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{order.email}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{order.phone}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{formattedOrderDay}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{totalPrice}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.adultPassengers} </td>
                <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.childPassengers} </td>
                <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.toddlerPassengers} </td>
                <td className={'p-2 border border-solid text-[10px]'}>{orderDetail.infantPassengers}</td>
                <td className={'p-2 border border-solid text-[10px]'}>{order.status}</td>
            </tr>
        </table>
    );
}

export default TableDetailBill;

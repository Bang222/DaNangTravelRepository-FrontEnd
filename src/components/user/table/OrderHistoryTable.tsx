import React, {FC} from 'react';
import {orderHistoryUser} from "@/types/seller";
import FormatDate from "@/components/ui/FormatDate";
import FormatPriceToVnd from "@/components/ui/FormatPriceToVND";

interface OrderHistoryTableProps {
    order : orderHistoryUser
}

//bang

const OrderHistoryTable: FC<OrderHistoryTableProps> = ({order}) => {
    return (
        <tr>
            <td className={'p-2 text-[12px] lg:[text-14px]'}>{order.orderDetail.tour.name}</td>
            <td className={'p-2 text-[12px] lg:[text-14px]'}><FormatDate date={order.createdAt}/></td>
            <td className={'p-2 text-[12px] lg:[text-14px]'}>{order.status}</td>
            <td className={'p-2 text-[12px] lg:[text-14px]'}>{order.participants}</td>
            <td className={'p-2 text-[12px] lg:[text-14px]'}>{order.store.name}</td>
            <td className={'p-2 text-[12px] lg:[text-14px]'}><FormatPriceToVnd price={order.totalPrice}/></td>
        </tr>

    );
}

export default OrderHistoryTable;

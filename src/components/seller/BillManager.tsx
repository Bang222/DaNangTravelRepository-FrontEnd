import React, {FC, useState} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {TourOfStore} from "@/types/seller";
import ModalDetailOrder from "@/components/modal/seller/ModalDetailOrder";

interface BillManagerProps {
}

//bang

const BillManager: FC<BillManagerProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const query = useQueryClient()
    const [data, setData] = useState<TourOfStore[] | undefined>(query.getQueryData(['TourOfStore', userId]))
    const [money, setMoney] = useState<number>()
    const optionVND = {style: 'currency', currency: 'VND'}
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    React.useEffect(() => {
        if (data) {
            const totalIncome = data.reduce((total, item) => {
                const money = item.orderDetails.reduce((a, cur) => {
                    return a + cur.order.totalPrice;
                }, 0);
                return total + money;
            }, 0);
            setMoney(totalIncome);
            query.invalidateQueries(['TourOfStore', userId])
        }
    }, [data, query, userId])

    return (
        <section className={'w-full p-3 bg-white'}>
            <div className="overflow-auto max-h-[70vh]">
                <table className="table-auto w-full border border-solid">
                    <thead>
                    <tr className={'text-left border border-solid bg-black text-white text-[12px]'}>
                        <th className={'border border-solid p-1'}>TourId</th>
                        <th className={'border border-solid p-1'}>Tour Name</th>
                        <th className={'border border-solid p-1'}>Created</th>
                        <th className={'border border-solid p-1'}>Total Participants</th>
                        <th className={'border border-solid p-1'}>Total Price</th>
                        <th className={'border border-solid p-1'}>Detail</th>
                    </tr>
                    </thead>
                    {data?.map((item) => {
                        let totalParticular = item.orderDetails.reduce((a, cur) => {
                            return a + cur.order.participants
                        }, 0)
                        let Money = item.orderDetails.reduce((a, cur) => {
                            return a + cur.order.totalPrice
                        }, 0)
                        const createAt = new Date(item.createdAt)
                        const formatCreateAt = createAt.toLocaleDateString('es-us', options)
                        const formatPrice = Money.toLocaleString('vi-VN', optionVND)
                        return (
                            <tbody key={item.id}>
                            <tr className={'text-left border border-solid text-[10px]'}>
                                <td className={'border border-solid p-1'}>{item.id}</td>
                                <td className={'border border-solid p-1'}>{item.name} </td>
                                <td className={'border border-solid p-1'}>{formatCreateAt} </td>
                                <td className={'border border-solid p-1'}>{totalParticular}</td>
                                <td className={'border border-solid p-1'}>{formatPrice}</td>
                                {item.orderDetails.length > 0 ?
                                    <td className={'border border-solid p-1'}><ModalDetailOrder
                                        orderDetails={item.orderDetails}/></td>
                                    : <td className={'border border-solid p-1 cursor-default'}>
                                        null
                                    </td>
                                }

                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            <div className={'text-right pr-4 pt-4'}>
                <b>Total Income:</b> {money?.toLocaleString('vi-VN', optionVND)}
            </div>
        </section>
    );
}

export default BillManager;
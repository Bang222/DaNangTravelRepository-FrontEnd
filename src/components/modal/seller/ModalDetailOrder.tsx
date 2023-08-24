import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import {OrderDetailDTO} from "@/types/seller";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalDetailOrderProps {
    orderDetails: OrderDetailDTO[]
}

const ModalDetailOrder: FC<ModalDetailOrderProps> = ({orderDetails}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    return (
        <div>
            <button onClick={handleOpen} className={'text-black hover:text-blue-400'}>Detail</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: '80vw', height: '80vh'}}>
                    <div className={'text-right cursor-pointer'} onClick={handleClose}>
                        close
                    </div>
                    <div className="overflow-auto max-h-[60vh]">
                        <table className="table-auto border border-solid">
                            <thead className={'border bg-black text-white border-solid'}>
                            <tr>
                                <th>FirstName</th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Order Day</th>
                                <th>Price</th>
                                <th>Adult Passengers</th>
                                <th>Children Passengers</th>
                                <th>Toddler Passengers</th>
                                <th>Infant Passengers</th>
                                <th>Participants</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            {orderDetails?.map((orderDetail) => {
                                let order = orderDetail.order
                                const createAt = new Date(order.createdAt)
                                const formattedOrderDay = createAt.toLocaleDateString('es-uk',options)
                                const totalPrice = order.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
                                return (
                                <tbody key={orderDetail.id} className={'border border-solid'}>
                                    <tr>
                                        <td className={'p-2 border border-solid text-[14px]'}>{order.firstName}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{order.fullName}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{order.email}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{formattedOrderDay}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{totalPrice}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{orderDetail.adultPassengers} </td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{orderDetail.childPassengers} </td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{orderDetail.toddlerPassengers} </td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{orderDetail.infantPassengers}</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{order.participants}Passengers</td>
                                        <td className={'p-2 border border-solid text-[14px]'}>{order.status}</td>
                                    </tr>
                                </tbody>
                            )})}
                        </table>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalDetailOrder;
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


interface ModalUserContactRegisteredTourProps {
    oderDetails: OrderDetailDTO[]
}

//bang
//TablePassenger
const ModalUserContactRegisteredTour: FC<ModalUserContactRegisteredTourProps> = ({oderDetails}) => {
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
            <button onClick={handleOpen} className={'text-blue-700 hover:text-blue-400'}>Contact</button>
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
                        <table className="table-auto w-full text-left border border-solid">
                            <thead>
                            <tr className="border border-solid bg-black text-white">
                                <th className={'p-1'}>Group</th>
                                <th className={'p-1'}>FirstName</th>
                                <th className={'p-1'}>FullName</th>
                                <th className={'p-1'}>Email</th>
                                <th className={'p-1'}>Phone</th>
                                <th className={'p-1'}>Address</th>
                                <th className={'p-1'}>Order At</th>
                                <th className={'p-1'}>Participants</th>
                            </tr>
                            </thead>
                            {oderDetails?.map((oderDetail, index) => {
                                let order = oderDetail.order
                                const createAt = new Date(order.createdAt)
                                const formatDay = createAt.toLocaleDateString('es-uk', options)
                                return (
                                    <tbody key={oderDetail.id}>
                                    <tr className="border border-solid">
                                        <td className={'p-1 text-[14px] border border-solid'}>{index + 1}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.firstName}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.fullName}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.email}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.phone}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.address}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{formatDay}</td>
                                        <td className={'p-1 text-[14px] border border-solid'}>{order.participants} Passengers</td>
                                    </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
export default ModalUserContactRegisteredTour
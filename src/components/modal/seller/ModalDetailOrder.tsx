import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import {OrderDetailDTO} from "@/types/seller";
import TableDetailBill from "@/components/seller/table/TableDetailBill";

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
//BillManager
const ModalDetailOrder: FC<ModalDetailOrderProps> = ({orderDetails}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button onClick={handleOpen} className={'text-blue-400 hover:text-blue-700'}>Detail</button>
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
                    <div className="overflow-auto max-h-[70vh]">
                        <table className="table-auto border border-solid w-full">
                            <thead className={'border bg-black text-white border-solid'}>
                            <tr className={'text-[12px]'}>
                                <th className={'p-1'}>First Name</th>
                                <th className={'p-1'}>Full Name</th>
                                <th className={'p-1'}>Email</th>
                                <th className={'p-1'}>Order Day</th>
                                <th className={'p-1'}>Price</th>
                                <th className={'p-1'}>Adult Passengers</th>
                                <th className={'p-1'}>Children Passengers</th>
                                <th className={'p-1'}>Toddler Passengers</th>
                                <th className={'p-1'}>Infant Passengers</th>
                                <th className={'p-1'}>Participants</th>
                                <th className={'p-1'}>Status</th>
                            </tr>
                            </thead>
                            {orderDetails?.map((orderDetail) => {
                                return (
                                <tbody key={orderDetail.id} className={'border border-solid'}>
                                    <TableDetailBill orderDetail={orderDetail}/>
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
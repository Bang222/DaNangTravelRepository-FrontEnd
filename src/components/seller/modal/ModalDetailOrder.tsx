import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import {BillDTO, OrderDetailDTO} from "@/types/seller";
import TableDetailBill from "@/components/seller/table/TableDetailBill";
import Paragraph from "@/components/ui/Paragraph";
import TablePassenger from "@/components/seller/table/TablePassenger";

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
    order: BillDTO
}

//BillManager
const ModalDetailOrder: FC<ModalDetailOrderProps> = ({order}) => {
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
                        <div>
                            <Paragraph className={'font-bold'} size={"sm"}>Bill</Paragraph>
                        </div>
                        <TableDetailBill order={order}/>
                    </div>
                    <div className={'mt-[30px]'}>
                        <Paragraph className={'font-bold'} size={"sm"}>Passenger Information</Paragraph>
                    </div>
                    <TablePassenger passengers={order.orderDetail.passengers}/>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalDetailOrder;

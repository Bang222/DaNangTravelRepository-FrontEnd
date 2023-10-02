import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TablePassenger from "@/components/seller/table/TablePassenger";
import {FC} from "react";
import {BillDTO, OrderDetailDTO, PassengerDTO} from "@/types/seller";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalOfPassengerProps {
    order: BillDTO
}

//TableOfTour
const ModalOfPassenger: FC<ModalOfPassengerProps> = ({order}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={()=>handleOpen()}>Detail</Button>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className={'flex justify-between'}>
                        <Typography sx={{marginBottom: "36px"}} id="keep-mounted-modal-title" variant="h5"
                                    component="h2">
                            Passenger Information
                        </Typography>
                        <div className={'cursor-pointer'} onClick={handleClose}>
                            <span>close</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalOfPassenger;

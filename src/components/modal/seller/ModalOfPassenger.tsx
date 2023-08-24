import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TablePassenger from "@/components/seller/table/TablePassenger";
import {FC} from "react";
import {OrderDetailDTO, PassengerDTO} from "@/types/seller";

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
    oderDetails: OrderDetailDTO[]
}

//TableOfTour
const ModalOfPassenger: FC<ModalOfPassengerProps> = ({oderDetails}) => {
    const [open, setOpen] = React.useState(false);
    const passengerBase = oderDetails.flatMap((orderDetail, index) => {
        return orderDetail.passengers.map(passenger => ({
            ...passenger,
            group: index + 1,
        }));
    });
    const [passengerArray, setPassengerArray] = React.useState(passengerBase)
    React.useEffect(() => {
        const passengerUpdate = oderDetails.flatMap((orderDetail, index) => {
            return orderDetail.passengers.map(passenger => ({
                ...passenger,
                group: index + 1,
            }));
        });
        setPassengerArray(passengerUpdate)
    }, [oderDetails])
    React.useEffect(() => {
        const passengerUpdate = oderDetails.flatMap((orderDetail, index) => {
            return orderDetail.passengers.map(passenger => ({
                ...passenger,
                group: index + 1,
            }));
        });
        setPassengerArray(passengerUpdate)
    }, [])
    const totalAdults = oderDetails.map((item) => item.adultPassengers).reduce((a, b) => {
        return a + b
    }, 0)
    const totalChildren = oderDetails.map((item) => item.childPassengers).reduce((a, b) => {
        return a + b
    }, 0)
    const totalToddles = oderDetails.map((item) => item.toddlerPassengers).reduce((a, b) => {
        return a + b
    }, 0)
    const totalInfants = oderDetails.map((item) => item.infantPassengers).reduce((a, b) => {
        return a + b
    }, 0)
    const [group, setGroup] = React.useState<PassengerDTO[]>(passengerArray);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        const modalState = localStorage.getItem('ModalOfPassenger');
        if (modalState === 'open') {
            setOpen(true);
        }
    }, []);

    React.useEffect(() => {
        if (open) {
            localStorage.setItem('ModalOfPassenger', 'open');
        } else {
            localStorage.removeItem('ModalOfPassenger');
        }
    }, [open]);
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
                    <TablePassenger oderDetails={oderDetails} passengers={passengerArray}/>
                    <div className={'mt-4'}>
                        <div className={'p-2'}>
                            <div className={'grid grid-cols-3 md:grid-cols-5'}>
                                <div><span>Adults:{totalAdults}</span></div>
                                <div><span>Child:{totalChildren}</span></div>
                                <div><span>Toddles:{totalToddles}</span></div>
                                <div><span>Infants:{totalInfants}</span></div>
                                <div><span>Group: {oderDetails.length}</span></div>
                            </div>
                            <div className={'mb-2 text-right'}>
                                <b>Total:</b>
                                {totalAdults + totalInfants + totalToddles + totalChildren}
                                {totalAdults + totalInfants + totalToddles + totalChildren > 0 ? 'Passengers' : 'null'}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalOfPassenger;
import {FC} from 'react';
import * as React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TablePassenger from "@/components/seller/table/TablePassenger";
import {PassengerDTO} from "@/types/seller";
import Paragraph from "@/components/ui/Paragraph";

interface ModalDetailProps {
    passengers: PassengerDTO[]
}

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
//TableTourComponent

const ModalDetailPassengerOfTour: FC<ModalDetailProps> = ({passengers}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let totalMen = (passengers.filter((passenger) => passenger.sex === "Men"))
    let totalWomen = (passengers.filter((passenger) => passenger.sex === "Women"))
    let totalAdults = (passengers.filter((passenger) => passenger.type === "Adult"))
    let totalChildren = (passengers.filter((passenger) => passenger.type === "Child"))
    let totalToddler = (passengers.filter((passenger) => passenger.type === "Toddler"))
    let totalInfant = (passengers.filter((passenger) => passenger.type === "Infant"))

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
                    <div className={'text-right '}>
                    <span className={'cursor-pointer p-2'} onClick={handleClose}>
                        close
                    </span>
                    </div>
                    <div>
                        <div>
                            <Paragraph className={'text-center font-bold'}>Information Users Register</Paragraph>
                        </div>
                        <div className={'max-h-[45vh] min-h-[50vh] overflow-y-auto'}>
                            <TablePassenger passengers={passengers}/>
                        </div>
                        <div className={"mt-4 flex"}>
                            <Paragraph className={'font-bold'}>Gender: </Paragraph>
                            <div className={"pl-3 flex items-center"}>
                                <Paragraph className={'pr-3'} size={"sm"}>Men: {totalMen.length}</Paragraph>
                                <Paragraph className={'pr-3'} size={"sm"}>Women: {totalWomen.length}</Paragraph>
                            </div>
                        </div>
                        <div className={"mt-4 flex"}>
                            <Paragraph className={'font-bold'}>Type User:</Paragraph>
                            <div className={"pl-3 flex items-center"}>
                                <Paragraph className={'pr-3'} size={"sm"}>Adult: {totalAdults.length}</Paragraph>
                                <Paragraph className={'pr-3'} size={"sm"}>Children: {totalChildren.length}</Paragraph>
                                <Paragraph className={'pr-3'} size={"sm"}>Toddler: {totalToddler.length}</Paragraph>
                                <Paragraph className={'pr-3'} size={"sm"}>Infant: {totalInfant.length}</Paragraph>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalDetailPassengerOfTour;

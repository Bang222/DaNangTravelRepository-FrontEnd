import {FC} from 'react';
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paragraph from "@/components/ui/Paragraph";
import LineCustom from "@/components/ui/LineCustom";
import CloseIcon from '@mui/icons-material/Close';
import FestivalIcon from '@mui/icons-material/Festival';
import InputCreateTour from "@/components/seller/inputCreateTour";
import {useTheme} from "@mui/system";
import {useMediaQuery} from "@mui/material";

interface ModalCreateTourProps {
}


const ModalCreateTour: FC<ModalCreateTourProps> = ({}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: isSmallScreen ? theme.spacing(2) : theme.spacing(4),
    };

    return (
        <div>
            <button
                className="m-2 bg-blue-500 text-[12px] lg:text-[15px] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md"
                onClick={handleOpen}>Create
            </button>
            <Modal
                sx={{left: '5%', right: '5%'}}
                open={openModal}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <section>
                        <div className={'flex flex-column justify-between mb-2'}>
                            <div><Paragraph size={'md'} className={'font-bold'}>Create</Paragraph></div>
                            <div><FestivalIcon sx={{color: 'green'}}/></div>
                            <div className={'cursor-pointer'} onClick={handleClose}><CloseIcon/></div>
                        </div>
                        <LineCustom size={'100%'}/>
                        <div className={''}>
                            <div className={'overflow-y-scroll lg:overflow-y-auto h-[70vh]'}>
                                <InputCreateTour/>
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalCreateTour;
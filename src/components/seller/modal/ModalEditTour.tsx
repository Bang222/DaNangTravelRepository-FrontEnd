import {FC} from 'react';
import * as React from "react";
import {useTheme} from "@mui/system";
import {useMediaQuery} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Paragraph from "@/components/ui/Paragraph";
import FestivalIcon from "@mui/icons-material/Festival";
import CloseIcon from "@mui/icons-material/Close";
import LineCustom from "@/components/ui/LineCustom";
import InputCreateTour from "@/components/seller/inputCreateTour";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {TourOfStore} from "@/types/seller";
import InputEditTour from "@/components/seller/inputEditTour";

interface ModalEditTourProps {
    dataTour: TourOfStore
}

//bang

const ModalEditTour: FC<ModalEditTourProps> = ({dataTour}) => {
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
        <span>
            <button
                onClick={handleOpen}><EditNoteIcon sx={{color: '#B2B200'}}/>
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
                            <div><Paragraph size={'md'} className={'font-bold'}>Edit</Paragraph></div>
                            <div><FestivalIcon sx={{color: 'green'}}/></div>
                            <div className={'cursor-pointer'} onClick={handleClose}><CloseIcon/></div>
                        </div>
                        <LineCustom size={'100%'}/>
                        <div className={''}>
                            <div className={'overflow-y-scroll lg:overflow-y-auto h-[70vh]'}>
                                <InputEditTour
                                    dataTour={dataTour}
                                />
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </span>
    );
}

export default ModalEditTour;

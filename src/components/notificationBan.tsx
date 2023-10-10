import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FC} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface NotificationBanProps {
}

//bang

const NotificationBan: FC<NotificationBanProps> = ({}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button sx={{color:"red"}} onClick={handleOpen}>Store Baned</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                         Contact To Admin
                        </Typography>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Email:bangdcgcd191292@fpt.edu.com
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Abusing Shop promotions
                            Da Nang Travel may lock your account if it detects signs of using incentives or promotions. A limitation such as using multiple AliExpress accounts on one device, using a common wifi network to use multiple discount codes. Or order large quantities of goods so as not to target them for use, buying and reselling...
                            Da Nang Travel account is locked for fraud or fraud
                            Once detected, the following fraudulent and fraudulent acts will have your account locked:
                            The shop places its own orders.
                            Create multiple Da Nang Travel accounts to place orders.
                            Selling counterfeit, counterfeit, quality value or items that violate the law as defined. ", "transfer". ” … If you intentionally violate these rules, your account may be permanently locked.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default NotificationBan;

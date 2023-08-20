import React, {FC} from 'react';
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const {children, onClose, ...other} = props;
    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
interface MakeSureDeleteTourProps {
    tourId:string;
    handleDelete : (tourId) => void
}

//bang

const MakeSureDeleteTour: FC<MakeSureDeleteTourProps> = ({handleDelete,tourId}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const acceptDelete = () => {
        handleDelete(tourId)
    }
    return (
        <>
            <DeleteIcon sx={{color:'red'}} onClick={handleClickOpen}/>
            <BootstrapDialog
                // onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Make Sure Delete Tour
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                    Tour can not convert when you delete tour
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                            acceptDelete();
                            handleClose();
                        }}
                    >
                        Delete
                    </button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default MakeSureDeleteTour;
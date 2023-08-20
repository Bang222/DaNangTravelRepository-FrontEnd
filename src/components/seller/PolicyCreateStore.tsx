import React, {FC} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Paragraph from "@/components/ui/Paragraph";

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

interface PolicyCreateStoreProps {
    handleSubmit: () => void;
    formErrors: {
        [field: string]: string;
    };
}

//bang

const PolicyCreateStore: FC<PolicyCreateStoreProps> = ({handleSubmit, formErrors}) => {
    const [open, setOpen] = React.useState(false);
    const [accessPolicy, setAccessPolicy] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePolicyAccept = () => {
        if (accessPolicy) {
            handleSubmit();
        }
    };
    return (
        <div>
            <div
                className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                onClick={handleClickOpen}
            >
                Register
            </div>
            <BootstrapDialog
                // onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Policy Create Store
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </Typography>
                </DialogContent>
                <DialogActions>

                </DialogActions>
                <div className={'flex justify-around'}>
                    <input
                        type='checkbox'
                        checked={accessPolicy}
                        onClick={() => setAccessPolicy(!accessPolicy)}
                    />
                    <DialogActions>
                        <div className={'text-center'}>
                            {formErrors.slogan && (
                                <Paragraph status={'error'} size="sx">
                                    {formErrors.slogan}
                                </Paragraph>
                            )}
                            {formErrors.name && (
                                <Paragraph status={'error'} size="sx">
                                    {formErrors.name}
                                </Paragraph>
                            )}
                        </div>
                    </DialogActions>
                    {accessPolicy && !formErrors.slogan && !formErrors.name ?
                        <DialogActions>
                            <button onClick={handlePolicyAccept} className={'text-blue-400'}>
                                Register
                            </button>
                        </DialogActions> :
                        <DialogActions>
                            <div
                                className="text-red-600 cursor-not-allowed"
                            >
                                Register
                            </div>
                        </DialogActions>
                    }
                </div>
            </BootstrapDialog>
        </div>
    );
}

export default PolicyCreateStore;
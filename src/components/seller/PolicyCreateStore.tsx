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
                        User Commitment to DaNang,Traval and our User community when using DaNang,Traval's services
                        To ensure that using DaNang,Traval's services is useful and convenient as desired and to promote the development of the goal of connecting the online travel and online shopping community effectively, Users need to perform the following steps: following commitments:

                        3.1 Make sure you have the right to use DaNang,Traval's services
                        DaNang,Traval's User Community is safer and more responsible when:

                        Users use their real name on legal documents to register to use the service.
                        Users provide their own correct information.
                        Each User uses only one of his or her own account using the timeline for personal purposes.
                        Users do not share their account password or give others access to their DaNang,Traval account or transfer the account to others without our consent.
                        DaNang,Traval aims to provide services to everyone, Users please ensure that Users do not fall into the following cases:

                        The User is under 13 years old and does not have a legal representative (or is of another age according to current laws in the User's country regarding the use of online information services).
                        The user is convicted by a court of a sex-related crime.
                        The user has had their account disabled in the past for violating our terms or policies.
                        In accordance with relevant applicable laws, Users are prohibited from using our products, services or software.
                        3.2 Shared content and allowed actions on DaNang,Traval
                        Users are encouraged to share their personal experiences and other important content on DaNang,Traval without violating the privacy of others and the interconnectedness of the User community on DaNang,Traval. Therefore, the User needs to ensure the following:

                        Users do not use DaNang,Traval's services to make or share any content that is identified as:
                        Violation of these Terms of Service, Community Standards and other Terms and Policies applicable when Users register to use DaNang,Traval's services.
                        An act that violates the provisions of applicable laws, acts that cause confusion, deception or discrimination.
                        Acts that cause harm or infringe upon the rights and interests of others.
                        Users may not upload viruses or malicious code or otherwise attempt to disable, overburden or otherwise affect DaNang,Traval's service provision.
                        Users may not use automated means or any other means to access other Users' data without our consent.
                        If we determine that a User has performed any activity that violates the stated content, we will take preventive measures such as deleting content, restricting account access, and disabling the account if necessary. If a User repeatedly infringes the intellectual property rights of others, we may also disable the User's account.

                        To ensure a safe connection and information security for the User community, encourage Users to report violating content or behavior that Users believe violates their rights or violates terms and policies. us so that we can take measures to check and handle it in a timely manner.
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
                            {formErrors.slogan || formErrors.name  || formErrors.paymentId ? (
                                <Paragraph status={'error'} size="sx">
                                   can not null data
                                </Paragraph>
                                )
                                :
                                ""
                            }
                        </div>
                    </DialogActions>
                    {accessPolicy && !formErrors.slogan && !formErrors.name && !formErrors.paymentId ?
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

'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import {Avatar, CardHeader, Tooltip} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {FC} from "react";
import {commentDTO, userDTO} from "@/types";
import CommentOfTour from "@/components/user/commentOfTour";
import {useSelector} from "react-redux";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCommentPost} from "@/util/api/apiReuqest";
import {toast} from "react-toastify";

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

interface ModalPostProps {
    comments: commentDTO[]
    experienceId:string
}
//Component/Experience
const ModalCommentExpericence: FC<ModalPostProps> = ({comments,experienceId}) => {
    const [open, setOpen] = React.useState(false);
    const user = useSelector<userDTO>((state) => state.auth.value?.user)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [content,setContent] = React.useState<string>()
    const queryClient = useQueryClient()
    const {mutate: mutateComment, isLoading: isLoadingComment, status, isSuccess} = useMutation(
        async (content:string) => {
            try {
                const res = await createCommentPost(accessToken, userId, experienceId, content)
                return res
            } catch(e){
                throw new Error(e)
            }
        },{
            onSuccess(){
                queryClient.invalidateQueries(['experienceExperience', userId]);
                setContent('')
            },
            onError(){
                toast.error('can not comment')
            }
        }

    )

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        if (!content?.trim()) return;
        if (content != null) {
            mutateComment(content)
        }
    }
    return (
        <div>
            <Button onClick={handleClickOpen}>
                <Tooltip title="Comment" placement="top" sx={{color: 'black', '&:hover': {color: 'blue'}}}>
                    <CommentIcon/>
                </Tooltip>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{width: '400px', top: '10%',left: { lg:'67%'}}}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Comments
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{height:'80vh'}}>
                    {comments.length !== 0 ?
                        <>
                            {comments?.map((comment) => {
                                return (
                                    <Typography sx={{display: 'flex'}} gutterBottom key={comment.id}>
                                        <CommentOfTour
                                            user={comment.user}
                                            id={comment.id}
                                            content={comment.content}
                                        />
                                    </Typography>
                                )
                            })}
                        </>
                        :
                        <Typography gutterBottom>
                            null
                        </Typography>
                    }
                </DialogContent>
                <section className={'flex items-center bg-neutral-400'}>
                    <DialogActions>
                        <CardHeader sx={{padding:'0'}}
                                    avatar={
                                        <Avatar sx={{backgroundColor: 'red'}} src={user.profilePicture} alt={'user'}
                                                aria-label="recipe">
                                        </Avatar>
                                    }
                        ></CardHeader>
                        <div className={' flex justify-center items-center w-[65%] md:w-[80%]'}>
                                <textarea type='text'
                                          placeholder='comment'
                                          name='content'
                                          id="content"
                                          className={'flex-1 h-10 p-2 resize-none rounded-lg focus:outline-none  '}
                                          value={content}
                                          onChange={(e)=> setContent(e.target.value)}
                                />
                        </div>
                        <div className={'pl-3.5'}>
                            <Tooltip title="comment" placement="top" sx={{
                                color: 'grey', cursor: 'pointer', '&:hover': {
                                    color: 'blue'
                                },
                                fontSize: '20px'
                            }} onClick={(e)=>handleSubmit()}>
                                <SendIcon/>
                            </Tooltip>
                        </div>
                    </DialogActions>
                </section>
                {/*<DialogActions>*/}
                {/*    <Button autoFocus onClick={handleClose}>*/}
                {/*        Save changes*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </BootstrapDialog>
        </div>
    );
}
export default ModalCommentExpericence
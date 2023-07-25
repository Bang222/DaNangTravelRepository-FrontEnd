'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommentIcon from '@mui/icons-material/Comment';
import {styled} from '@mui/material/styles';
import {NextPage} from "next";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Paragraph from "@/components/ui/Paragraph";
import CardActions from "@mui/material/CardActions";
import ClearIcon from '@mui/icons-material/Clear';
import {Tooltip} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {getCommentsOfTour} from "@/util/api/apiReuqest";
import {useState} from "react";
import {CommentTourDTO} from "@/types";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const CustomButton = styled(Button)({
    color: 'black',
    '&:hover': {
        backgroundColor: '#D3D3D3',
        color: 'blue'
    },
});

export interface props {
        id: string;
        name: string;
        imageUrl: string;
        comments:number;
        createdAt:Date;
        store: {
            id: string;
            name: string;
            slogan: string;
            isActive: boolean;
        }
}

const ModalCommentOfTour: React.FC<props> = ({...props}) => {
    const [commentsError, setCommentsError] = useState("");
    const [commentsSuccess, setCommentsSuccess] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {mutate,isLoading,data} =useMutation(getCommentsOfTour,{
        onSuccess: () => {
            setCommentsError('')
        },
        onError: (error) => {
            setCommentsError(error.message);
            setCommentsSuccess('');
        },
    })
    const handleClickTurnOffModal = () => {
        setOpen(false)
    }
    const handleClickComments = (tourId:string) => {
        mutate(tourId)
    }
    return (
        <div className=''>
            <CustomButton onClick={handleOpen}><CommentIcon/></CustomButton>
            <Modal
                sx={{width: '100%', display: 'flex', justifyContent:'center', alignItems: 'center'}}
                disableEnforceFocus={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{height: {xs:'fit-content', md:'90%'}, maxHeight: {xs: '70%'},width: {xs:'80vw',lg:'50vw'}, marginTop: '48px', marginBottom: '48px',overflowY: 'scroll'}}>
                    <CardHeader
                        // src={} alt={}
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" onClick={handleClickTurnOffModal}>
                                <ClearIcon/>
                            </IconButton>
                        }
                        title={props.store.name}
                        subheader={props.createdAt}
                    />
                    <CardContent>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <div className={'w-full flex justify-center mb-[12px]'}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={props.imageUrl} alt={'err'} loading={'lazy'}
                                 className={'w-full object-cover'}/>
                        </div>
                        <div className={'grid grid-flow-col justify-stretch'}>
                            <div>
                                <Paragraph size={"md"}><b>Name: </b>{props.name}</Paragraph>
                                {/*<Paragraph><b>Price: </b>{props.price}/Per</Paragraph>*/}
                                {/*<Paragraph><b>Address: </b>{props.address}</Paragraph>*/}
                                {/*<Paragraph><b>Day Start: </b>{props.formattedStartDate} <Paragraph>*/}
                                {/*    <b>Total:</b> {props.differenceInDays} days</Paragraph></Paragraph>*/}
                            </div>
                            <div className={'grid lg:flex items-end justify-center lg:justify-end pb-[10px]'}>
                                {/*<button*/}
                                {/*    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>Detail*/}
                                {/*</button>*/}
                                {/*<button*/}
                                {/*    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full lg:ml-4 lg:mr-5'}>Booking*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </CardContent>
                    <div className={'w-full flex justify-center'}>
                        <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
                    </div>
                    <CardActions sx={{width: '100%'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                        <Typography sx={{display: 'flex'}}>
                            <Tooltip title="comment" placement="top" sx={{color: 'black', cursor:'pointer','&:hover': {
                                backgroundColor: '#D3D3D3',
                                color: 'blue'
                            },}} onClick={()=> handleClickComments(props.id)} >
                                <CommentIcon/>
                            </Tooltip>
                            <Paragraph>{props.comments}</Paragraph>
                        </Typography>
                            <Typography>
                                <Paragraph className={'text-blue-500'}> see more</Paragraph>
                            </Typography>
                        </Box>
                    </CardActions>
                    <div className={'w-full flex justify-center'}>
                        <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
                    </div>
                    <CardContent>
                        {isLoading ? <Paragraph>Loading...</Paragraph> :<>
                            { data && data?.map((comment:CommentTourDTO) => {return (
                                <section className={'flex pt-2 pb-2'} key={comment.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar  sx={{bgcolor: red[500]}} alt={comment.user.firstName} src={comment.user.profilePicture} aria-label="recipe">
                                            </Avatar>
                                        }
                                    ></CardHeader>
                                    <div className={'bg-zinc-300 p-2 rounded-[10px]'}>
                                        <Paragraph className={'font-bold m-0 text-[10px]'}> {comment.user.firstName} {comment.user.lastName} </Paragraph>
                                        <Paragraph className={'text-[8px]'}> {comment.content}</Paragraph>
                                    </div>
                                </section>

                            )})}
                             </>}
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
}
export default ModalCommentOfTour
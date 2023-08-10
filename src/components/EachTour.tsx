import {FC, useEffect, useMemo, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";

import Paragraph from "@/components/ui/Paragraph";
import CardActions from "@mui/material/CardActions";
import {Tooltip} from "@mui/material";
import ModalCommentOfTour from "@/components/modal/ModalCommentOfTour";
import * as React from "react";
import {CommentTourDTO, TourDTO} from "@/types";
import {useMutation} from "@tanstack/react-query";
import {upVoteTourApi} from "@/util/api/apiReuqest";
import {useSelector} from "react-redux";
import Slice from "@/components/ui/swiperSlice";
import Link from "next/link";
import LineCustom from "@/components/ui/LineCustom";
import PublicSharpIcon from '@mui/icons-material/PublicSharp';


interface TourDetailProps {
    id: string
    comments?: [
        {
            id: string
        }
    ]
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
        imgUrl:string;
    }
    name: string;
    imageUrl: string[];
    price: number;
    address: string;
    userId: string;
    upVote: string[]
    createdAt: Date;
    endDate: Date;
    startDate: Date;
}

const EachTour: FC<TourDetailProps> = ({...tour}) => {
    const token = useSelector<any>((state) => state.auth.value?.token)
    const user = useSelector((state) => state.auth.value?.user)
    const {err, setErr} = React.useState<string>('')
    const [commentData, setCommentData] = useState<CommentTourDTO[]>(tour.comments)
    const [upvote, setUpvote] = useState<number>(tour.upVote.length)
    const [previewImage, setPreviewImage] = useState(tour?.imageUrl)
    console.log(tour.upVote.length -1 + 'state',upvote -1)
    const {mutate, data} = useMutation(upVoteTourApi, {
        onSuccess: (data) => {
            // setTotalVote(dataVote?.total);
            // setVoteStatus(dataVote?.status);
            return setUpvote(upvote + data.total)
        },
        onError: (error) => {
            setErr(error.message);
        },
    });
    const iconStyle: { color: string; "&:hover": { transform: string; color: string }; transition: string } = {
        color: 'black',
        transition: 'color 0.3s, transform 0.3s',
        '&:hover': {
            color: 'blue',
            transform: 'rotate(360deg)',
        },
    };
    useEffect(()=>{
        setUpvote(tour.upVote.length)
    },[tour.upVote.length])
    const handleClickUpvote = (tourId: string) => {
        mutate(tourId)
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month:'numeric',
        day: 'numeric',
    }
    const startDate: Date = new Date(tour.startDate);
    const endDate: Date = new Date(tour.endDate)
    const createdAt: Date = new Date(tour.createdAt);
    const formattedStartDate = startDate.toLocaleDateString('es-uk',options);
    const formatCreateAt = createdAt.toLocaleDateString('es-uk',options);
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar src={tour.store.imgUrl} alt={'store'} sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <PublicSharpIcon sx={iconStyle}/>
                    </IconButton>
                }
                title={tour.store.name}
                subheader={formatCreateAt}
            />

            <CardContent>
                <section className={'mb-4'}>
                  <Slice previewImage ={previewImage}  />
                </section>
                <div className={'grid grid-flow-col justify-stretch'}>
                    <div>
                        <Paragraph>Name: <b>{tour.name}</b></Paragraph>
                        <Paragraph>Price: <b>{tour.price}/Per</b></Paragraph>
                        <Paragraph>Address: <b>{tour.address}</b></Paragraph>
                        <Paragraph>Day Start: <b>{formattedStartDate}</b> <Paragraph>
                            Total: <b>{differenceInDays}Days {differenceInDays - 1}Night</b></Paragraph></Paragraph>
                    </div>
                    <div className={'grid  lg:flex items-end justify-around pb-[10px]'}>
                        <button
                            className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-[100px] rounded-full'}>
                            <Link href={{pathname: `/tour/${tour.id}`}}>Detail</Link>
                        </button>
                        <button
                            className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>
                            <Link href={`/booking/${tour.id}`}>Booking</Link>
                        </button>
                    </div>
                </div>
            </CardContent>
            <div className={'w-full flex justify-center'}>
                <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
            </div>
            <CardActions sx={{width: '100%'}}>
                {(data?.status ? data?.status.includes(tour.userId) :
                    tour?.upVote.includes(tour.userId))
                    ?
                    <IconButton aria-label="add to favorites" sx={{color: 'red'}}
                                onClick={() => handleClickUpvote(tour.id)}
                    >
                        <FavoriteIcon/>
                    </IconButton>
                    : <IconButton aria-label="add to favorites" sx={{color: 'black'}}
                                  onClick={() => handleClickUpvote(tour.id)}>
                        <FavoriteIcon/>
                    </IconButton>
                }
                <Typography>{upvote -1 }</Typography>
                <Typography>
                    <Tooltip title="comment" placement="top" sx={{color: 'black'}}>
                        <ModalCommentOfTour
                            id={tour.id}
                            name={tour.name}
                            comments={Number(tour.comments?.length)}
                            store={tour.store}
                            createdAt={tour.createdAt}
                            imageUrl={tour.imageUrl}
                            commentData={commentData}
                            setCommentData={setCommentData}
                        />
                    </Tooltip>
                </Typography>
                <Typography>{commentData.length !== 0 ? commentData.length : tour.comments?.length}</Typography>
            </CardActions>
            <LineCustom size = {'90%'} />
        </>
    );
}

export default EachTour;
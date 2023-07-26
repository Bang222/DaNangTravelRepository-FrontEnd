import {FC, useMemo} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Paragraph from "@/components/ui/Paragraph";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";
import ModalCommentOfTour from "@/components/modal/ModalCommentOfTour";
import * as React from "react";
import {TourDTO} from "@/types";
import {useMutation} from "@tanstack/react-query";
import {upVoteTourApi} from "@/util/api/apiReuqest";

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
    }
    name: string;
    imageUrl: string;
    price: number;
    address: string;
    userId: string;
    upVote: string[]
    createdAt: Date;
    endDate: Date;
    startDate:Date;
}

//bang

const EachTour: FC<TourDetailProps> = ({...tour}) => {
    const [upVote,setUpVote]= React.useState<>([])
    const {err, setErr} = React.useState<string>('')
    const {mutate,data, isIdle} = useMutation(upVoteTourApi, {
        onSuccess: () => {
            // setTotalVote(dataVote?.total);
            // setVoteStatus(dataVote?.status);
        },
        onError: (error) => {
            setErr(error.message);
        },
    });
    const handleClickUpvote = (tourId: string) => {
        mutate(tourId)
    }
    const startDate = new Date(tour.startDate);
    const endDate = new Date(tour.endDate)
    const formattedStartDate = startDate.toLocaleDateString();
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return (
        <>
            <CardHeader
                // src={} alt={}
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={tour.store.name}
                subheader={tour.createdAt}
            />
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    height="194"*/}
            {/*    image="/static/images/cards/paella.jpg"*/}
            {/*    alt="Paella dish"*/}
            {/*/>*/}
            <CardContent>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className={'w-full flex justify-center mb-[12px]'}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tour.imageUrl} alt={'err'} loading={'lazy'}
                         className={'w-full object-cover'}/>
                </div>
                <div className={'grid grid-flow-col justify-stretch'}>
                    <div>
                        <Paragraph><b>Name: </b>{tour.name}</Paragraph>
                        <Paragraph><b>Price: </b>{tour.price}/Per</Paragraph>
                        <Paragraph><b>Address: </b>{tour.address}</Paragraph>
                        <Paragraph><b>Day Start: </b>{formattedStartDate} <Paragraph>
                            <b>Total:</b> {differenceInDays} days</Paragraph></Paragraph>
                    </div>
                    <div className={'grid  lg:flex items-end justify-around pb-[10px]'}>
                        <button
                            className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>Detail
                        </button>
                        <button
                            className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>Booking
                        </button>
                    </div>
                </div>
            </CardContent>
            <div className={'w-full flex justify-center'}>
                <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
            </div>
            <CardActions sx={{width: '100%'}}>
                { (data?.status ? data?.status.includes(tour.userId) :
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
                <Typography>{data?.total ? data?.total -1 :tour.upVote?.length -1}</Typography>
                <Typography>
                    <Tooltip title="comment" placement="top" sx={{color: 'black'}}>
                        <ModalCommentOfTour
                            id={tour.id}
                            name={tour.name}
                            comments={Number(tour.comments?.length)}
                            store={tour.store}
                            createdAt={tour.createdAt}
                            imageUrl={tour.imageUrl}/>
                    </Tooltip>
                </Typography>
                <Typography>{tour.comments?.length}</Typography>
            </CardActions>
            <div className={'w-full flex justify-center'}>
                <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
            </div>
            <CardContent>

            </CardContent>
        </>
    );
}

export default EachTour;
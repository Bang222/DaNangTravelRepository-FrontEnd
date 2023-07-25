'use client'

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Tooltip} from "@mui/material";
import {RegisterApi, upVoteTourApi, useGetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import {useMutation} from "@tanstack/react-query";
import ModalCommentOfTour from "@/components/modal/ModalCommentOfTour";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
interface vote {
    status: boolean;
    total: number;
}
export default function TourComponent() {
    const {data, isLoading} = useGetAllTourApi()
    const {mutate} = useMutation(upVoteTourApi, {
        onSuccess: () => {
           // setTotalVote(dataVote?.total);
           // setVoteStatus(dataVote?.status);
        },
        onError: (error) => {
            setErr(error.message);
        },
    });
    const [userId, setUserId] = React.useState<string>(localStorage?.getItem('userId'))
    const {err, setErr} = React.useState<string>('')
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClickUpvote = (tourId: string) => {
        mutate(tourId)
    }
    return (
        <>
            {isLoading ? <Paragraph>Loading...</Paragraph> : <> {data && data?.map((tour: TourDTO) => {
                const startDate = new Date(tour.startDate);
                const endDate = new Date(tour.endDate)
                const formattedStartDate = startDate.toLocaleDateString();
                const differenceInMilliseconds = endDate - startDate;
                const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
                return (
                    <Card sx={{maxWidth: '100%', marginTop: '48px', marginBottom: '48px'}} key={tour.id}>
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
                            {tour.upVote?.includes(userId) ?
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
                            <Typography>{tour.upVote?.length -1}</Typography>
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
                    </Card>
                )
            })} </>}
        </>
    );
}
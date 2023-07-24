'use client'
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import {Tooltip} from "@mui/material";
import {useGetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";


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

export default function TourComponent() {
    const {data, isLoading} = useGetAllTourApi()
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            {isLoading ? <Paragraph>Loading...</Paragraph> : <> {data?.map((tour: TourDTO) => {
                const startDate = new Date(tour.startDate);
                const endDate = new Date(tour.endDate)
                const formattedStartDate = startDate.toLocaleDateString();
                const differenceInMilliseconds = endDate - startDate;
                const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
                return (
                    <Card sx={{maxWidth: '100%',marginTop:'48px',marginBottom:'48px'}} key={tour.id}>
                        <CardHeader
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
                            <div className={'w-full flex justify-center'}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={tour.imageUrl} alt={'err'} loading={'lazy'}
                                     className={'h-[300px] object-cover'}/>
                            </div>
                            <Typography>
                                <Paragraph><b>Name: </b>{tour.name}</Paragraph>
                                <Paragraph><b>Price: </b>{tour.price}/Per</Paragraph>
                                <Paragraph><b>Address: </b>{tour.address}</Paragraph>
                                <Paragraph><b>Day Start: </b>{formattedStartDate} <Paragraph> <b>total:</b> {differenceInDays} days</Paragraph></Paragraph>
                                </Typography>
                        </CardContent>
                        <div className={'w-full flex justify-center'}>
                            <div style={{backgroundColor: '#A9A9A9', width:'90%' ,height:'1px'}}></div>
                        </div>
                        <CardActions>
                            {tour.upVote?.includes(localStorage.getItem('userId')) ?
                                <IconButton aria-label="add to favorites" sx={{color: 'red'}}>
                                    <FavoriteIcon/>
                                </IconButton>
                                :  <IconButton aria-label="add to favorites" sx={{color: 'black'}}>
                                    <FavoriteIcon/>
                                </IconButton>
                            }
                            <Typography>{tour.upVote?.length - 1}</Typography>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <Tooltip title="comment" placement="top" sx={{color: 'black'}}>
                                    <CommentIcon/>
                                </Tooltip>
                            </ExpandMore>
                            <Typography>{tour.comments?.length}</Typography>
                        </CardActions>
                        <div className={'w-full flex justify-center'}>
                            <div style={{backgroundColor: '#A9A9A9', width:'90%' ,height:'1px'}}></div>
                        </div>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            {tour.comments?.map((comment) => {
                                return (
                                    <>
                                        <section className={'flex pt-2 pb-2'}>
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
                                    </>
                                )
                            })}
                        </Collapse>
                    </Card>

                )
            })} </>}
        </>
    );
}
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
import {useEffect, useMemo} from "react";
import EachTour from "@/components/EachTour";


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
    const {data, isLoading,isFetching} = useGetAllTourApi()

    const [userId, setUserId] = React.useState<string>(localStorage?.getItem('userId'))
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log({isLoading, isFetching})
    return (
        <>
            {isLoading ? <Paragraph>Loading...</Paragraph> : <> {data && data?.map((tour: TourDTO) => {
                return (
                    <Card sx={{maxWidth: '100%', marginTop: '48px', marginBottom: '48px'}} key={tour.id}>
                       <EachTour
                           id={tour.id}
                           store = {tour.store}
                           name={tour.name}
                           imageUrl={tour.imageUrl}
                           price = {tour.price}
                           address ={tour.address}
                           userId={userId}
                           upVote = {tour.upVote}
                           comments ={tour.comments?.map((item)=>item)}
                           createdAt={tour.createdAt}
                           startDate={tour.startDate}
                           endDate={tour.endDate}
                        />
                    </Card>
                )
            })} </>}
        </>
    );
}
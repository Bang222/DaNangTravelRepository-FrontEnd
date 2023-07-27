'use client'

import * as React from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';

import {useGetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import EachTour from "@/components/EachTour";
import {Card} from "@mui/material";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/api/cookies";



interface vote {
    status: boolean;
    total: number;
}

export default function TourComponent() {
    const {data, isLoading, isFetching} = useGetAllTourApi()
    const [userId, setUserId] = React.useState<string>(localStorage?.getItem('userId'))
    const router = useRouter()
    const handleClick = () => {
       if(!getCookie('token')) {
           router.push('/login')
       }
    }
    console.log({isLoading, isFetching})
    return (
        <>
            {isLoading ? <Paragraph>Loading...</Paragraph> : <> {data && data?.map((tour: TourDTO) => {
                return (
                    <Card sx={{maxWidth: '100%', marginTop: '48px', marginBottom: '48px'}} key={tour.id} onClick={handleClick} >
                        <EachTour
                            id={tour.id}
                            store={tour.store}
                            name={tour.name}
                            imageUrl={tour.imageUrl}
                            price={tour.price}
                            address={tour.address}
                            userId={userId}
                            upVote={tour.upVote}
                            comments={tour.comments?.map((item) => item)}
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
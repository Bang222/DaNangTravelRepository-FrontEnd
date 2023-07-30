'use client'

import * as React from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';

import {useGetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import EachTour from "@/components/EachTour";
import {Card, CircularProgress} from "@mui/material";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/api/cookies";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logIn, logOut} from "@/redux/feature/auth-slice";



interface vote {
    status: boolean;
    total: number;
}

export default function TourComponent() {
    const {data, isLoading, isFetching} = useGetAllTourApi()
    const dispatch = useDispatch<AppDispatch>();
    const userIdInStore = useSelector((state) => state.auth.value?.user.id )
    console.log(userIdInStore)
    const isAuth = useSelector((state) => state.auth.value?.isAuth )

    const [userId, setUserId] = React.useState<string>(userIdInStore)
    const router = useRouter()
    const handleClick = () => {
        if(data) {
            const configData= {
                token: getCookie('token'),
                user: data
            }
             dispatch(logIn(configData))
        }
        if(!data) {
            router.push('/login')
        }
    }
    return (
        <>
            {isLoading ? <div className={'flex justify-center items-center h-screen'}>
                <CircularProgress color="secondary"/>
            </div> : <> {data && data?.map((tour: TourDTO) => {
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
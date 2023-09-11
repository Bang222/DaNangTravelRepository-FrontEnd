'use client'

import * as React from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';

import {GetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import EachTour from "@/components/user/EachTour";
import {Card, CircularProgress} from "@mui/material";
import { useRouter} from "next/navigation";
import {getCookie} from "@/util/api/cookies";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logIn, logOut} from "@/redux/feature/auth-slice";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useIntersection} from "@mantine/hooks";
import {useEffect, useRef} from "react";




interface vote {
    status: boolean;
    total: number;
}

export default function TourComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const userIdInStore = useSelector((state) => state.auth.value?.user.id)
    const isAuth = useSelector((state) => state.auth.value?.isAuth)

    const [userId, setUserId] = React.useState<string>(userIdInStore)
    const router = useRouter()
    const auth = useSelector((state) => state.auth.value?.isAuth)
    const handleClick = () => {
        if (auth === false) {
            router.push('/login')
        }
    }
    // const [data,setData] = React.useState<TourDTO[] | undefined>()
    // const fetchTourData = (page) => async () => {
    //     return await GetAllTourApi(page);
    // };

    const {data, fetchNextPage, isFetchingNextPage, isLoading, isSuccess} = useInfiniteQuery(
        ['All-Tour',userId],
        async ({pageParam = 1}) => {
            const res = await GetAllTourApi(pageParam);
            return res
        },
        {
            getNextPageParam: (data, pages) => {
                if (data.length > 2) {
                    return pages.length + 1;
                } else {
                    return undefined
                }
            },
            cacheTime: 5000,
        }
    );
    const totalPagesFetched = data?.pages.length ?? 0;
    const lastPostRef = useRef<HTMLElement>(null)
    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold:0
    })
    useEffect(()=>{
            if(entry?.isIntersecting) fetchNextPage()
    },[entry])
    const _tour = data?.pages.flatMap((page)=>page)
    return (
        <>
            {isLoading ? (
                <div className={'flex justify-center items-center h-screen'}>
                    <CircularProgress color="secondary"/>
                </div>
            ) : (
                <div>
                    {_tour?.map((tour: TourDTO,i) => {
                        if(i=== _tour.length -1) return <div key={tour.id} ref={ref}></div>
                        return(
                            <Card
                                sx={{
                                    maxWidth: '100%',
                                    marginTop: '48px',
                                    marginBottom: '48px',
                                }}
                                key={tour.id}
                                onClick={handleClick}
                            >
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
                        )})
                    }
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage || totalPagesFetched >= 3} // Disable if pages fetched >= 3
                    >
                        {isFetchingNextPage ? (
                            <CircularProgress color="secondary" />
                        ) : (
                            totalPagesFetched < 3 ? 'Load More' : 'No More Data'
                        )}
                    </button>
                </div>
            )}
        </>
    );
}
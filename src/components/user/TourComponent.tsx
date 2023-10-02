'use client'

import * as React from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';

import {GetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import EachTour from "@/components/user/EachTour";
import {Card, CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/api/cookies";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logIn, logOut} from "@/redux/feature/auth-slice";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useIntersection} from "@mantine/hooks";
import {useEffect, useRef} from "react";

interface TourData {
    userIdInStore: string,
    dataSearch: any
}
//tour/page
export default React.memo(function TourComponent(props: TourData) {
    const {userIdInStore, dataSearch} = props
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    const [userId, setUserId] = React.useState<string>(userIdInStore)
    const queryClient = useQueryClient();
    const router = useRouter()
    const auth = useSelector((state) => state.auth.value?.isAuth)
    const handleClick = () => {
        if (auth === false) {
            router.push('/login')
        }
    }
    const fetchProjects = async ({pageParam = 1}) => {
        try {
            const res = await GetAllTourApi(pageParam, dataSearch?.name, dataSearch?.start, dataSearch?.min, dataSearch?.max, dataSearch?.startDay, dataSearch?.endDay);
            return res
        } catch (error) {
            return 'failed'
        }
    }
    const {data, fetchNextPage, isFetchingNextPage, isLoading, isFetching} = useInfiniteQuery(
        ['All-Tour', userIdInStore],
        fetchProjects,
        {
            getNextPageParam: (data, pages) => {
                if (data?.length > 2) {
                    return pages.length + 1;
                } else {
                    return undefined
                }
            },
            suspense: true
        }
    );
    const totalPagesFetched = data?.pages.length ?? 0;
    const lastPostRef = useRef<HTMLElement>(null)
    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })
    useEffect(() => {
        queryClient.fetchInfiniteQuery(['All-Tour', userIdInStore])
    }, [dataSearch])
    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage()
    }, [entry])
    const _tour = data?.pages?.flatMap((page) => page)
    return (
        <>
            {isLoading ? (
                <div className={'flex justify-center h-full'}>
                    <CircularProgress color="secondary"/>
                </div>
            ) : (
                <div>
                    {_tour[0] !== "failed" ? <>
                        {_tour?.map((tour: TourDTO, i) => {
                            if (i === _tour.length - 1) return <div key={tour?.id} ref={ref}
                                                                    className={'flex justify-center'}>
                                <Card

                                    sx={{
                                        maxWidth:{xs:'100%',lg:'90%'},
                                        marginBottom: '48px',
                                        // height:'90vh'
                                    }}
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
                            </div>
                            return (
                                <div key={tour.id} className={'flex justify-center'}>
                                    <Card
                                        sx={{
                                            maxWidth:{xs:'100%',lg:'90%'},
                                            marginBottom: '48px',
                                            // height:'20px'
                                        }}
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
                                </div>
                            )
                        })
                        }
                    </>  : <div className={'text-center'}> Can not Found Tour </div>}
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage} // Disable if pages fetched >= 3
                    >
                        {isFetchingNextPage ? (
                            <div className="flex w-full h-full justify-center">
                            <CircularProgress color="secondary"/>
                            </div>
                        ) : (
                            (data?.pages.length ?? 0) < 3 ? '' : 'No More Data'
                        )}
                    </button>
                </div>
            )}
        </>
    );
})

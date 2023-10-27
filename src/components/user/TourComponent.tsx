'use client'

import * as React from 'react';

import {GetAllTourApi} from "@/util/api/apiReuqest";
import {TourDTO} from "@/types/tourDTO";
import Paragraph from "@/components/ui/Paragraph";
import EachTour from "@/components/user/EachTour";
import {Card, CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/api/cookies";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
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
    const isAuth = useSelector((state:RootState) => state.auth.value?.isAuth)
    const [userId, setUserId] = React.useState<string>(userIdInStore)
    const queryClient = useQueryClient();
    const [haha, setHaha] = React.useState<any>([])
    const router = useRouter()
    const auth = useSelector((state:RootState) => state.auth.value?.isAuth)
    const handleClick = () => {
        if (auth === false) {
            router.push('/login')
        }
    }
    // dataSearch?.name, dataSearch?.start, dataSearch?.min, dataSearch?.max, dataSearch?.startDay, dataSearch?.endDay
    const {data, fetchNextPage, isFetchingNextPage, isLoading, isFetching, isError, hasNextPage} = useInfiniteQuery(
        ['All-Tour', userIdInStore],
        async ({pageParam = 1}) => {
            try {
                const res = await GetAllTourApi(pageParam,dataSearch?.name, dataSearch?.start, dataSearch?.min, dataSearch?.max, dataSearch?.startDay, dataSearch?.endDay);
                // @ts-ignore
                if(res.includes('failed') || res.message){
                    setTimeout(async ()=>{
                        const res = await GetAllTourApi(pageParam, dataSearch?.name, dataSearch?.start, dataSearch?.min, dataSearch?.max, dataSearch?.startDay, dataSearch?.endDay);
                        return res
                    },2000)
                }
                return res
            } catch (error) {
                return 'failed'
            }
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                // return lastPage?.length > 2 ? allPages.length + 1 : undefined
                return allPages.length + 1
            },
        }
    );
    const lastPostRef = useRef<HTMLElement>(null)
    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })
    const resetPageParam = () => {
        queryClient.setQueryData(['All-Tour', userIdInStore], {
            pages: [],
            pageParams: [1], // Reset to page 1
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        resetPageParam()
        queryClient.prefetchInfiniteQuery(['All-Tour', userIdInStore])
    }, [dataSearch])
    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage()
    }, [entry])
    const _tour:any = data?.pages?.reduce((acc,page) => {
        // @ts-ignore
        return [...acc,...page]
    },[])
    return (
        <>
            {isLoading ? (
                <div className={'flex justify-center h-full'}>
                    <CircularProgress color="secondary"/>
                </div>
            ) : isError ? <div>Loading...</div> : (
                <div>
                    {!data?.pages?.includes("failed") ? <>
                        {_tour?.map((tour: TourDTO, i:number) => {
                            if (i === _tour.length - 1) return <div key={tour?.id} ref={ref}
                                                                    className={'flex justify-center'}>
                                <Card

                                    sx={{
                                        maxWidth: {xs: '100%', lg: '90%'},
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
                                        startAddress={tour.startAddress}
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
                                            maxWidth: {xs: '100%', lg: '90%'},
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
                                            startAddress={tour.startAddress}
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
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage} // Disable if pages fetched >= 3
                        >
                            {isFetchingNextPage ? (
                                <div className="flex w-full h-full justify-center">
                                    <CircularProgress color="secondary"/>
                                </div>
                            ) : (
                                (data?.pages.length ?? 0) < 4 ? 'loading...' : ''
                            )}
                        </button>
                    </> : <div className={'flex justify-center h-screen items-center'}>
                        <CircularProgress color="secondary"/>
                    </div>
                    }
                </div>
            )}
        </>
    );
})

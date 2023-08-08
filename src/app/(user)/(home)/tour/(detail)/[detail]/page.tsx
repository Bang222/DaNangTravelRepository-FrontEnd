'use client'

import {NextPage} from "next";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {getTourById, loginAPI} from "@/util/api/apiReuqest";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {TourDetailInterface, TourIdEndToken} from "@/types";
import {Card, CircularProgress} from "@mui/material";
import Slice from "@/components/ui/swiperSlice";
import Paragraph from "@/components/ui/Paragraph";
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import LineCustom from "@/components/ui/LineCustom";
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import LargeHeading from "@/components/ui/LargeHeading";


interface TourDetailProps {
    params: {
        detail: string
    }
}

//bang

const Page: NextPage<TourDetailProps> = ({params}) => {
    const tourId = params.detail
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [tourError, setTourError] = useState("");
    const [dataTour, setDataTour] = useState<TourDetailInterface>()
    const [infoDetail, setInfoDetail] = useState<boolean>()
    const [infoDescription, setInfoDetailDescription] = useState<boolean>()
    const [infoPolicy, setInfoPolicy] = useState<boolean>()
    const {mutate, isLoading, data} = useMutation(getTourById, {
        onSuccess: (data) => {
            return setDataTour(data)
        },
        onError: (error) => {
            setTourError(error.message);
        },
    });
    useEffect(() => {
        const data: TourIdEndToken = {
            tourId: tourId,
            token: accessToken,
        }
        mutate(data)
    }, [])
    const handleOnclickPolicy = () => {
        setInfoPolicy(true)
        if (infoPolicy === true) {
            setInfoDetail(false)
            setInfoDetailDescription(false)
        }

    }
    const handleOnclickDescription = () => {
        setInfoDetailDescription(true)
        if (infoDescription === true) {
            setInfoPolicy(false)
            setInfoDetail(false)
        }

    }
    const handleOnclickDetail = () => {
        setInfoDetail(true)
        if (infoDetail === true) {
            setInfoPolicy(false)
            setInfoDetailDescription(false)
        }
    }
    return (
        <>
            {isLoading ? <div className={'flex justify-center w-screen items-center z-100 h-screen bg-light'}>
                    <CircularProgress color="secondary"/>
                </div> :
                <div className={'container mx-auto px-auto'}>
                    <div className={'grid grid-cols-4 mt-[30px] pb-3'}>
                        <div className={'col-span-4 nh:col-span-3 w-full'}>
                            <Card
                                variant="outlined"
                                sx={{
                                    maxHeight: 'max-content',
                                    width: '100%',
                                    borderRadius: '10px',
                                    // mx: 'auto',
                                    overflow: 'auto',
                                    resize: 'none',
                                    paddingBottom: '12px'
                                }}
                            >
                                <section>
                                    <div className={'w-full pt-9 flex justify-center'}>
                                        <div className={'w-[95%]'}>
                                            <Slice previewImage={dataTour?.imageUrl}/>
                                        </div>
                                    </div>
                                </section>
                                <div className={'h-5'}></div>
                                <LineCustom size={'100%'}/>
                                <LargeHeading className={'m-4 font-medium'}><b>{dataTour?.name}</b></LargeHeading>
                                <div className={'m-4'}>
                                    <div className={'flex justify-around mb-7'}>
                                        <div>
                                        <Paragraph size="sx" className={'text-green-500 text-center'}>Start Address</Paragraph>
                                            <div className={'flex justify-center'}>
                                                <div className='w-[100%] hover:bg-gray-200 hover:cursor-pointer  border-solid border-2 border-green-500 flex justify-center py-1 rounded-[60%] '>
                                                    <WhereToVoteOutlinedIcon sx={{fontSize:'50px',color: 'green'}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'w-[50%] flex items-center justify-center font-bold mt-[45px] nh:mt-[1px]'}>
                                          <LineCustom size={'90%'}/>
                                        </div>
                                        <div>
                                            <Paragraph size="sx" className={'text-red-500 text-center'}>Ending Address</Paragraph>
                                            <div className={'flex justify-center'}>
                                                <div className='w-[95%] hover:bg-gray-200 hover:cursor-pointer border-solid border-2 border-red-500 flex justify-center py-1 rounded-[60%] '>
                                                    <TourOutlinedIcon sx={{fontSize:'55px',color: 'red'}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Paragraph>Price: <b>{dataTour?.price}/Per</b></Paragraph>
                                    <Paragraph>Address: <b>{dataTour?.address}</b></Paragraph>
                                    {/*<Paragraph>Day Start: <b>{formattedStartDate}</b> <Paragraph>*/}
                                    {/*    Total: <b>{differenceInDays}Days {differenceInDays - 1}Night</b></Paragraph></Paragraph>*/}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Page;
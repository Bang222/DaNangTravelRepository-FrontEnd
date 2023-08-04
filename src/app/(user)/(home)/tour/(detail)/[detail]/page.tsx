'use client'

import {NextPage} from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import LineCustom from "@/components/ui/LineCustom";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {getTourById, loginAPI} from "@/util/api/apiReuqest";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {TourDetailInterface, TourIdEndToken} from "@/types";
import {CircularProgress} from "@mui/material";
import Slice from "@/components/ui/swiperSlice";
import Paragraph from "@/components/ui/Paragraph";

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
        if(infoPolicy=== true){
            setInfoDetail(false)
            setInfoDetailDescription(false)
        }

    }
    const handleOnclickDescription= () => {
        setInfoDetailDescription(true)
        if(infoDescription=== true){
            setInfoPolicy(false)
            setInfoDetail(false)
        }

    }
    const handleOnclickDetail = () => {
        setInfoDetail(true)
        if(infoDetail=== true){
            setInfoPolicy(false)
            setInfoDetailDescription(false)
        }
    }
    const Detail = (
        <div>
            <Paragraph>{dataTour?.price}</Paragraph>
        </div>
    )
    const Description = (
        <div>
            <Paragraph>{dataTour?.description}</Paragraph>
        </div>
    )
    const Policy = (
        <div>
            <Paragraph>{dataTour?.quantity}</Paragraph>
        </div>
    )
    return (
        <>
            {isLoading ? <div className={'flex justify-center w-screen items-center z-100 h-screen bg-light'}>
                    <CircularProgress color="secondary"/>
                </div> :
                <>
                    <header className={'overflow-hidden'}>
                        <section
                            className={'w-screen h-[300px] nh:h-screen relative bg-contain bg-no-repeat nh:bg-cover '}
                            style={{
                                // ${dataTour?.imageUrl[0]}
                                backgroundImage: `url("https://media.hahalolo.com/2023/07/20/04/33/f421f47d1ca2ac4ce38f3942d291ae8a-1689827598.jpg")`,
                            }}>
                        </section>
                    </header>
                    <section className={'container mx-auto px-auto nh:my-[2rem]'}>
                        <div className={'text-center mb-4'}>
                            <LargeHeading size={'md'}>
                               {dataTour?.name}
                            </LargeHeading>
                        </div>
                        <LineCustom size={'80%'}/>
                        <div className={'w-full pt-9 flex justify-center'}>
                            <div className={'w-4/6'}>
                                <Slice previewImage={dataTour?.imageUrl}/>
                            </div>
                        </div>
                        <div className={'h-5'}>
                        </div>
                        <div className={'m-4'}>
                        </div>
                        <LineCustom size={'80%'}/>
                        <div className={'flex justify-center text-white my-4'}>
                            <Paragraph className={'px-1 mr-2 bg-zinc-500 hover:bg-black rounded-md'}
                                       onClick={handleOnclickDescription}
                            >Description</Paragraph>
                            <Paragraph className={'px-1 mr-2 bg-zinc-500 hover:bg-black rounded-md'}
                                       onClick={handleOnclickDetail}
                            >Detail</Paragraph>
                            <Paragraph className={'px-1 mr-2 bg-zinc-500 hover:bg-black rounded-md'}
                                       onClick={handleOnclickPolicy}
                            >Policy</Paragraph>
                        </div>
                        {infoDetail ===true ? Detail :null}
                        {infoDescription ===true? Description:null}
                        {infoPolicy ===true ? Policy :null}
                    </section>
                </>
            }
        </>
    );
}
export default Page;
'use client'

import {NextPage} from "next";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {createAxios, getTourById, loginAPI} from "@/util/api/apiReuqest";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TourDetailInterface, TourIdEndToken} from "@/types";
import {Card, CircularProgress, Typography} from "@mui/material";
import Slice from "@/components/ui/swiperSlice";
import Paragraph from "@/components/ui/Paragraph";
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import LineCustom from "@/components/ui/LineCustom";
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import LargeHeading from "@/components/ui/LargeHeading";
import AccompaniedService from "@/components/ui/AccompaniedService";
import FavoriteIcon from '@mui/icons-material/Favorite';

import {Tabs} from '@mui/base/Tabs';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {buttonClasses} from '@mui/base/Button';
import {Tab, tabClasses} from '@mui/base/Tab';
import {styled} from "@mui/system";
import Link from "next/link";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {AppDispatch} from "@/redux/store";


interface TourDetailProps {
    params: {
        detail: string
    }
}

//bang

const Page: NextPage<TourDetailProps> = ({params}) => {
    const tourId = params?.detail

    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [tourError, setTourError] = useState("");
    const [dataTour, setDataTour] = useState<TourDetailInterface>()

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const {mutate, isLoading, data} = useMutation( async(TourIdAndToken: TourIdEndToken)=>{
        const res = await getTourById(TourIdAndToken,axiosJWT)
        return res
    }, {
        onSuccess: (data) => {
            return setDataTour(data)
        },
        onError: (error) => {
            setTourError(error.message);
        },
    });

    useEffect(() => {
        document.title = `Tour Detail`
    }, [])

    useEffect(() => {
        const data: TourIdEndToken= {
            tourId: tourId,
            token: accessToken,
        }
        mutate(data)
    }, [])
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const startDate: Date = new Date(dataTour?.startDate);
    const endDate: Date = new Date(dataTour?.endDate);
    const formattedStartDate = startDate.toLocaleDateString('es-uk', options);
    const formattedEndDate = endDate.toLocaleDateString('es-uk', options);
    return (
        <>
            {isLoading ? <div className={'flex justify-center w-screen items-center z-100 h-screen bg-light'}>
                    <CircularProgress color="secondary"/>
                </div> :
                <div className={'container mx-auto px-auto'}>
                    <div className={'grid grid-cols-4 gap-4 mt-[30px] pb-3'}>
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
                                            <Paragraph size="sx" className={'text-green-500 text-center'}>Start
                                                Address</Paragraph>
                                            <div className={'flex justify-center'}>
                                                <div
                                                    className='hover:bg-gray-200 hover:cursor-pointer  border-solid border-2 border-green-500 flex justify-center py-1 rounded-full items-center '
                                                    style={{width: '70px', height: '70px'}}>
                                                    <WhereToVoteOutlinedIcon sx={{fontSize: '50px', color: 'green'}}/>
                                                </div>
                                            </div>
                                            <Paragraph size="sx"
                                                       className={'text-green-500 mt-2 text-center'}>{dataTour?.startAddress}</Paragraph>
                                        </div>
                                        <div className={'w-[50%] flex items-center justify-center font-bold'}>
                                            <LineCustom size={'90%'}/>
                                        </div>
                                        <div>
                                            <Paragraph size="sx" className={'text-red-500 text-center'}>Ending
                                                Address</Paragraph>
                                            <div className={'flex justify-center'}>
                                                <div
                                                    className='w-[95%] hover:bg-gray-200 hover:cursor-pointer border-solid border-2 border-red-500 flex justify-center py-1 rounded-full items-center '
                                                    style={{width: '70px', height: '70px'}}>
                                                    <TourOutlinedIcon sx={{fontSize: '55px', color: 'red'}}/>
                                                </div>
                                            </div>
                                            <Paragraph size="sx"
                                                       className={'text-red-500 mt-2 text-center'}>{dataTour?.endingAddress}</Paragraph>
                                        </div>
                                    </div>
                                    <div className={'grid-cols-2 grid gap-4'}>
                                        <div className={'col-span-1'}>
                                            <Paragraph>Price<b>: {(dataTour?.price)?.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</b>/Per</Paragraph>
                                            <Paragraph> Start Day<b>: {formattedStartDate}</b></Paragraph>
                                        </div>
                                        <div>
                                            <Paragraph>Address<b>: {dataTour?.address}</b></Paragraph>
                                            <Paragraph> End Day<b>: {formattedEndDate}</b></Paragraph>
                                        </div>
                                    </div>
                                    <div className="h-5"></div>
                                    <LineCustom size={'90%'}/>
                                    <section className={'mt-4'}>
                                        <Typography sx={{fontSize: '24px', fontWeight: 'bold'}} level="title-lg">
                                            Tour Service
                                        </Typography>
                                        <div className={'ml-4'}>
                                            <AccompaniedService color={'black'}/>
                                        </div>
                                    </section>
                                    <LineCustom size={'100%'}/>
                                    <div className={'my-2'}>
                                        <Paragraph>{dataTour?.description}</Paragraph>
                                    </div>
                                    <LineCustom size={'100%'}/>
                                    <section className={'mt-8'}>
                                        <StyledTabs defaultValue={0} orientation="vertical">
                                            <StyledTabsList>
                                                {dataTour?.schedules.map((item, index) => {
                                                    return (
                                                        <StyledTab key={item.id}>Day {index + 1}</StyledTab>
                                                    )
                                                })}
                                            </StyledTabsList>
                                            {dataTour?.schedules.map((item, index) => {
                                                return (
                                                    <StyledTabPanel key={item.id} value={index}>
                                                        <Paragraph className={'font-bold lg:text-center w-full'}
                                                                   style={{fontSize: '25px'}}>
                                                            {item.title}
                                                        </Paragraph>
                                                        {item.description}
                                                    </StyledTabPanel>
                                                )
                                            })}
                                        </StyledTabs>
                                    </section>
                                    <div className="h-4">
                                    </div>
                                    <LineCustom size={'100%'}/>
                                    <div className="h-4">
                                    </div>
                                    <div className={'flex justify-end lg:mr-5'}>
                                        <Link className={'w-[40%]'} href={`/booking/${tourId}`}>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-full">
                                                Booking
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className={'col-span-4 nh:col-span-1'}>
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
                                <section className={'m-3'}>
                                    <div className={'w-fit mb-3'}>
                                        <Paragraph size={'md'}
                                                   className={'font-bold mb-2'}>{dataTour?.store.name}</Paragraph>
                                        <LineCustom size={'100%'}/>
                                    </div>
                                    <div className={'flex items-center'}>
                                        <div
                                            className={'bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center rounded-full'}
                                            style={{width: '40px', height: '40px'}}>
                                            <FavoriteIcon sx={{color: 'red'}}/>
                                        </div>
                                        <Paragraph className={'ml-4'}>Have <b>{dataTour?.upVote.length - 1} Love</b> this
                                            tour</Paragraph>
                                    </div>
                                    <div className={'flex items-center my-2'}>
                                        <div
                                            className={'bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center rounded-full'}
                                            style={{width: '40px', height: '40px'}}>
                                            <MessageOutlinedIcon sx={{color: 'white'}}/>
                                        </div>
                                        <Paragraph
                                            className={'ml-4'}>Have <b>{dataTour?.comments.length} comments</b> this
                                            tour</Paragraph>
                                    </div>
                                </section>
                            </Card>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #000;
    outline: 3px solid ${blue[200]};
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const StyledTabsList = styled(TabsList)(
    ({theme}) => `
  min-width: 80px;
  height: fit-content;
  background-color: #ccc};
  border-radius: 12px;
  // margin-bottom: 16px;
  // display: flex;
  padding: 6px;
  gap: 12px;
  // flex-direction: column;
  justify-content: center;
  // align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
export default Page;

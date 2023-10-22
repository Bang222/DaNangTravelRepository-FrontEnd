import {FC, useEffect, useMemo, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Paragraph from "@/components/ui/Paragraph";
import CardActions from "@mui/material/CardActions";
import {CircularProgress, Tooltip} from "@mui/material";
import ModalCommentOfTour from "@/components/user/modal/ModalCommentOfTour";
import * as React from "react";
import {CommentTourDTO, TourDTO} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addToCartAPI, bookingAPI, createAxios, upVoteTourApi} from "@/util/api/apiReuqest";
import {useDispatch, useSelector} from "react-redux";
import Slice from "@/components/ui/swiperSlice";
import Link from "next/link";
import LineCustom from "@/components/ui/LineCustom";
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import {toast} from "react-toastify";
import {AppDispatch} from "@/redux/store";


interface TourDetailProps {
    id: string
    comments: CommentTourDTO[]
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
        imgUrl: string;
    }
    name: string;
    imageUrl: string[];
    price: number;
    address: string;
    userId: string;
    upVote: string[]
    createdAt: Date;
    endDate: Date;
    startDate: Date;
}
//tour Component
const EachTour: FC<TourDetailProps> = ({...tour}) => {
    const [isLoadingOfCart, setLoadingOfCart] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const token = useSelector<any>((state) => state.auth.value?.token)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)

    const user = useSelector((state) => state.auth.value?.user)
    const [err, setErr] = React.useState<string>('')
    const [commentData, setCommentData] = useState<CommentTourDTO[] | undefined>()
    const [upvote, setUpvote] = useState<number>(tour?.upVote?.length)
    const [previewImage, setPreviewImage] = useState<string[] | undefined>(tour?.imageUrl)

    const queryClient = useQueryClient();
    const {mutate, data} = useMutation(
        async (tourId: string) => {
            try {
                const res = upVoteTourApi(tourId, accessToken,axiosJWT,userId)
                return res
            } catch (e) {
                throw e
            }
        }, {
            onSuccess: (data) => {
                setUpvote(upvote + data.total)
            },
            onError: (error) => {
                if(error?.response?.data?.status === 429) {
                    toast.warn("Please Don\'t spam wait after 60s", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                setErr(error.message);
            },
        });
    const {mutate: mutateCart, data: dataCart} = useMutation(
        async (tourId: string) => {
            try {
                const res = await addToCartAPI(tourId, accessToken, user.id, axiosJWT)
                return res;
            } catch (error) {
                throw error;
            }
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart', userId]);
                toast.success('Added to cart', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    },
                )
            },
            onError: (error) => {
                toast.warn('Can not Add',error)
            },
        });
    const handleAddToCart = (tourId: string) => {
        mutateCart(tourId)
    }
    const iconStyle: { color: string; "&:hover": { transform: string; color: string }; transition: string } = {
        color: '#ccc',
        transition: 'color 0.3s, transform 0.3s',
        '&:hover': {
            color: 'blue',
            transform: 'rotate(360deg)',
        },
    };
    useEffect(() => {
        setUpvote(tour.upVote.length)
    }, [tour.upVote.length])
    const handleClickUpvote = (tourId: string) => {
        mutate(tourId)
    }
    useEffect(() => {
        setCommentData(tour.comments)
    }, [tour.comments])

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const startDate: Date = new Date(tour.startDate);
    const endDate: Date = new Date(tour.endDate)
    const createdAt: Date = new Date(tour.createdAt);
    const formattedStartDate = startDate.toLocaleDateString('es-uk', options);
    const formatCreateAt = createdAt.toLocaleDateString('es-uk', options);
    const formatPrice = tour.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar src={tour.store.imgUrl} alt={'store'} sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <PublicSharpIcon sx={iconStyle}/>
                    </IconButton>
                }
                title={tour.store.name}
                subheader={formatCreateAt}
            />
            <CardContent sx ={{padding:'0'}}>
                <section className={'mb-4'}>
                    <Slice previewImage={previewImage}/>
                </section>
            </CardContent>
            <CardContent sx ={{paddingY:'0',paddingX:'12px'}}>
                <Paragraph size={'sm'}>Name: <b className={'text-[8px] sm:text-[12px]'}>{tour.name}</b></Paragraph>
                <div className={'grid grid-flow-col justify-stretch'}>
                    <div>
                        <Paragraph size={'sm'}>Price: <b className={'text-[8px] sm:text-[12px]'}>{formatPrice}/<b
                            className={'text-[8px] lg:text-[12px]'}>Adult</b></b></Paragraph>
                        <Paragraph size={'sm'}>Address: <b className={'text-[8px] sm:text-[12px]'}>{tour.address}</b></Paragraph>
                        <Paragraph size={'sm'}>Day Start: <b className={'text-[8px] sm:text-[12px]'}>{formattedStartDate}</b>
                            <Paragraph size={'sm'}>
                                Total: <b>{differenceInDays}</b> <span
                                className={'text-[10px] lg:text-[12px]'}>Days</span> <b>{differenceInDays - 1} </b>
                                <span className={'text-[10px] lg:text-[12px]'}>Night</span></Paragraph></Paragraph>
                    </div>
                    <div className={'grid lg:flex items-end justify-around pb-[10px]'}>
                        <button
                            className={'bg-blue-500 px-2 py-0.5 hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 rounded-full lg:w-[100px]'}>
                            <Link className={'text-[12px] md:text-[16px]'}
                                  href={{pathname: `/tour/${tour.id}`}}>Detail</Link>
                        </button>
                        <button
                            className={'bg-blue-500 py-0.5 px-2 w-fit hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 rounded-full'}>
                            <Link href={`/booking/${tour.id}`} className={'text-[12px] md:text-[16px]'}>Booking</Link>
                        </button>
                    </div>
                </div>
            </CardContent>
            <div className={'w-full flex justify-center'}>
                <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
            </div>
            <CardActions sx={{width: '100%', display: 'flex',paddingY:'0', justifyContent: 'space-between'}}>
                <div className={'flex items-center'}>
                    {(data?.status ? data?.status.includes(tour.userId) :
                        tour?.upVote.includes(tour.userId))
                        ?
                        <Tooltip title="like" placement="top" sx={{color: 'black'}}>
                            <IconButton aria-label="add to favorites" sx={{color: 'red'}}
                                        onClick={() => handleClickUpvote(tour.id)}
                            >
                                <FavoriteIcon/>
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="like" placement="top" sx={{color: 'black'}}>
                            <IconButton aria-label="add to favorites" sx={{color: 'black'}}
                                        onClick={() => handleClickUpvote(tour.id)}>
                                <FavoriteIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Typography>{upvote - 1}</Typography>
                    <Typography>
                        <Tooltip title="comment" placement="top" sx={{color: 'black'}}>
                            <ModalCommentOfTour
                                id={tour.id}
                                name={tour.name}
                                comments={Number(tour.comments?.length)}
                                store={tour.store}
                                createdAt={tour.createdAt}
                                imageUrl={tour.imageUrl}
                                commentData={commentData}
                                setCommentData={setCommentData}
                            />
                        </Tooltip>
                    </Typography>
                    <Typography>{!tour.comments?.length ? commentData?.length : tour.comments?.length}</Typography>
                </div>
                <div className={'mr-3 nh:mr-5 cursor-pointer'}>
                    {isLoadingOfCart ? (
                        <div className={''}>
                            <CircularProgress color="secondary" size={16}/>
                        </div>
                    ) : <Tooltip title="Add To Cart" placement="bottom"
                                 sx={{color: 'black', '&:hover': {color: 'blue'}}}>
                        <AddShoppingCartIcon onClick={() => {
                            setLoadingOfCart(true);

                            setTimeout(() => {
                                handleAddToCart(tour.id);
                                setLoadingOfCart(false);
                            }, 1000);
                        }}/>
                    </Tooltip>}

                </div>
            </CardActions>
            <LineCustom size={'90%'}/>
        </>
    );
}

export default EachTour;

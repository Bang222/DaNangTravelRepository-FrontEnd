'use client'
import * as React from 'react';
import {NextPage} from "next";

import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Unstable_Grid2';
import {Box, color} from "@mui/system";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GroupsIcon from '@mui/icons-material/Groups';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TourIcon from '@mui/icons-material/Tour';
import InfoIcon from '@mui/icons-material/Info';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import {CircularProgress, Container, FormControlLabel, Input, Radio, RadioGroup} from "@mui/material";
import Link from "next/link";
import InputCustom from "@/components/ui/InputCustom";
import Label from "@/components/ui/Label";
import Paragraph from "@/components/ui/Paragraph";
import {useRouter} from "next/navigation";
import LineCustom from "@/components/ui/LineCustom";
import './styleBooking.css';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {bookingAPI, createAxios, getTourById, RegisterApi} from "@/util/api/apiReuqest";
import {useEffect, useState} from "react";
import {BookingDTO, TourDetailInterface, TourIdEndToken} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import AccompaniedService from "@/components/ui/AccompaniedService";
import LargeHeading from "@/components/ui/LargeHeading";
import {toast} from "react-toastify";
import PaymentButton from "@/components/user/PaymentButton";
import {AppDispatch} from "@/redux/store";
import LoadingComponent from "@/components/LoadingComponent";
import {notFound} from 'next/navigation';


interface BookingProps {
    params: {
        booking: string
    }
}

interface Passenger {
    name: string
    dayOfBirth: number
    type: string
    sex: string
}

const Booking: NextPage<BookingProps> = ({params}) => {
    const tourId = params.booking
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [openModal, setOpenModal] = React.useState(false);
    const user = useSelector((state) => state.auth.value?.user)

    const [tourError, setTourError] = useState("");
    const [dataTour, setDataTour] = useState<TourDetailInterface>()
    const [dataBooking, setDataBooking] = React.useState<any>()
    const [errorBooking, setErrorDataBooking] = React.useState<string>(null)
    const [errorBookingBaking, setErrorDataBaking] = React.useState<string>(null)
    const [Payment, setPayment] = React.useState<boolean>(false)

    const [adultCount, setAdultCount] = React.useState<number>(1)
    const [childCount, setChildCount] = React.useState<number>(0)
    const [toddlerCount, setToddlerCount] = React.useState<number>(0)
    const [infantCount, setInfantCount] = React.useState<number>(0)

    const [email, setEmail] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [fullName, setFullName] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [passengerError, setPassengerError] = React.useState<string>('')

    const [adults, setAdults] = React.useState<Passenger[]>([{name: "", sex: "", dayOfBirth: Number(''), type: ""}])
    const [children, setChildren] = React.useState<Passenger[]>([])
    const [toddlers, setToddlers] = React.useState<Passenger[]>([])
    const [infants, setInfants] = React.useState<Passenger[]>([])
    const router = useRouter()
    const query = useQueryClient()

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)
    const {mutate: mutateBooking, isLoading: isLoadingBooking, data: dataBookingTour, status, isSuccess} = useMutation(
        async () => {
            try {
                const res = await bookingAPI(dataBooking, accessToken, userId, tourId, axiosJWT)
                return res;
            } catch (error) {
                throw error;
            }
        }, {
            onSuccess: (dataBookingTour) => {
                if (dataBookingTour.message) return toast.error(dataBookingTour.message)
                query.invalidateQueries(['TourOfStore', userId]);
                setErrorDataBooking('')
            },
            onError: (error) => {
                setErrorDataBooking('Not Enough Slot')
                toast.error("Sorry, Tour it's full slot")
            },
        });
    const {mutate, isLoading, data,} = useMutation(async (dataGet: TourIdEndToken) => {
        try {
            const res = await getTourById(dataGet, axiosJWT)
            return res
        } catch (e) {
            throw new Error(e)
        }
    }, {
        onSuccess: (data) => {
            if (data.message) {
                router.push('/not-found')
            }
            return setDataTour(data)
        },
        onError: (error) => {
            router.push('/not-found')
        },
    });
    const handleClick = () => {
        if (!(email && firstName && fullName && address && phone).trim()) {
            return setErrorMessage('Can not null information');
        }
        setErrorMessage('')
        const validatedDataOfAdult = adults.map(item => {
            const newItem = {...item};
            if (!newItem.name) {
                return false;
            }

            if (!newItem.dayOfBirth || newItem.dayOfBirth <= 0) {
                return false;
            }
            if (!newItem.name) {
                return false;
            }

            if (!newItem.sex) {
                return false;
            }
            if (!newItem.type) {
                return false;
            }
            return newItem;
        });
        const validatedDataOfChild = children?.map(child => {
            const childData = {...child};
            if (!childData.name) {
                return false;
            }

            if (!childData.dayOfBirth || childData.dayOfBirth <= 0) {
                return false;
            }
            if (!childData.name) {
                return false;
            }

            if (!childData.sex) {
                return false;
            }
            if (!childData.type) {
                return false;
            }
            return childData;
        });
        const validatedDataOfToddlers = toddlers?.map(toddler => {
            const toddlerData = {...toddler};
            if (!toddlerData?.name) {
                return false;
            }

            if (!toddlerData?.dayOfBirth || toddlerData?.dayOfBirth <= 0) {
                return false;
            }
            if (!toddlerData?.name) {
                return false;
            }

            if (!toddlerData?.sex) {
                return false;
            }
            if (!toddlerData?.type) {
                return false;
            }
            return toddlerData;
        });
        const validatedDataOfInfants = infants?.map(infant => {
            const infantData = {...infant};
            if (!infantData?.name) {
                return false;
            }

            if (!infantData?.dayOfBirth || infantData?.dayOfBirth <= 0) {
                return false;
            }
            if (!infantData?.name) {
                return false;
            }

            if (!infantData?.sex) {
                return false;
            }
            if (!infantData?.type) {
                return false;
            }
            return infantData;
        });
        if (validatedDataOfAdult.includes(false) || validatedDataOfChild?.includes(false)
            || validatedDataOfToddlers.includes(false) || validatedDataOfInfants.includes(false)) {
            setErrorMessage('')
            setPassengerError('Input Data');
            return false;
        }
        setPassengerError('');
        const passenger = [...children, ...adults, ...toddlers, ...infants]
        const configData = {
            email: email,
            address: address,
            fullName: fullName,
            firstName: firstName,
            phone: phone,
            toddlerPassengers: infantCount,
            infantPassengers: toddlerCount,
            childPassengers: childCount,
            adultPassengers: adultCount,
            passenger: passenger,
        }
        setPayment(true)
        setDataBooking(configData)
    }
    const handleClickCount = (action: 'increase' | 'decrease', type: 'adultCount' | 'childCount' | 'toddlerCount' | 'infantCount') => {
        const validateQuantityTour = childCount + adultCount + infantCount + toddlerCount;
        const quantityTourAvailable:number  = Number(data?.baseQuantity) - Number(data?.quantity)
        if (type === 'infantCount') {
            if (action === 'increase' ) {
                validateQuantityTour >= quantityTourAvailable ? toast.warn("Not Enough") :setInfantCount(infantCount + 1);
            } else if (action === 'decrease' && infantCount > 0) {
                setInfantCount(infantCount - 1);
                infants.pop()
            }
        }
        if (type === 'adultCount') {
            if (action === 'increase') {
                validateQuantityTour >= quantityTourAvailable ? toast.warn("Not Enough") :setAdultCount(adultCount + 1);
            } else if (action === 'decrease' && adultCount > 1) {
                setAdultCount(adultCount - 1);
                adults.pop()
            }
        }
        if (type === 'toddlerCount') {
            if (action === 'increase') {
                validateQuantityTour >= quantityTourAvailable ? toast.warn("Not Enough") :setToddlerCount(toddlerCount + 1);
            } else if (action === 'decrease' && toddlerCount > 0) {
                setToddlerCount(toddlerCount - 1);
                toddlers.pop()
            }
        }
        if (type === 'childCount') {
            if (action === 'increase') {
                validateQuantityTour >= quantityTourAvailable ? toast.warn("Not Enough") :setChildCount(childCount + 1);
            } else if (action === 'decrease' && childCount > 0) {
                setChildCount(childCount - 1);
                children.pop()
            }
        }
    };
    const handleInformationChange = (type: 'adult' | 'child' | 'toddler' | 'infants', index: number, field: string, value: string) => {
        if (type === 'adult') {
            setAdults(prevAdults => {
                const updatedAdults = [...prevAdults];
                if (updatedAdults[index]) {
                    updatedAdults[index][field] = value;
                    updatedAdults[index]["type"] = 'Adult';

                } else {
                    const newAdult = {
                        name: field === 'name' ? value : '',
                        sex: field === 'sex' ? value : '',
                        dayOfBirth: field === 'dayOfBirth' ? value : 0,
                        type: 'Adult'
                    };
                    if (!(newAdult.dayOfBirth && !newAdult.name && !newAdult.type && !newAdult.sex && Number(newAdult.dayOfBirth)) === 0) {
                        setPassengerError('Can not null')
                    }
                    updatedAdults.push(newAdult as Passenger)
                }
                return updatedAdults;
            });
        }
        if (type === 'child') {
            setChildren(prevChild => {
                const updatedChild = [...prevChild];
                if (updatedChild[index]) {
                    updatedChild[index][field] = value;
                    updatedChild[index]["type"] = 'Child';

                } else {
                    const newChild = {
                        name: field === 'name' ? value : '',
                        sex: field === 'sex' ? value : '',
                        dayOfBirth: field === 'dayOfBirth' ? value  : 0,
                        type: 'Child'
                    };
                    // @ts-ignore
                    if (!(newChild.dayOfBirth && !newChild.name && !newChild.type && !newChild.sex && Number(newChild.dayOfBirth)) === 0) {
                        setPassengerError('Can not null')
                    }
                    updatedChild.push(newChild as Passenger)
                }
                return updatedChild;
            });
        }
        if (type === 'toddler') {
            setToddlers(prevToddler => {
                const updatedToddler = [...prevToddler];
                if (updatedToddler[index]) {
                    // @ts-ignore
                    updatedToddler[index][field] = value;
                    updatedToddler[index]["type"] = 'Toddler';

                } else {
                    const newToddler = {
                        name: field === 'name' ? value : '',
                        sex: field === 'sex' ? value : '',
                        dayOfBirth: field === 'dayOfBirth' ? value : 0,
                        type: 'Toddler'
                    };
                    // @ts-ignore
                    if (!(newToddler.dayOfBirth && !newToddler.name && !newToddler.type && !newToddler.sex && Number(newToddler.dayOfBirth)) === 0) {
                        setPassengerError('Can not null')
                    }
                    updatedToddler.push(newToddler as Passenger)
                }
                return updatedToddler;
            });
        }
        if (type === 'infants') {
            setInfants(prevInfant => {
                const updatedInfant = [...prevInfant];
                if (updatedInfant[index]) {
                    // @ts-ignore
                    updatedInfant[index][field] = value;
                    updatedInfant[index]["type"] = 'Infant';

                } else {
                    const newInfant = {
                        name: field === 'name' ? value : '',
                        sex: field === 'sex' ? value : '',
                        dayOfBirth: field === 'dayOfBirth' ? value : 0,
                        type: 'Infant'
                    };
                    // @ts-ignore
                    if (!(newInfant.dayOfBirth && !newInfant.name && !newInfant.type && !newInfant.sex && Number(newInfant.dayOfBirth)) === 0) {
                        setPassengerError('Can not null')
                    }
                    updatedInfant.push(newInfant as Passenger)
                }
                return updatedInfant;
            });
        }
    };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const startDate = new Date(dataTour?.startDate);
    const endDate = new Date(dataTour?.endDate)
    const createdAt = new Date(dataTour?.createdAt);
    const formattedStartDate = startDate.toLocaleDateString('es-uk', options);
    const formatEnd = endDate.toLocaleDateString('es-uk', options);
    // @ts-ignore
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const inputNumber = parseInt(String(dataTour?.price), 10);
    const formatPrice = inputNumber.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})

    const InputAdultPrice = dataTour?.price * adultCount
    const InputChildPrice = dataTour?.price * childCount
    const InputToddlerPrice = dataTour?.price * toddlerCount * 0.7
    const InputInfantPrice = dataTour?.price * infantCount * 0.15
    const InputTotalPrice = InputAdultPrice + InputChildPrice + InputToddlerPrice + InputInfantPrice

    const adultPrice = InputAdultPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const childPrice = InputChildPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const toddlerPrice = InputToddlerPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const infantPrice = InputInfantPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const totalPrice = InputTotalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})


    useEffect(() => {
        document.title = `Booking`
    }, [])

    useEffect(() => {
        const data: TourIdEndToken = {
            tourId: tourId,
            token: accessToken,
        }
        mutate(data)
    }, [accessToken, mutate, tourId])
    useEffect(() => {
            if (!dataBookingTour?.message && isSuccess) {
                setAdults([{name: "", sex: "", dayOfBirth: Number(''), type: ""}])
                setChildren([])
                setToddlers([])
                setInfants([])
                setAdultCount(1)
                setToddlerCount(0)
                setChildCount(0)
                setInfantCount(0)
                setFirstName('')
                setEmail('')
                setPhone('')
                setAddress('')
                setFullName('')
                setPassengerError('')
                router.push('/thank')
            }
        }
        , [isSuccess])
    return isLoading ? <LoadingComponent/> : (
        <>
            <Box sx={{paddingY: '48px', fontFamily: 'font-poppins'}}>
                <Container fixed>
                    <div
                        className={'pl-1 mb-3 w-fit text-blue-700 hover:underline'}>
                        <Link href={'/tour'}>Back</Link>
                    </div>
                    <Typography sx={{fontSize: '30px', fontWeight: 'bold', marginBottom: '12px'}}
                                startDecorator={<InfoOutlined/>}>
                        Booking Tour
                    </Typography>
                    <Grid container spacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        <Grid xs={12} lg={8}>
                            <Grid sx={{marginY: '8px'}} xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        maxHeight: 'max-content',
                                        maxWidth: '100%',
                                        mx: 'auto',
                                        // to make the demo resizable
                                        overflow: 'auto',
                                        resize: 'none',
                                    }}
                                >
                                    <Typography level="title-lg" startDecorator={<ContactsIcon/>}>
                                        Contact Info
                                    </Typography>
                                    <Divider inset="none"/>
                                    <CardContent
                                        sx={{
                                            display: 'grid',
                                            // gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                            gap: 1.5,
                                        }}
                                    >
                                        {Payment ? <>
                                                <FormControl>
                                                    <Label>Email</Label>
                                                    <InputCustom
                                                        name={'Email'}
                                                        id={email}
                                                        data={email}
                                                        value={email}
                                                        type={'text'}
                                                        setData={setEmail}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>First Name</Label>
                                                    <InputCustom
                                                        name={'First Name'}
                                                        id={firstName}
                                                        data={firstName}
                                                        value={firstName}
                                                        type={'text'}
                                                        setData={setFirstName}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Full Name</Label>
                                                    <InputCustom
                                                        name={'Full Name'}
                                                        id={fullName}
                                                        data={fullName}
                                                        value={fullName}
                                                        type={'text'}
                                                        setData={setFullName}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Address</Label>
                                                    <InputCustom
                                                        name={'Address'}
                                                        id={address}
                                                        data={address}
                                                        value={address}
                                                        type={'text'}
                                                        setData={setAddress}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Phone</Label>
                                                    <InputCustom
                                                        name={'Phone'}
                                                        id={phone}
                                                        data={phone}
                                                        value={phone}
                                                        type={'text'}
                                                        setData={setPhone}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                            </>
                                            :
                                            <>
                                                <FormControl>
                                                    <Label>Email</Label>
                                                    <InputCustom
                                                        name={'Email'}
                                                        id={email}
                                                        data={email}
                                                        value={email}
                                                        type={'text'}
                                                        setData={setEmail}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>First Name</Label>
                                                    <InputCustom
                                                        name={'First Name'}
                                                        id={firstName}
                                                        data={firstName}
                                                        value={firstName}
                                                        type={'text'}
                                                        setData={setFirstName}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Full Name</Label>
                                                    <InputCustom
                                                        name={'Full Name'}
                                                        id={fullName}
                                                        data={fullName}
                                                        value={fullName}
                                                        type={'text'}
                                                        setData={setFullName}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Address</Label>
                                                    <InputCustom
                                                        name={'Address'}
                                                        id={address}
                                                        data={address}
                                                        value={address}
                                                        type={'text'}
                                                        setData={setAddress}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Label>Phone</Label>
                                                    <InputCustom
                                                        name={'Phone'}
                                                        id={phone}
                                                        data={phone}
                                                        value={phone}
                                                        type={'text'}
                                                        setData={setPhone}
                                                    />
                                                </FormControl>
                                            </>
                                        }

                                    </CardContent>
                                    {errorMessage ? <Paragraph
                                        className={'text-red-600 font-bold pt-4'}>{errorMessage}</Paragraph> : ''}
                                </Card>
                            </Grid>
                            <Grid sx={{marginY: '8px'}} xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        maxHeight: 'max-content',
                                        maxWidth: '100%',
                                        mx: 'auto',
                                        // to make the demo resizable
                                        overflow: 'auto',
                                        resize: 'none',
                                    }}
                                >
                                    <Typography level="title-lg" startDecorator={<GroupsIcon/>}>
                                        Number of passengers
                                    </Typography>
                                    <Divider inset="none"/>
                                    <CardContent>
                                        {!Payment ?
                                            <FormControl>
                                                <div className={'nh:flex nh:w-full'}>
                                                    <Grid container rowSpacing={1}
                                                          columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Adult <span
                                                                className={'opacity-50 text-[12px]'}>(more than 18 Age)</span></Label>
                                                            <div className={'flex'}>
                                                                <button className={'w-fit pl-2'}
                                                                        onClick={() => handleClickCount('decrease', 'adultCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                    data={adultCount}
                                                                    value={adultCount}
                                                                    id={adultCount}
                                                                    name={'number'}
                                                                    type={'number'}
                                                                    sx={{outline: 'none'}}
                                                                />
                                                                <button className={'w-fit pr-2'}
                                                                        onClick={() => handleClickCount('increase', 'adultCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Child<span
                                                                className={'opacity-50 text-[12px]'}>(11-18) Age</span></Label>
                                                            <div className={'flex'}>
                                                                <button className={'w-fit pl-2'}
                                                                        onClick={() => handleClickCount('decrease', 'childCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom data={childCount} value={childCount}
                                                                             id={childCount} type={'number'}
                                                                             name={'number'}
                                                                />
                                                                <button className={'w-fit pr-2'}
                                                                        onClick={() => handleClickCount('increase', 'childCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container rowSpacing={1}
                                                          columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Toddler<span
                                                                className={'opacity-50 text-[12px]'}>(1-11)Age</span></Label>
                                                            <div
                                                                className={'flex justify-center items-center text-center'}>
                                                                <button className={'w-fit pl-2'}
                                                                        onClick={() => handleClickCount('decrease', 'toddlerCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                    id={toddlerCount}
                                                                    type={'number'}
                                                                    name={'number'}
                                                                    value={toddlerCount}
                                                                    data={toddlerCount}
                                                                />
                                                                <button className={'w-fit pr-2'}
                                                                        onClick={() => handleClickCount('increase', 'toddlerCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Infant<span
                                                                className={'opacity-50 text-[12px]'}>(less 1 Age)</span></Label>
                                                            <div className={'flex'}>
                                                                <button className={'w-fit pl-2'}
                                                                        onClick={() => handleClickCount('decrease', 'infantCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                             id={'infantCount'}
                                                                             value={infantCount} data={infantCount}
                                                                             type={'number'}
                                                                             name={'number'}/>
                                                                <button className={'w-fit pr-2'}
                                                                        onClick={() => handleClickCount('increase', 'infantCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </FormControl>
                                            :
                                            <FormControl>
                                                <div className={'nh:flex nh:w-full'}>
                                                    <Grid container rowSpacing={1}
                                                          columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Adult <span
                                                                className={'opacity-50 text-[12px]'}>(more than 18 Age)</span></Label>
                                                            <div className={'flex'}>
                                                                <button disabled={true} className={'w-fit pl-2'}
                                                                        onClick={() => handleClickCount('decrease', 'adultCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                    data={adultCount}
                                                                    value={adultCount}
                                                                    id={adultCount}
                                                                    name={'number'}
                                                                    type={'number'}
                                                                    disabled={true}
                                                                />
                                                                <button className={'w-fit pr-2'} disabled={true}
                                                                        onClick={() => handleClickCount('increase', 'adultCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Child<span
                                                                className={'opacity-50 text-[12px]'}>(11-18) Age</span></Label>
                                                            <div className={'flex'}>
                                                                <button className={'w-fit pl-2'} disabled={true}
                                                                        onClick={() => handleClickCount('decrease', 'childCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom data={childCount} value={childCount}
                                                                             id={childCount} type={'number'}
                                                                             name={'number'}
                                                                             disabled={true}
                                                                />
                                                                <button className={'w-fit pr-2'} disabled={true}
                                                                        onClick={() => handleClickCount('increase', 'childCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container rowSpacing={1}
                                                          columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Toddler<span
                                                                className={'opacity-50 text-[12px]'}>(1-11)Age</span></Label>
                                                            <div
                                                                className={'flex justify-center items-center text-center'}>
                                                                <button className={'w-fit pl-2'} disabled={true}
                                                                        onClick={() => handleClickCount('decrease', 'toddlerCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                    id={toddlerCount}
                                                                    type={'number'}
                                                                    name={'number'}
                                                                    value={toddlerCount}
                                                                    data={toddlerCount}
                                                                    disabled={true}
                                                                />
                                                                <button className={'w-fit pr-2'} disabled={true}
                                                                        onClick={() => handleClickCount('increase', 'toddlerCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Label className={'font-bold'}>Infant<span
                                                                className={'opacity-50 text-[12px]'}>(less 1 Age)</span></Label>
                                                            <div className={'flex'}>
                                                                <button className={'w-fit pl-2'} disabled={true}
                                                                        onClick={() => handleClickCount('decrease', 'infantCount')}>
                                                                    <RemoveCircleIcon/></button>
                                                                <InputCustom
                                                                             id={'infantCount'}
                                                                             value={infantCount} data={infantCount}
                                                                             type={'number'}
                                                                             name={'number'}
                                                                             disabled={true}

                                                                />
                                                                <button className={'w-fit pr-2'} disabled={true}
                                                                        onClick={() => handleClickCount('increase', 'infantCount')}>
                                                                    <AddCircleIcon/></button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </FormControl>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid sx={{marginY: '8px'}} xs={12}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        maxHeight: 'max-content',
                                        maxWidth: '100%',
                                        mx: 'auto',
                                        // to make the demo resizable
                                        overflow: 'auto',
                                        resize: 'none',
                                    }}
                                >
                                    <Typography level="title-lg" startDecorator={<PermContactCalendarIcon/>}>
                                        Information Passenger
                                    </Typography>
                                    <Divider inset="none"/>
                                    {!Payment ?
                                        <CardContent sx={{width: '100%'}}>
                                            {[...Array(adultCount)].map((item, index) => (
                                                <FormControl key={index}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        Adult {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={adults[index]?.name || ''}
                                                           value={adults[index]?.name || ''}
                                                           type={"text"}
                                                           onChange={(e) => handleInformationChange('adult', index, "name", e.target.value)}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={adults[index]?.dayOfBirth || ''}
                                                           value={adults[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('adult', index, "dayOfBirth", e.target.value)}
                                                    />
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={adults[index]?.sex}
                                                        onChange={(e) => handleInformationChange('adult', index, "sex", e.target.value)}
                                                    >
                                                        <FormControlLabel value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel value="Women" control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(childCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        children {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={children[index]?.name}
                                                           value={children[index]?.name}
                                                           onChange={(e) => handleInformationChange('child', index, "name", e.target.value)}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={children[index]?.dayOfBirth || ''}
                                                           value={children[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('child', index, "dayOfBirth", e.target.value)}
                                                    />
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={children[index]?.sex}
                                                        onChange={(e) => handleInformationChange('child', index, "sex", e.target.value)}
                                                    >
                                                        <FormControlLabel value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel value="Women" control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(toddlerCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        toddler {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={toddlers[index]?.name}
                                                           value={toddlers[index]?.name}
                                                           onChange={(e) => handleInformationChange('toddler', index, "name", e.target.value)}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={toddlers[index]?.dayOfBirth || ''}
                                                           value={toddlers[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('toddler', index, "dayOfBirth", e.target.value)}
                                                    />
                                                    <FormLabel sx={{paddingTop: '12px', fontWeight: 'bold'}}
                                                               id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={toddlers[index]?.sex}
                                                        onChange={(e) => handleInformationChange('toddler', index, "sex", e.target.value)}
                                                    >
                                                        <FormControlLabel value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel value="Women" control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(infantCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        Infant {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={infants[index]?.name}
                                                           value={infants[index]?.name}
                                                           onChange={(e) => handleInformationChange('infants', index, "name", e.target.value)}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={infants[index]?.dayOfBirth || ''}
                                                           value={infants[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('infants', index, "dayOfBirth", e.target.value)}
                                                    />
                                                    <FormLabel sx={{paddingTop: '12px', fontWeight: 'bold'}}
                                                               id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={infants[index]?.sex}
                                                        onChange={(e) => handleInformationChange('infants', index, "sex", e.target.value)}
                                                    >
                                                        <FormControlLabel value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel value="Women" control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            <Paragraph
                                                className={'text-red-600 font-bold pt-2'}>{passengerError}</Paragraph>
                                        </CardContent>
                                        :
                                        <CardContent sx={{width: '100%'}}>
                                            {[...Array(adultCount)].map((item, index) => (
                                                <FormControl key={index}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        Adult {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={adults[index]?.name || ''}
                                                           value={adults[index]?.name || ''}
                                                           type={"text"}
                                                           onChange={(e) => handleInformationChange('adult', index, "name", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={adults[index]?.dayOfBirth || ''}
                                                           value={adults[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('adult', index, "dayOfBirth", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={adults[index]?.sex}
                                                        onChange={(e) => handleInformationChange('adult', index, "sex", e.target.value)}
                                                        disabled={true}
                                                    >
                                                        <FormControlLabel disabled={true} value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel disabled={true} value="Women"
                                                                          control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(childCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        children {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={children[index]?.name}
                                                           value={children[index]?.name}
                                                           onChange={(e) => handleInformationChange('child', index, "name", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={children[index]?.dayOfBirth || ''}
                                                           value={children[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('child', index, "dayOfBirth", e.target.value)}
                                                           disabled={true}/>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={children[index]?.sex}
                                                        onChange={(e) => handleInformationChange('child', index, "sex", e.target.value)}
                                                        disabled={true}
                                                    >
                                                        <FormControlLabel disabled={true} value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel disabled={true} value="Women"
                                                                          control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(toddlerCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        toddler {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={toddlers[index]?.name}
                                                           value={toddlers[index]?.name}
                                                           onChange={(e) => handleInformationChange('toddler', index, "name", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={toddlers[index]?.dayOfBirth || ''}
                                                           value={toddlers[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('toddler', index, "dayOfBirth", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <FormLabel sx={{paddingTop: '12px', fontWeight: 'bold'}}
                                                               id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={toddlers[index]?.sex}
                                                        onChange={(e) => handleInformationChange('toddler', index, "sex", e.target.value)}
                                                        disabled={true}
                                                    >
                                                        <FormControlLabel disabled={true} value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel disabled={true} value="Women"
                                                                          control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            {[...Array(infantCount)].map((item, index) => (
                                                <FormControl key={item}>
                                                    <Label className={'font-bold pb-0'}>Information
                                                        Infant {index + 1} </Label>
                                                    <Input placeholder={'Name'}
                                                           sx={{outline: 'none', width: '100%'}}
                                                           data={infants[index]?.name}
                                                           value={infants[index]?.name}
                                                           onChange={(e) => handleInformationChange('infants', index, "name", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                           data={infants[index]?.dayOfBirth || ''}
                                                           value={infants[index]?.dayOfBirth || ''}
                                                           type={"number"}
                                                           onChange={(e) => handleInformationChange('infants', index, "dayOfBirth", e.target.value)}
                                                           disabled={true}
                                                    />
                                                    <FormLabel sx={{paddingTop: '12px', fontWeight: 'bold'}}
                                                               id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={infants[index]?.sex}
                                                        onChange={(e) => handleInformationChange('infants', index, "sex", e.target.value)}
                                                        disabled={true}
                                                    >
                                                        <FormControlLabel disabled={true} value="Men" control={<Radio/>}
                                                                          label="Male"/>
                                                        <FormControlLabel disabled={true} value="Women"
                                                                          control={<Radio/>}
                                                                          label="Female"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            ))}
                                            <Paragraph
                                                className={'text-red-600 font-bold pt-2'}>{passengerError}</Paragraph>
                                        </CardContent>
                                    }
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid xs={12} lg={4} sx={{marginY: '8px'}}>
                            <Card
                                // variant="outlined"
                                sx={{
                                    maxHeight: 'max-content',
                                    maxWidth: '100%',
                                    mx: 'auto',
                                    // to make the demo resizable
                                    overflow: 'auto',
                                    resize: 'none',
                                    marginY: '8px'
                                }}
                            >
                                <Typography sx={{display: 'flex', justifyContent: 'center'}} level="title-lg"
                                            startDecorator={<TourIcon/>} endDecorator={<TourIcon/>}>
                                    Tour Information
                                </Typography>
                                <LineCustom size={'100%'}/>
                                <div>
                                    <LargeHeading size={'xs'}>
                                        {dataTour?.name}
                                    </LargeHeading>
                                    <Link
                                        className={'text-[10px] text-blue-600 hover:underline hover:cursor-pointer font-normal '}
                                        href={`/tour/${tourId}`}>tour detail</Link>
                                </div>
                                <CardContent>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div className={'col-span-1'}>
                                            <Paragraph size={'sx'}>Time:</Paragraph>
                                            <Paragraph size={'sx'}>Departure:</Paragraph>
                                            <Paragraph size={'sx'}>Departure Day:</Paragraph>
                                            <Paragraph size={'sx'}>End date</Paragraph>
                                            <Paragraph size={'sx'}>Passenger:</Paragraph>
                                            <Paragraph size={'sx'}>The remaining amount:</Paragraph>
                                        </div>
                                        <div className={'col-span-1'}>
                                            <Paragraph className={'font-bold'}
                                                       size={'sx'}>{differenceInDays} days</Paragraph>
                                            <Paragraph className={'font-bold'}
                                                       size={'sx'}>{dataTour?.startAddress}</Paragraph>
                                            <Paragraph className={'font-bold'}
                                                       size={'sx'}>{formattedStartDate}</Paragraph>
                                            <Paragraph className={'font-bold'} size={'sx'}>{formatEnd}</Paragraph>
                                            <Paragraph className={'font-bold'}
                                                       size={'sx'}>{adultCount} Adult, {childCount ? `${childCount} Child,` : ''} {toddlerCount > 0 ? `${toddlerCount} Toddler,` : ''} {infantCount > 0 ? ` ${infantCount} Infant` : ''}</Paragraph>
                                            <Paragraph className={'font-bold'}
                                                       size={'sx'}>{Number(data?.baseQuantity) - Number(data?.quantity)}</Paragraph>
                                        </div>
                                    </div>
                                </CardContent>
                                <LineCustom size={'60%'}/>
                                <CardContent>
                                    <div>
                                        <Paragraph size="sx" className={'font-bold'}>Detail Price:</Paragraph>
                                    </div>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div className={'col-span-1'}>
                                            <Paragraph size={'sx'}> Adult<b> x {adultCount} </b></Paragraph>
                                            {childCount > 0 ? <Paragraph size={'sx'}> Child<b> x {childCount}</b>
                                            </Paragraph> : ''}
                                            {toddlerCount > 0 ?
                                                <Paragraph size={'sx'}> Toddler<b> x {toddlerCount}</b>
                                                </Paragraph> : ''}
                                            {infantCount > 0 ? <Paragraph size={'sx'}>Infant<b> x{infantCount}</b>
                                            </Paragraph> : ''}
                                        </div>
                                        <div className={'col-span-1'}>
                                            <Paragraph size={'sx'}> <b>{adultPrice}  </b></Paragraph>
                                            {childCount > 0 ?
                                                <Paragraph size={'sx'}> <b>{childPrice}  </b></Paragraph> : ''}
                                            {toddlerCount > 0 ?
                                                <Paragraph size={'sx'}> <b>{toddlerPrice}  </b></Paragraph> : ''}
                                            {infantCount > 0 ?
                                                <Paragraph size={'sx'}> <b>{infantPrice}  </b></Paragraph> : ''}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card
                                variant="outlined"
                                sx={{
                                    maxHeight: 'max-content',
                                    maxWidth: '100%',
                                    mx: 'auto',
                                    // to make the demo resizable
                                    marginY: '8px',
                                    overflow: 'auto',
                                    resize: 'none',
                                }}
                            >
                                <Typography sx={{display: 'flex', justifyContent: 'center'}} level="title-lg"
                                            startDecorator={<InfoIcon/>} endDecorator={<InfoIcon/>}>
                                    Accompanied service
                                </Typography>
                                <LineCustom size={'100%'}/>
                                <AccompaniedService color={'blue'}/>
                            </Card>
                            <Card
                                variant="outlined"
                                sx={{
                                    maxHeight: 'max-content',
                                    maxWidth: '100%',
                                    mx: 'auto',
                                    marginY: '8px',
                                    overflow: 'auto',
                                    resize: 'none',
                                }}
                            >
                                <Typography sx={{display: 'flex', justifyContent: 'center'}} level="title-lg"
                                            startDecorator={<MonetizationOnIcon/>}
                                            endDecorator={<MonetizationOnIcon/>}>
                                    Billing Information
                                </Typography>
                                <LineCustom size={'100%'}/>
                                <CardContent>
                                    <div>
                                        <div className={'flex justify-between'}>
                                            <Paragraph className={''}>Prepayment amount: </Paragraph>
                                            <Paragraph className={'font-bold mb-[10px]'}>{totalPrice} </Paragraph>
                                        </div>
                                        <div className={'flex justify-between'}>
                                            <Paragraph className={''}>Total Payment :</Paragraph>
                                            <Paragraph className={'font-bold'}> {totalPrice} </Paragraph>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className={'w-full flex justify-center pt-3'}>
                                <CardActions
                                    sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                                    {isLoadingBooking ? (
                                            <div className={''}>
                                                <CircularProgress color="secondary" size={16}/>
                                            </div>
                                        ) :
                                        <> {!Payment ?
                                            <div className={'w-full'}>
                                                <Button variant="solid" color="primary"
                                                        fullWidth={true}
                                                        onClick={() =>
                                                            handleClick()
                                                        }
                                                >Confirm Data
                                                </Button>
                                            </div>
                                            :
                                            <PaymentButton accessToken={accessToken} userId={userId}
                                                           setOpenModal={setOpenModal} openModal={openModal}
                                                           InputTotalPrice={InputAdultPrice}
                                                           setPayment={setPayment}
                                                           mutateBooking={mutateBooking}
                                                           paymentId={dataTour?.store?.paymentId}
                                            />
                                        }
                                        </>

                                    }
                                </CardActions>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                {!errorBooking ?
                    ''
                    : <div className={'nh:w-[74%] flex justify-center'}>
                        <Paragraph className={'font-bold text-center'} size="sx"
                                   status={'error'}>{errorBooking}</Paragraph>
                    </div>
                }
            </Box>
        </>
    );
}
export default Booking

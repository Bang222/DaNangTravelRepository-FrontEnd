'use client'

import React, {FC, useRef, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Label from "@/components/ui/Label";
import Paragraph from "@/components/ui/Paragraph";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {bookingAPI, createAxios, createTourAPI, updateTourAPI} from "@/util/api/apiReuqest";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {Swiper, SwiperSlide} from 'swiper/react';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CancelIcon from '@mui/icons-material/Cancel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {AppDispatch, RootState} from "@/redux/store";
import {TourOfStore} from "@/types/seller";

interface InputEditTourProps {
    dataTour:TourOfStore
}

//bang

const InputEditTour: FC<InputEditTourProps> = ({dataTour}) => {
    const [totalDay, setTotalDay] = React.useState<number>(dataTour.schedules.length)
    const [price, setPrice] = React.useState<number>(0)
    const [err, setErr] = React.useState<boolean>(false)
    const [previewImage, setPreviewImage] = React.useState<>(dataTour.imageUrl)
    const vietnamCities = [
        "",
        "Ha Noi",
        "Ho Chi Minh",
        "Da Nang",
        "Bac Giang",
        "Bac Kan",
        "Bac Lieu",
        "Bac Ninh",
        "Ben Tre",
        "Binh Dinh",
        "Binh Duong",
        "Binh Phuoc",
        "Binh Thuan",
        "Ca Mau",
        "Can Tho",
        "Cao Bang",
        "Dak Lak",
        "Dak Nong",
        "Dien Bien",
        "Dong Nai",
        "Dong Thap",
        "Gia Lai",
        "Ha Giang",
        "Ha Nam",
        "Ha Tinh",
        "Hai Duong",
        "Hai Phong",
        "Hau Giang",
        "Hoa Binh",
        "Hung Yen",
        "Khanh Hoa",
        "Kien Giang",
        "Kon Tum",
        "Lai Chau",
        "Lam Dong",
        "Lang Son",
        "Lao Cai",
        "Long An",
        "Nam Dinh",
        "Nghe An",
        "Ninh Binh",
        "Ninh Thuan",
        "Phu Tho",
        "Phu Yen",
        "Quang Binh",
        "Quang Nam",
        "Quang Ngai",
        "Quang Ninh",
        "Quang Tri",
        "Soc Trang",
        "Son La",
        "Tay Ninh",
        "Thai Binh",
        "Thai Nguyen",
        "Thanh Hoa",
        "Thua Thien-Hue",
        "Tien Giang",
        "Tra Vinh",
        "Tuyen Quang",
        "Vinh Long",
        "Vinh Phuc",
        "Yen Bai"
    ];

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state:RootState) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const accessToken = useSelector((state:RootState) => state.auth.value?.token.access)
    const userId = useSelector((state:RootState) => state.auth.value?.user.id)
    const queryClient = useQueryClient()
    const {mutate: mutateEditTour, isLoading: isLoadingEditTour, isSuccess: isSuccessEditTour,data:dataEditTour} = useMutation(
        async (formData: any) => {
            try {
                const res = await updateTourAPI(accessToken, userId, formData, axiosJWT,dataTour.id)
                return res;
            } catch (error) {
                throw error;
            }
        }, {
            onSuccess: (dataEditTour) => {
                if(dataEditTour.message){
                   return toast.error(dataEditTour.message)
                }
                toast.success('Edit Successfully')
                // formik.resetForm()
                // setPreviewImage([])
                queryClient.invalidateQueries(['TourOfStore', userId]);
            },
            onError: (error) => {
                // toast.error('Edit error', error)
                console.log(error)
            },
        });
    React.useEffect(()=>{
        queryClient.invalidateQueries(['TourOfStore', userId]);
    },[isSuccessEditTour])
    const date = new Date(dataTour.lastRegisterDate);
    const startDay = new Date(dataTour.startDate);
    const endDay = new Date(dataTour.endDate);


    const formattedRegisterDate = date.toISOString().split('T')[0];
    const formattedStartDayDate = startDay.toISOString().split('T')[0];
    const formattedEndDayDate = endDay.toISOString().split('T')[0];

    const formik = useFormik({
        initialValues: {
            name: dataTour.name,
            description:  dataTour.description,
            price: dataTour.price,
            baseQuantity: dataTour.baseQuantity,
            lastRegisterDate: formattedRegisterDate,
            address: dataTour.address,
            startDate: formattedStartDayDate,
            endDate: formattedEndDayDate,
            endingAddress: dataTour.endingAddress,
            startAddress: dataTour.startAddress,
            files: [],
            schedules: dataTour.schedules
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Please Input name').max(100,'can not out of 100 words'),
            description: Yup.string().required('Please Input description'),
            price: Yup.number().required('Please Input Price').min(1, 'Price must be greater than 0'),
            baseQuantity: Yup.number().required('Please Input Quantity').min(1, 'Quantity must be greater than 0'),
            lastRegisterDate: Yup.date().required("Please Input last Register Date")
                .min(new Date(), "Last Register Date cannot be in the past")
                .test('lastRegisterDate', 'Last Register Date must be before Start Date', function (value) {
                    return  !this.parent.startDate || value < this.parent.startDate;
                }),
            address: Yup.string().required("Please Input Address"),
            startDate: Yup.date(),
            startAddress: Yup.string(),
            endingAddress: Yup.string(),
            files: Yup.array().required("Please Input Image"),
            schedules: Yup.array()
                .min(totalDay, 'Please add at least one schedule')
                .of(
                    Yup.object().shape({
                        // day: Yup.string().required('Please Input day'),
                        title: Yup.string().required('Please Input title'),
                        description: Yup.string().required('Please Input description'),
                        // imgUrl: Yup.string().required('Please Input imgUrl')
                    })
                )
        }),
        validate: (values) => {
            const errors = {};
            if (!vietnamCities.includes(values.address)) {
                errors.address = "Invalid city";
            }
            if (!vietnamCities.includes(values.startAddress)) {
                errors.startAddress = "Invalid city";
            }
            if (!vietnamCities.includes(values.endingAddress)) {
                errors.endingAddress = "Invalid city";
            }
            return errors;
        },
        onSubmit: async (values) => {
           const data = {
               name:values.name,
               description:values.description,
               baseQuantity:values.baseQuantity,
               lastRegisterDate:values.lastRegisterDate,
               schedules:values.schedules
           }
            // values.schedules.forEach((schedule, index) => {
            //     formData.append(`schedules[${index}][day]`, index + 1);
            //     formData.append(`schedules[${index}][title]`, schedule.title);
            //     formData.append(`schedules[${index}][description]`, schedule.description);
            // });
            // console.log(values.schedules)
            mutateEditTour(data)
        },
    });
    React.useEffect(() => {
        const formattedPrice = formik.values.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        setPrice(formattedPrice)
    }, [formik.values.price])
    React.useEffect(() => {
        const minSchedules = Math.ceil((new Date(formik.values.endDate) - new Date(formik.values.startDate)) / (1000 * 60 * 60 * 24)) + 1;
        setTotalDay(minSchedules)
    }, [formik.values.startDate, formik.values.endDate])
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={'nh:grid nh:grid-cols-2 nh:gap-2.5'}>
                <div className={'nh:col-span-1'}>
                    <Label>Tour Name <span className={'opacity-50 text-[12px]'}>(max/100Words)</span></Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='text'
                               placeholder='Tour Name'
                               name='name'
                               id="name"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.name}
                               onChange={formik.handleChange}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.name}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>Description</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='text'
                               placeholder='Description'
                               name='description'
                               id="description"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.description}
                               onChange={formik.handleChange}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.description}</p>
                    </div>
                </div>
            </div>
            <div className={'nh:grid nh:grid-cols-3 nh:gap-2.5'}>
                <div className={'nh:col-span-1'}>
                    <Label>Price</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='number'
                               placeholder='Price VND'
                               name='price'
                               id="price"
                               disabled={true}
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.price}
                               onChange={formik.handleChange}
                        />
                        <Paragraph size={'sx'}>Formatted Price:<b>{price}</b></Paragraph>
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.price}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>Quantity</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='number'
                               placeholder='Quantity'
                               name='baseQuantity'
                               id="baseQuantity"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.baseQuantity}
                               onChange={formik.handleChange}
                               min={1}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.baseQuantity}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>Address</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            id="address"
                            className="w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300"
                            required
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            disabled={true}
                            min={1}
                            list="vietnamCities" // Associate with the datalist
                        />
                        <datalist id="vietnamCities" className={'max-h-[100px]'}>
                            {vietnamCities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.address}</p>
                    </div>
                </div>
            </div>
            <div className={'nh:grid nh:grid-cols-2 nh:gap-2.5'}>
                <div className={'nh:col-span-1'}>
                    <Label>Start Address</Label>
                    <div className="pt-[4px] pb-[8px] text-black relative">
                        <input type='text'
                               placeholder='Start Address'
                               name='startAddress'
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.startAddress}
                               disabled={true}
                               onChange={formik.handleChange}
                               min={1}
                               list={"vietnamCities"}
                        />
                        <datalist id="vietnamCities" className="max-h-[100px] overflow-y-auto absolute left-0 mt-2 w-full border border-gray-300 rounded-[10px] bg-white">
                            {vietnamCities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.startAddress}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>Ending Address</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='text'
                               placeholder='Ending Address'
                               name='endingAddress'
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.endingAddress}
                               disabled={true}
                               onChange={formik.handleChange}
                               list={"vietnamCities"}
                        />
                        <datalist id="vietnamCities" className={'max-h-[100px]'}>
                            {vietnamCities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.endingAddress}</p>
                    </div>
                </div>
            </div>
            <div className={'nh:grid nh:grid-cols-3 nh:gap-2.5'}>
                <div className={'nh:col-span-1'}>
                    <Label>Last Day Register</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='date'
                               placeholder='Last Day Register'
                               name='lastRegisterDate'
                               id="lastRegisterDate"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               value={formik.values.lastRegisterDate}
                               onChange={formik.handleChange}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.lastRegisterDate}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>Start Day</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='date'
                               placeholder='Start Day'
                               name='startDate'
                               id="startDate"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               disabled={true}
                               required
                               value={formik.values.startDate}
                               onChange={formik.handleChange}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.startDate}</p>
                    </div>
                </div>
                <div className={'nh:col-span-1'}>
                    <Label>End Day</Label>
                    <div className="pt-[4px] pb-[8px] text-black">
                        <input type='date'
                               placeholder='End Day'
                               name='endDate'
                               id="endDate"
                               className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                               required
                               disabled={true}
                               value={formik.values.endDate}
                               onChange={formik.handleChange}
                        />
                        <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.endDate}</p>
                    </div>
                </div>
            </div>
            <Label>Schedule</Label>
            {totalDay > 0 ? [...Array(totalDay)]?.map((item, index) => {
                // const uniqueKey = `day_${index}_${Math.random()}`;
                return (
                    <div className={'nh:grid nh:grid-cols-2 nh:gap-2.5'} key={index}>
                        <div className={'nh:col-span-1'}>
                            <Label>{` Title Day ${index + 1}`}</Label>
                            <input type='text'
                                   placeholder='Title'
                                   name={`schedules[${index}].title`}
                                   className={'w-full h-[32px] p-1 pl-3 rounded-[10px] border border-gray-300 '}
                                   required
                                   value={formik.values.schedules[index]?.title}
                                   onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">
                                {formik.errors.schedules && formik.errors.schedules[index]?.title}
                            </p>
                        </div>
                        <div className={'nh:col-span-1'}>
                            <Label>{`Description Day ${index + 1}`}</Label>
                            <textarea
                                placeholder='description'
                                name={`schedules[${index}].description`}
                                className='w-full h-[32px] p-1 rounded-[10px] border border-gray-300 resize-none'
                                required
                                value={formik.values.schedules[index]?.description}
                                onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">
                                {formik.errors.schedules && formik.errors.schedules[index]?.description}
                            </p>
                        </div>
                    </div>
                )
            }) : ''}
            <div className="">
                <label className="font-extralight cursor-not-allowed " htmlFor='labelUpload'
                ><DriveFolderUploadIcon/> Can not change Image</label>
                <div
                    className={'h-[40vh] mb-4 bg-neutral-200 w-full border border-dashed border-gray-300 p-4 cursor-default'}>
                    {previewImage && previewImage.length > 0 ? (
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    height: '35vh',
                                    position: 'relative'
                                }}
                                slidesPerView={1}
                                spaceBetween={30}
                                keyboard={{
                                    enabled: true,
                                }}

                                pagination={{
                                    type: 'fraction',
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                centeredSlides={true}
                                modules={[Keyboard, Pagination, Navigation]}
                            >
                                {dataTour?.imageUrl.map((item, index) => (
                                    <SwiperSlide key={index}
                                                 style={{display: 'flex', justifyContent: 'center', height: '35vh'}}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img className={'h-[35vh] w-[69vw] nh:w-[29vw] object-cover'}
                                                 src={item}
                                                 alt={`Image ${index + 1}`}/>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-next bg-white rounded-full"
                                     style={{width: '30px', height: '30px'}}>
                                    <KeyboardArrowRightIcon sx={{color: 'black', opacity: '1'}}/>
                                </div>
                                <div className="swiper-button-prev bg-white rounded-full"
                                     style={{width: '30px', height: '30px'}}>
                                    <KeyboardArrowLeftIcon sx={{color: 'black', opacity: '1'}}/>
                                </div>
                            </Swiper>
                            // </div>
                        )
                        :
                        <div className={'flex h-[30vh] items-center justify-center '}>
                            <div className="text-gray-400 text-center">
                                <Paragraph> The First Picture Will Represent Your Tour can not out of 10 images</Paragraph>
                                <Paragraph status={'error'}> Image Can not null</Paragraph>
                            </div>
                        </div>

                    }
                </div>
            </div>
            {isLoadingEditTour ?
                <div className={'flex justify-center w-full'}>
                    <CircularProgress color="secondary"/>
                </div> : <button
                    className=" text-[15px] md:text-[18px] text-white submit-button font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer px-2 pt-[5px] pb-[5px]"
                    type="submit"
                >
                    Submit
                </button>}

        </form>
    )
}

export default InputEditTour;

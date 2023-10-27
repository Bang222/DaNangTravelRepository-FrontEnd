'use client'

import React, {FC, useEffect} from 'react';
import TourComponent from "@/components/user/TourComponent";
import NavLeft from "@/components/user/navbar/NavLeft";
import FilterTour from "@/components/user/FilterTour";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {GetAllTourApi} from "@/util/api/apiReuqest";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDebounce} from "@/components/hooks/UseDebounce";
import ButtonBackToTop from "@/components/buttonBackToTop/ButtonBackToTop";
import {CircularProgress} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { RootState } from '@/redux/store';

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const userIdInStore = useSelector((state:RootState) => state.auth.value?.user.id)
    const [value, setValue] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isStickyLeft, setIsStickyLeft] = React.useState(false);
    const queryClient = useQueryClient()
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
    const resetPageParam = () => {
        queryClient.setQueryData(['All-Tour', userIdInStore], {
            pages: [],
            pageParams: [1], // Reset to page 1
        });
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleStickyClick = () => {
        setIsStickyLeft(!isStickyLeft);
    };
    const [dataSearch, setDataSearch] = React.useState({
        name:"",
        start: "",
        min: "",
        max: "",
        startDay: "",
        endDay: "",
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            start: "",
            min: "",
            max: "",
            startDay: "",
            endDay: "",
        },
        validationSchema: Yup.object({
            min: Yup.number()
                .min(1, 'Minimum must be greater than or equal to 1'),
            max: Yup.number()
                .min(Yup.ref('min'), 'Maximum must be greater than or equal to the minimum')
        }),
        validate: (values) => {
            const errors = {};
            if (!vietnamCities.includes(values.start)) {
                errors.start = "Invalid city";
            }
            return errors;
        },
        onSubmit: (values) => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                resetPageParam()
                setDataSearch({
                    name: values.name,
                    max: values.max,
                    min: values.min,
                    start: values.start,
                    startDay: values.startDay,
                    endDay: values.endDay,
                });
            }, 1000);
        }
    });
    useEffect(() => {
        document.title = `Tour`
    }, [])
    React.useEffect(() => {
        queryClient.prefetchInfiniteQuery(['All-Tour', userIdInStore])
    }, [dataSearch])
    return (

        <section className={'pt-2 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-5'}>
            <section className="hidden mt-[65px] lg:block relative">
                <div className="sticky top-[15%] overflow-y-auto">
                    <NavLeft/>
                </div>
            </section>
            <div className={'lg:col-span-2 col-span-4 w-6/6 p-3.5'}>
                <div className={' my-4 p-1 nh:hidden'}>
                    <div className={"top-[125px] w-full left-0 bg-gray-400 z-[99998] fixed rounded-md "}>
                        <div className={"flex justify-center"}>
                            <button onClick={handleStickyClick}
                                    className={"text-white py-2 px-4 w-full"}>
                                <SearchIcon sx={{color: "white"}}/> Filter
                            </button>
                        </div>
                    </div>
                </div>
                {loading ? <div className={'flex justify-center mt-[100px] h-[90vh]'}>
                    <CircularProgress color="secondary"/>
                </div> : <TourComponent userIdInStore={userIdInStore} dataSearch={dataSearch}/>}
            </div>

            <section className={' lg:block relative mt-[65px]'}>
                <div
                    className={`fixed lg:sticky z-[1999] nh:z-[1] top-[30%] lg:top-[15%] left-[8%] lg:left-0 transition-transform transform ${!isStickyLeft ? 'translate-x-[-150%]' : '-translate-x-0'} lg:translate-x-0`}>
                    <FilterTour vietnamCities={vietnamCities} formik={formik} userId={userIdInStore}
                                dataSearch={dataSearch} setDataSearch={setDataSearch} setLoading={setLoading}
                                loading={loading}/>
                </div>
            </section>
            <section className={'hidden lg:block'}>
                <ButtonBackToTop/>
            </section>
        </section>
    );
}
export default Page;

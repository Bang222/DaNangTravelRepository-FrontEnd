'use client'

import React, {FC} from 'react';
import TourComponent from "@/components/user/TourComponent";
import NavLeft from "@/components/user/navbar/NavLeft";
import FilterTour from "@/components/FilterTour";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {GetAllTourApi} from "@/util/api/apiReuqest";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDebounce} from "@/components/hooks/UseDebounce";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const userIdInStore = useSelector((state) => state.auth.value?.user.id)
    const [value, setValue] = React.useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)
    const [loading,setLoading] = React.useState<boolean>(false)

    const [dataSearch,setDataSearch] = React.useState({
        start: "",
        min:"",
        max:"",
        startDay:"",
        endDay:"",})
    const formik = useFormik({
        initialValues: {
            name: "",
            start: "",
            min:"",
            max:"",
            startDay:"",
            endDay:"",
        },
        validationSchema: Yup.object({
            min: Yup.number()
                .min(1, 'Minimum must be greater than or equal to 1'),
            max: Yup.number()
                .min(Yup.ref('min'), 'Maximum must be greater than or equal to the minimum')
        }),
        onSubmit: (values) => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
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
    return (
        <section className={'pt-2 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-5'}>
            <section className="hidden mt-[65px] lg:block relative">
                <div className="sticky top-[15%] overflow-y-auto">
                <NavLeft/>
             </div>
            </section>
            <div className={'lg:col-span-2 col-span-4 w-6/6 p-3.5'}>
                {loading ? <div> Loading... </div> : <TourComponent userIdInStore={userIdInStore} dataSearch={dataSearch}/>}
            </div>
            <section className={'hidden lg:block relative mt-[65px]'}>
                <div className="sticky top-[15%]">
                    <FilterTour formik={formik} userId={userIdInStore} dataSearch={dataSearch} setDataSearch = {setDataSearch} />
                </div>
            </section>
        </section>
    );
}

export default Page;
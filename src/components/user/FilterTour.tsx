'use client'
import {FC} from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardHeader} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from "formik";
import * as Yup from "yup";
import Paragraph from "@/components/ui/Paragraph";
import {GetAllTourApi} from "@/util/api/apiReuqest";
import EachTour from "@/components/user/EachTour";
import TourComponent from "@/components/user/TourComponent";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";

interface FilterTourProps {
    formik: any
    userId: string
    dataSearch: any
    setDataSearch: React.Dispatch<React.SetStateAction<any>>
    vietnamCities : string[]
}

//tour/page

const FilterTour: FC<FilterTourProps> = (props: FilterTourProps) => {
    const {formik, userId, dataSearch, setDataSearch, vietnamCities} = props
    const userIdInStore = useSelector((state) => state.auth.value?.user.id)
    const queryClient = useQueryClient();
    const formatMinPrice = formik?.values?.min?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const formatMaxPrice = formik?.values?.max?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    const resetPageParam = () => {
        queryClient.setQueryData(['All-Tour', userIdInStore], {
            pages: [],
            pageParams: [1], // Reset to page 1
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    React.useEffect(() => {
        // Reset pageParam to 1 when dataSearch changes
        resetPageParam()
    }, [dataSearch])
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader sx={{backgroundColor: 'blue', paddingY: '8px'}} title={
                <div className="flex items-center">
                <p className="ml-1 text-white">Search</p>
                <p className="mr-1 text-white text-right w-full" onClick={(e) => {
                    formik.handleReset(e)
                    setDataSearch({
                        name: "",
                        max: "",
                        min: "",
                        start: "",
                        startDay: "",
                        endDay: "",
                    })
                }
                }>Clear</p>
            </div>}
            />
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'grid grid-cols-5 gap-4'}>
                        <div className={'col-span-1'}>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>Name:</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>Place:</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>Min:</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}> &ensp;</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>Max:</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}> &ensp;</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>Start:</label>
                            <label className={'flex items-center mr-3 font-bold pb-3'}>End:</label>
                        </div>
                        <div className={'col-span-4'}>
                            <div className={'pb-3'}>
                                <input
                                    placeholder='Name'
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                />
                            </div>
                            <div className={'pb-3'}>
                                <input
                                    placeholder='Start Departure'
                                    type='text'
                                    name='start'
                                    id='start'
                                    value={formik.values.start}
                                    onChange={formik.handleChange}
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                    list={"vietnamCities"}
                                />
                                <datalist id="vietnamCities" className={'max-h-[100px]'}>
                                {vietnamCities.map((city, index) => (
                                    <option key={index} value={city} />
                                ))}
                            </datalist>
                                <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.start}</p>
                            </div>
                            <div className={'pb-3 items-center'}>
                                <input
                                    placeholder='Min Price'
                                    defaultValue={0}
                                    type='number'
                                    name='min'
                                    id='min'
                                    value={formik.values.min}
                                    onChange={formik.handleChange}
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                />
                                <Paragraph className={'text-right'}><b>{formatMinPrice}</b>&ensp; </Paragraph>
                            </div>
                            <div className={'pb-4'}>
                                <input
                                    type='number' // Use a range input for Max Price
                                    placeholder={'Max Price'}
                                    // onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    value={formik.values.max}
                                    onChange={formik.handleChange}
                                    name='max'
                                    id='max'
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                />
                                <Paragraph className={'text-right'}><b>{formatMaxPrice}</b> &ensp;</Paragraph>
                            </div>
                            <div className={'pb-5'}>
                                <input
                                    type='date'
                                    value={formik.values.startDay}
                                    onChange={formik.handleChange}
                                    name='startDay'
                                    id='startDay'
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                />
                            </div>
                            <div className={'pb-3 flex items-center'}>
                                <input
                                    type='date'
                                    value={formik.values.endDay}
                                    onChange={formik.handleChange}
                                    name='endDay'
                                    id='endDay'
                                    className='w-full h-[24px] p-2 rounded-[8px] border border-gray-400'
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'p-1'}>
                        <Paragraph status={'error'}>{formik.errors.max}</Paragraph>
                    </div>
                    <button
                        className="max-md:text-[15px] mt-[24px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                        type={"submit"}
                    >
                        Search
                    </button>
                </form>
            </CardContent>
        </Card>
    );
}
export default FilterTour;

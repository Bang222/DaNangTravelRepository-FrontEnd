'use client'
import {FC, useState} from 'react';
import {useGetWeather} from "@/util/api/apiReuqest";
import Paragraph from "@/components/ui/Paragraph";
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';

interface IntroductionProps {
}

//bang

const Introduction: FC<IntroductionProps> = ({}) => {
    const {data, isLoading, isFetching, error} = useGetWeather()
    const currentDay = new Date(Date.now());
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',    // 'long' or 'short' for day of the week (e.g., Monday or Mon)
        month: 'long',      // 'long', 'short', or 'numeric' for month (e.g., January or Jan)
        day: 'numeric',     // 'numeric', or '2-digit' for day of the month (e.g., 1 or 01)
        year: 'numeric'     // 'numeric', or '2-digit' for year (e.g., 2023 or 23)
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',    // 'numeric', or '2-digit' for hour (e.g., 1 or 01)
        minute: 'numeric'   // 'numeric', or '2-digit' for minute (e.g., 2 or 02)
    };
    const formattedDate = currentDay.toLocaleString('en-US', dateOptions);
    const formattedTime = currentDay.toLocaleString('en-US', timeOptions);
    const formattedCurrentDay = `${formattedDate},${formattedTime}`;

    return (
        <>
            {
                isLoading ? <div>Loading... </div> :
                    <section className={'mt-[60px] flex justify-center text-white overflow-hidden'}>
                        <div className={'lg:w-[300px] bg-zinc-700 w-6/6 p-5 rounded-md overflow-hidden'}>
                            <div>
                                <h2 className={'font-bold pb-4 text-[20px]'}>Da Nang,VN</h2>
                                <Paragraph size={'sx'}>{formattedCurrentDay}</Paragraph>
                            </div>
                            <div>
                                <Paragraph size={'sx'}>Heat range: <b>{data.main.temp_min}°C-{data.main.temp_max}°C</b> </Paragraph>
                                <Paragraph size={'sx'}>Feel like: <b>{data.main.feels_like} °C</b></Paragraph>
                                <Paragraph size={'sx'}>Humidity<b>: {data.main.humidity} %</b></Paragraph>
                                <Paragraph size={'sx'}>Pressure<b>: {data.main.pressure} pHa </b></Paragraph>
                                <div className={' flex justify-between '}>
                                    <Paragraph size={'sx'}>Sunrise<b>: {new Date(data.sys.sunrise *1000).toLocaleString('en-US',timeOptions)} </b></Paragraph>
                                    <div>|</div>
                                    <Paragraph size={'sx'}>Sunset<b>: { new Date(data.sys.sunset*1000).toLocaleString('en-US',timeOptions)} </b></Paragraph>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}

export default Introduction;
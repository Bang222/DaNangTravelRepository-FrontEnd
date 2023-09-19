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
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric'
    };
    const formattedDate = currentDay.toLocaleString('en-US', dateOptions);
    const formattedTime = currentDay.toLocaleString('en-US', timeOptions);
    const formattedCurrentDay = `${formattedDate},${formattedTime}`;

    return (
        <>
            {
                isLoading ? <div>Loading... </div> : <>
                    {data ?  <section className={'flex justify-center text-white mt-4'}>
                        <div className={'lg:w-[400px] bg-zinc-700 w-6/6 p-5 rounded-md'}>
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
                    </section> : <div className={'flex'}></div>}
                </>

            }
        </>
    );
}

export default Introduction;
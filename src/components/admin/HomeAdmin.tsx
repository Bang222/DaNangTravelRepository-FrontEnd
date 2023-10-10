'use client'

import React, {FC} from 'react';
import CardComponent from "@/components/seller/CardComponent";
import ChartAndBody from "@/components/seller/dasboard/ChartAndBody";
import {dataEachMonthOfAdmin, getDataAMonthOfAdmin} from "@/types/admin";
import LineChartAdmin from "@/components/admin/chart/LineChartAdmin";
import ChartAdmin from "@/components/admin/ChartAdmin";

interface HomeAdminProps {
    month:number
    setMonth: React.Dispatch<React.SetStateAction<number>>
    loading:boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    dataAdminAMonth: getDataAMonthOfAdmin | undefined
    dataAdminEachMonth:dataEachMonthOfAdmin[] | undefined
}

//bang

const HomeAdmin: FC<HomeAdminProps> = ({month,setMonth,loading,setLoading,dataAdminAMonth,dataAdminEachMonth}) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true)
        const selectedMonth = parseInt(event.target.value);
        setMonth(selectedMonth);
    };
    return (
        <section className={"container mx-auto px-auto overflow-auto h-[90vh] w-[81vw] pb-[50px]"}>
            <section className={'mb-3 p-2'}>
                <label htmlFor="months">Select a month: </label>
                <select name="months" id="months" value={month} onChange={handleChange} disabled={loading} defaultValue={month}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </section>
            <section className={"flex flex-1 flex-wrap justify-center md:justify-around gap-4 mb-5"}>
                <CardComponent text={"User Created"} total={dataAdminAMonth?.userCreate}/>
                <CardComponent text={"Store Created"} total={dataAdminAMonth?.storeCreate}/>
                <CardComponent text={"Total Income"} total={dataAdminAMonth?.totalProfitSum}/>
            </section>
            <section className={'w-full pt-5'}>
               <ChartAdmin dataAdminEachMonth={dataAdminEachMonth}/>
            </section>
        </section>
    );
}

export default HomeAdmin;

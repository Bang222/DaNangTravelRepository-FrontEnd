import React, {FC} from 'react';
import CardComponent from "@/components/seller/CardComponent";
import ChartAndBody from "@/components/seller/dasboard/ChartAndBody";
import LineCustom from "@/components/ui/LineCustom";
import {DataDashBoardDTO} from "@/types/seller";
import Paragraph from "@/components/ui/Paragraph";

interface HomeManagerProps {
    dataManagerAMonth:DataDashBoardDTO
    month:number
    setMonth: React.Dispatch<React.SetStateAction<number>>
}

//bang

const HomeManager: FC<HomeManagerProps> = ({dataManagerAMonth,setMonth,month}) => {
    const [loading,setLoading] = React.useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true)
        const selectedMonth = parseInt(event.target.value);
        setMonth(selectedMonth);

    };
    React.useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]);
    return (
        <section className={"container mx-auto px-auto overflow-auto h-[90vh] w-[81vw] pb-[50px]"}>
            <section className={'mb-3 p-2'}>
                <label htmlFor="months">Select a month: </label>
                <select name="months" id="months" onChange={handleChange} disabled={loading} defaultValue={month}>
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
                <CardComponent text={"Tour"} total={dataManagerAMonth.totalTours}/>
                <CardComponent text={"Order"} total={dataManagerAMonth.totalOrder}/>
                <CardComponent text={"Total Income"} total={dataManagerAMonth.totalIncome}/>
                <CardComponent text={"Passengers"} total={dataManagerAMonth.totalPassengers}/>
            </section>
            <section className={'w-full pt-5'}>
                <ChartAndBody dataManagerAMonth={dataManagerAMonth}/>
            </section>
        </section>
    );
}

export default HomeManager;

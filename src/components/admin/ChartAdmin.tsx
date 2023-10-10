import React, {FC} from 'react';
import Paragraph from "@/components/ui/Paragraph";
import LineChartComponent from "@/components/seller/LineChartComponent";
import LineCustom from "@/components/ui/LineCustom";
import StatisticalOfTourComponent from "@/components/seller/StatisticalOfTourComponent";
import {Card} from "@mui/material";
import LineChartAdmin from "@/components/admin/chart/LineChartAdmin";
import {dataEachMonthOfAdmin} from "@/types/admin";

interface ChartAdminProps {
    dataAdminEachMonth: dataEachMonthOfAdmin[] |undefined
}

//bang

const ChartAdmin: FC<ChartAdminProps> = ({dataAdminEachMonth}) => {
    return (
        <Card sx={{ width: '100%'}}>
            <div className={'text-center pt-4 font-bold'}>
                <Paragraph>Chart ToTal InCome EachMonth</Paragraph>
            </div>
            <div className={'flex justify-center'}>
                <LineChartAdmin  dataAdminEachMonth={dataAdminEachMonth}/>
            </div>
            <div className={'py-3'}> <LineCustom size={'100%'}/> </div>
        </Card>
    );
}

export default ChartAdmin;

import React, {FC} from 'react';
import LineChartComponent from "@/components/seller/LineChartComponent";
import {Card} from "@mui/material";
import LineCustom from "@/components/ui/LineCustom";
import StatisticalOfTourComponent from "@/components/seller/StatisticalOfTourComponent";
import {DataDashBoardDTO} from "@/types/seller";
import Paragraph from "@/components/ui/Paragraph";

interface CharAndBodyProps {
    dataManagerAMonth:DataDashBoardDTO
}

//bang

const ChartAndBody: FC<CharAndBodyProps> = ({dataManagerAMonth}) => {
    return (
        <Card sx={{ width: '100%'}}>
            <div className={'text-center pt-4 font-bold'}>
                <Paragraph>Chart ToTal InCome EachMonth</Paragraph>
            </div>
            <div className={'flex justify-center'}>
                <LineChartComponent/>
            </div>
            <div className={'py-3'}> <LineCustom size={'100%'}/> </div>
            <div className={'py-3 px-5 flex flex-wrap justify-center bg-gray-600'}>
                <StatisticalOfTourComponent text={'Like'} total={dataManagerAMonth.totalLike}/>
                <StatisticalOfTourComponent text={'Comment'} total={dataManagerAMonth.totalComments}/>
                <StatisticalOfTourComponent text={'Adults'} total={dataManagerAMonth.totalAdults}/>
                <StatisticalOfTourComponent text={'Children'} total={dataManagerAMonth.totalChildren}/>
                <StatisticalOfTourComponent text={'Toddler'} total={dataManagerAMonth.totalToddler}/>
                <StatisticalOfTourComponent text={'Infants'} total={dataManagerAMonth.totalInfants}/>
                <StatisticalOfTourComponent text={'Women'} total={dataManagerAMonth.totalWomen}/>
                <StatisticalOfTourComponent text={'Men'} total={dataManagerAMonth.totalMen}/>
            </div>
        </Card>
    );
}

export default ChartAndBody;

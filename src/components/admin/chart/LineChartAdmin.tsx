import {FC} from 'react';
import {LineChart} from "@mui/x-charts";
import * as React from "react";
import {dataEachMonthOfAdmin, getDataAMonthOfAdmin} from "@/types/admin";

interface LineChartAdminProps {
    dataAdminEachMonth: dataEachMonthOfAdmin[] |undefined
}

//bang

const LineChartAdmin: FC<LineChartAdminProps> = ({dataAdminEachMonth}) => {
    return (
        <LineChart
            xAxis={[{ data:dataAdminEachMonth?.map((item)=> item.month), label : 'Month' }]}
            series={[
                {
                    data: dataAdminEachMonth?.map((item)=> item.totalIncomeAMonthAdmin) , label:'VND'
                },
            ]}
            sx={{width:'80%',height:400}}
            width={600}
            height={400}
        />
    );
}

export default LineChartAdmin;

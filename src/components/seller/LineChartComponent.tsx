import {FC} from 'react';
import {LineChart} from "@mui/x-charts";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch} from "@/redux/store";
import {createAxios, DashboardDataManagerAMonth, DashboardDataManagerEachMonth} from "@/util/api/apiReuqest";
import {DataDashBoardDTO, DataDashBoardEachMonthDTO} from "@/types/seller";

interface LineChartComponentProps {
    // width:number;
    // height:number
}

//bang

const LineChartComponent: FC<LineChartComponentProps> = () => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const currenDay = new Date()
    const [month, setMonth] = React.useState<number>(currenDay.getMonth());
    const router = useRouter()
    const queryClient = useQueryClient()

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)

    const {
        data: dataManagerEachMonth,
        isLoading: isLoadingManagerEachMonth,
        isError: isErrorManagerEachMonth
    }:DataDashBoardEachMonthDTO = useQuery(['dataDashEachMonthBoardChart', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await DashboardDataManagerEachMonth(accessToken, userId, axiosJWT)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await DashboardDataManagerEachMonth(accessToken, userId, axiosJWT)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    return isLoadingManagerEachMonth ? <div>Loading...</div>: (
        <LineChart
            xAxis={[{ data:dataManagerEachMonth?.map((item)=> item.month), label : 'Month' }]}
            series={[
                {
                    data: dataManagerEachMonth?.map((item)=> item.totalIncome) , label:'VND'
                },
            ]}
            sx={{width:'80%',height:400}}
            width={600}
            height={400}
        />
    );
}

export default LineChartComponent;

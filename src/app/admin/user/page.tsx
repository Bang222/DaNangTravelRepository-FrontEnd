'use client'
import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppDispatch} from "@/redux/store";
import {createAxios} from "@/util/api/apiReuqest";
import {adminGetAllStore, adminGetAllUser} from "@/util/api/apiReuqestAdmin";
import {CircularProgress, Pagination, Stack} from "@mui/material";
import TableStore from "@/components/admin/table/tableStore";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [page, setPage] = React.useState(1);
    const queryClient = useQueryClient()


    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux, dispatch)
    const {data, isLoading, isError} = useQuery(['getAllUserAdmin', userId],
        async () => {
            try {
                let time: number = 2000;
                let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const res = await adminGetAllUser(accessToken, axiosJWT, userId, page)
                if (res.message) {
                    setTimeout(async () => {
                        const res = await adminGetAllUser(accessToken, axiosJWT, userId, page)
                        return res
                    }, time + randomNumber)
                }
                return res
            } catch (e) {
                throw new e
            }
        }
    )
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    React.useEffect(()=>{
        queryClient.fetchQuery(['getAllUserAdmin', userId])
    },[page])
    return isLoading || isError ? (
        <div className={'flex justify-center w-screen items-center absolute z-100 h-screen bg-light'}>
            <CircularProgress color="secondary"/>
        </div>
    ) : (
        <>
            <table className="table-auto border border-solid w-full text-left">
                <thead className={'border bg-black text-white border-solid'}>
                <tr>
                    <th className={'p-2'}>#</th>
                    <th className={'p-2'}>Email</th>
                    <th className={'p-2'}>phone</th>
                    <th className={'p-2'}>Created</th>
                    <th className={'p-2'}>Active</th>
                    <th className={'p-2'}>EmailValidated</th>
                    <th className={'p-2'}>Action</th>
                </tr>
                </thead>
                {data?.data.map((item, index) => (
                    <tbody key={item.id}>
                    </tbody>
                ))}
            </table>
            <Stack sx={{paddingTop: '12px'}} spacing={2}>
                <Pagination sx={{display: 'flex', justifyContent: 'center'}} color="secondary" count={Math.ceil(data?.totalUser / 10)} page={page}
                            onChange={handleChange}/>
            </Stack>
        </>
    )
}

export default Page;

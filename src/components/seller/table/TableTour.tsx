import {FC} from 'react';
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useSelector} from "react-redux";
import {getTourOfStore} from "@/util/api/apiReuqest";
import {useQuery} from "@tanstack/react-query";

interface TableTourProps {
}

//bang

const TableTour: FC<TableTourProps> = ({}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const {
        data: getTourOfStoreData,
        isLoading: isLoadingGetTourOfStore,
        isError: isErrorGetTourOfStore,
        isSuccess: isSuccessGetTourOfStore
    } = useQuery(['TourOfStore', userId], () =>
        getTourOfStore(accessToken, userId)
    );
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    console.log(getTourOfStoreData)
    return (
        <table
            className="table table-cell w-[89vw] lg:w-[80vw] w-full text-gray-400 border-separate space-y-6 text-sm">
            <thead class="bg-black text-white">
            <tr>
                <th scope="col" className=" px-2 py-1">#</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Id</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Name</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Price</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Description</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Address</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">StartAddress</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">EndingAddress</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">CreatedAt</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Status</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Input amount</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">The remaining amount</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">ImageUrl</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">UpVote</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Last Register</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">StartDate</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">EndDate</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Schedules</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Comments</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1">Action</th>
            </tr>
            </thead>
            <tbody>
            {isLoadingGetTourOfStore ? <div>Loading...</div> :
                <>
                    {getTourOfStoreData?.length === 0 ? (<div className={'text-red-600 items-center h-[300px] w-[10vw] flex justify-center'}>Data Null</div>) : <>
                        {getTourOfStoreData?.map((item, index) => {
                            const createAt = new Date(item.createdAt)
                            const lastDayRegister = new Date(item.lastRegisterDate)
                            const startDay = new Date(item.startDate)
                            const endDay = new Date(item.endDate)
                            const formattedDescription = item.description.length > 20 ? `${item.description.substring(0, 20) + '...'}` : item.description

                            const formattedCreateAt = createAt.toLocaleDateString('es-uk', options)
                            const formatLastDayRegister = lastDayRegister.toLocaleDateString('es-uk', options)
                            const formattedStartDay = startDay.toLocaleDateString('es-uk', options)
                            const formattedEndDay = endDay.toLocaleDateString('es-uk', options)

                            const formatPrice = item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
                            return (
                                <tr className="border-b text-black text-[12px]" key={item.id}>
                                    <td className="whitespace-nowrap px-2 py-1 font-medium">{index + 1}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.id}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.name}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{formatPrice}</td>
                                    <td className="whitespace-nowrap px-2 py-1 truncate line-clamp-2">{formattedDescription}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.address}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.startAddress}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.endingAddress}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{formattedCreateAt}</td>
                                    <td className="whitespace-nowrap px-2 py-1">
                                    <span className={`${
                                        item.status === 'available'
                                            ? 'bg-green-500 text-white'
                                            : item.status === 'TRAVELED'
                                                ? 'bg-red-500 text-white'
                                                : item.status === 'full slot'
                                                    ? 'bg-yellow-500 text-white'
                                                    : item.status === 'out of date register' ?
                                                        'bg-pink-600 text-white'
                                                        : item.status === 'traveling' ? 'bg-blue-500 text-white' : ''
                                    } py-1 px-2 rounded-full`}
                                    >{item.status} </span>

                                    </td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.baseQuantity}</td>
                                    {item.quantity > 0 && item.status !== 'available' ?
                                        <td className="whitespace-nowrap px-2 py-1 text-red-400">{item.quantity}</td> :
                                        <td className="whitespace-nowrap px-2 py-1">{item.quantity}</td>
                                    }
                                    <td className="whitespace-nowrap px-2 py-1">{item.imageUrl.length}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.upVote.length - 1}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{formatLastDayRegister}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{formattedStartDay}</td>
                                    <td className="whitespace-nowrap px-2 py-1 font-bold">{formattedEndDay}</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.schedules.length} days</td>
                                    <td className="whitespace-nowrap px-2 py-1">{item.comments.length === 0 ? '' : item.comments.length} {item.comments.length === 0 ? 'null' : item.comments.length === 1 ? 'comment' : 'comments'} </td>
                                    <td className="whitespace-nowrap px-2 py-1 cursor-pointer">
                                        {item.status !== 'TRAVELED' ?
                                            <span className='ml-2'><EditNoteIcon sx={{color: '#B2B200'}}/></span> :
                                            <span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                                        <span className='ml-2'><RemoveRedEyeIcon sx={{color: 'green'}}/></span>
                                        <span className='ml-2'><DeleteIcon sx={{color: 'red'}}/></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </>
                    }
                </>
            }
            </tbody>
        </table>
    );
}

export default TableTour;
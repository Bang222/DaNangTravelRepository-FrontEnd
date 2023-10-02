import {FC} from 'react';
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createAxios, deleteTourAPI, getTourOfStore} from "@/util/api/apiReuqest";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import MakeSureDeleteTour from "@/components/seller/MakeSureDeleteTour";
import {router} from "next/client";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
import ModalOfPassenger from "@/components/seller/modal/ModalOfPassenger";
import {AppDispatch} from "@/redux/store";
import ModalDetailPassengerOfTour from "@/components/seller/modal/ModalDetailPassengerOfTour";
import ModalEditTour from "@/components/seller/modal/ModalEditTour";

interface TableTourProps {
    page:number
    userId:string
    setTotalPage:React.Dispatch<React.SetStateAction<number>>
}

// tour manager

const TableTour: FC<TableTourProps> = ({page,userId,setTotalPage}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const queryClient = useQueryClient();

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const router = useRouter()
    const {
        data: getTourOfStoreData,
        isLoading: isLoadingGetTourOfStore,
        isError: isErrorGetTourOfStore,
        isSuccess: isSuccessGetTourOfStore
    } = useQuery(['TourOfStore', userId], async () =>
         getTourOfStore(accessToken, userId, axiosJWT,page),
    );
    const {mutate:mutateDeleteTourByID,isSuccess:isSuccessDeleteTour,isError:isErrorDeleteTour} = useMutation(
        async (tourId:string) => {
            try{
                const res = deleteTourAPI(accessToken,userId,tourId,axiosJWT)
            }catch(e) {
                throw new Error(e)
            }
        },{
            onSuccess() {
                queryClient.invalidateQueries(['TourOfStore', userId]);
                toast.success('Delete Success')

            },
            onError(error){
                toast.error(error.message)
            }
        }
    )
    React.useEffect(()=>{
        setTotalPage(getTourOfStoreData?.pages)
    },[getTourOfStoreData])
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const handleDelete = (tourId:string) => {
        mutateDeleteTourByID(tourId)
    }
    const handleDetail = (tourId:string) => {
        router.push(`/tour/${tourId}`)
    }
    return (
        <table
            className="table table-auto w-[89vw] lg:w-[80vw] w-full text-gray-400 space-y-6 text-sm border-black border-solid">
            <thead class="bg-black text-white">
            <tr>
                <th scope="col" className=" px-2 py-1">#</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Name</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Price</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Address</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">StartAddress</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">EndingAddress</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">CreatedAt</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Status</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Input amount</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Sold</th>
                {/*<th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">ImageUrl</th>*/}
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">UpVote</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Last Register</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">StartDate</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">EndDate</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Total Day</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Passenger</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Comments</th>
                <th scope="col" className="whitespace-nowrap px-2 py-1 border border-solid">Action</th>
            </tr>
            </thead>
            <tbody>
            {isLoadingGetTourOfStore ? <div>Loading...</div> :
                <>
                    {getTourOfStoreData?.findTourToStore.length === 0 ? (<div className={'text-red-600 items-center h-[300px] w-[10vw] flex justify-center'}>Data Null</div>) : <>
                        {getTourOfStoreData?.findTourToStore.map((item, index) => {
                            const createAt = new Date(item.createdAt)
                            const lastDayRegister = new Date(item.lastRegisterDate)
                            const startDay = new Date(item.startDate)
                            const endDay = new Date(item.endDate)
                            // const formattedDescription = item.description.length > 20 ? `${item.description.substring(0, 20) + '...'}` : item.description

                            const formattedCreateAt = createAt.toLocaleDateString('es-uk', options)
                            const formatLastDayRegister = lastDayRegister.toLocaleDateString('es-uk', options)
                            const formattedStartDay = startDay.toLocaleDateString('es-uk', options)
                            const formattedEndDay = endDay.toLocaleDateString('es-uk', options)

                            const formatPrice = item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
                            return (
                                <tr className="border-b text-black text-[12px] break-words" key={item.id}>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid font-medium">{index + 1}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid w-[5%]"><span className={'break-word'}>{item.name}</span></td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{formatPrice}</td>
                                    {/*<td className="whitespace-nowrap px-2 py-1 border border-solid truncate line-clamp-2">{formattedDescription}</td>*/}
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.address}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.startAddress}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.endingAddress}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{formattedCreateAt}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">
                                    <span className={`${
                                        item.status === 'available'
                                            ? 'bg-green-500 text-white'
                                            : item.status === 'TRAVELED'
                                                ? 'bg-black text-white'
                                                : item.status === 'full slot'
                                                    ? 'bg-yellow-500 text-white'
                                                    : item.status === 'out of date register' ?
                                                        'bg-pink-600 text-white'
                                                        : item.status === 'traveling' ? 'bg-blue-500 text-white' :
                                                            item.status === 'delete' ?'bg-red-500 text-white': ''
                                    } my-3 py-1 border border-solid px-2 rounded-full`}
                                    >{item.status} </span>

                                    </td>
                                    <td className="whitespace-nowrap px-2 py-1 border border-solid">{item.baseQuantity}</td>
                                    {item.quantity > 0 && item.status !== 'available' ?
                                        <td className="whitespace-nowrap px-2 py-2 border border-solid text-red-400">{ item.baseQuantity-item.quantity}</td> :
                                        <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.quantity}</td>
                                    }
                                    {/*<td className="whitespace-nowrap px-2 py-1 border border-solid">{item.imageUrl.length}</td>*/}
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.upVote.length - 1}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{formatLastDayRegister}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{formattedStartDay}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid font-bold">{formattedEndDay}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.schedules.length}</td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid text-center">{item.quantity}
                                        {item.orderDetails.length> 0 ?  <span> | <ModalDetailPassengerOfTour passengers={item.orderDetails.flatMap(((orderDetail) => orderDetail.passengers))}/></span> :'' }
                                    </td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid">{item.comments.length === 0 ? '' : item.comments.length} {item.comments.length === 0 ? 'null' : item.comments.length === 1 ? 'comment' : 'comments'} </td>
                                    <td className="whitespace-nowrap px-2 py-2 border border-solid cursor-pointer">
                                        {item.status === 'available' || item.status === 'full slot' || item.status === 'out of date register'   ?
                                            <span className='ml-2'>
                                                <ModalEditTour dataTour={item}/>
                                            </span> :
                                            <span className={'cursor-default'}>
                                                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </span>
                                        }
                                        <span className='ml-2' onClick={() => handleDetail(item.id)}>
                                            <RemoveRedEyeIcon sx={{color: 'green'}}/>
                                        </span>
                                        {item.status !== 'delete' && item.baseQuantity === item.quantity?
                                        <span className='ml-2'>
                                          <MakeSureDeleteTour handleDelete ={handleDelete} tourId ={item.id}/>
                                        </span>
                                            : <span className={'cursor-default'}> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
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

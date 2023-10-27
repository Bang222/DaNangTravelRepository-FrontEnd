'use client'
import React, {FC, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from "react-redux";
import Paragraph from "@/components/ui/Paragraph";
import FormatDate from "@/components/ui/FormatDate";
import {AuthState, logIn, updateUserDetails} from "@/redux/feature/auth-slice";
import {AppDispatch, RootState, store} from "@/redux/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {createAxios, EditStoreAPI, loginAPI} from "@/util/api/apiReuqest";
import {EditStoreDTO} from "@/types/seller";
import {AxiosInstance} from "axios/index";
import {toast} from "react-toastify";
import {router} from "next/client";


interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const user = useSelector((state:RootState) => state.auth.value?.user)
    const accessToken:string = useSelector((state:RootState) => state.auth.value?.token.access)
    const [isEditing, setIsEditing] = React.useState(false);
    const userData:AuthState=useSelector((state:RootState) => state.auth.value)

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux:AuthState = useSelector((state:RootState) => state.auth?.value)
    let axiosJWT:AxiosInstance = createAxios(dataRedux, dispatch)

    const {mutate, isLoading, data} = useMutation(async (editStore:EditStoreDTO) =>{
        try {
            let time: number = 2000;
            let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
            const res = await EditStoreAPI(accessToken,axiosJWT,user.id,editStore)
            if(res.statusCode !== 200) {
                setTimeout(async () => {
                    const res = await EditStoreAPI(accessToken, axiosJWT, user.id, editStore)
                    return res
                },time + randomNumber)
            }
            return res
        } catch(e:any){
            throw new Error(e)
        }
    }, {
        onSuccess: (data) => {
            if (data.statusCode === 200) {
                dispatch(updateUserDetails({ name: data.name, paymentId:data.paymentId }))
                setIsEditing(!isEditing)
                return toast.success(data.message)
            }
            return toast.error(data.message)
        },
        onError: (error: any) => {
            toast.error(error)
        }
    })


    const formik = useFormik({
        initialValues: {
            name: user.store.name,
            paymentId: user.store.paymentId,
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values) => {
            if(!values.name && !values.paymentId){
                return;
            }
            const editStore:EditStoreDTO = {
                name: values.name,
                paymentId: values.paymentId,
                storeId: user.store.id
            };
            mutate(editStore)
        },
    });
    const handleOnClicked = () => {
        setIsEditing(!isEditing)
    }
    useEffect(() => {
        document.title = `Profile`
    }, [])
    return (
        <section className={"container mx-auto px-auto h-[84vh]"}>
            <div>
            <button className={ isEditing ? " p-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full": "p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"} onClick={()=> handleOnClicked()}>
                {isEditing ? "Back" : "Edit"}
            </button>
            </div>
            <div className={"h-[50%] lg:mt-[100px]"}>
                <div className={'grid grid-cols-5 h-full gap-4 mt-12 lg:mt-0'}>
                    <div className={'col-span-5 lg:col-span-2'}>
                        <Avatar alt="Remy Sharp" src={user.profilePicture}
                                sx={{width: '200px', height: '200px', backgroundColor: 'red'}}/>
                    </div>
                    <div className={"col-span-2 lg:col-span-1 font-bold flex flex-wrap mt-8 lg:mt-0"}>
                        <div>
                            <Paragraph>Name</Paragraph>
                            <Paragraph>Create</Paragraph>
                            <Paragraph>Email</Paragraph>
                            <Paragraph>PayPalId</Paragraph>
                        </div>
                    </div>
                    <div className={"col-span-3 lg:col-span-1 mt-8 lg:mt-0 flex flex-wrap "}>
                        {isEditing ? (
                            <form className={'pb-5'} onSubmit={formik.handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name={"name"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                <Paragraph>
                                    <FormatDate date={user.store.createdAt} />
                                </Paragraph>
                                <Paragraph>{user.email}</Paragraph>
                                <textarea
                                    className="h-full w-full"
                                    name={"paymentId"}
                                    value={formik.values.paymentId}
                                    onChange={formik.handleChange}
                                />
                            </div>
                                <button
                                    className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                                    type={"submit"}
                                >
                                    {isLoading ? "Submitting" : "Submit"}
                                </button>
                            </form>
                        ) : (
                            <div className={''}>
                                <Paragraph>{user.store.name}</Paragraph>
                                <Paragraph>
                                    <FormatDate date={user.store.createdAt} />
                                </Paragraph>
                                <Paragraph>{user.email}</Paragraph>
                                <Paragraph>
                                    <span className={"break-all"}>{user.store.paymentId}</span>
                                </Paragraph>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;

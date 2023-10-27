'use client'
import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from 'next/navigation';
import Paragraph from "@/components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";
import Label from "@/components/ui/Label";
import Link from "next/link";
import {RegisterApi} from "@/util/api/apiReuqest";
import {useMutation} from "@tanstack/react-query";

interface props {
}

const RegisterForm: () => JSX.Element = () => {
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("")
    const router = useRouter()


    const {mutate, isLoading,data} = useMutation(RegisterApi, {
        onSuccess: (data) => {
            if(data.statusCode > 200) return setRegisterError(data.message)
            setRegisterSuccess('Confirm your email')
            setRegisterError('')
        },
        onError: (error) => {
            setRegisterError('server');
            setRegisterSuccess('');
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: '',
            firstName: "",
            lastName: "",
            address: "",
            sex: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required('Please Input First Name'),
            lastName: Yup.string().required('Please Input Last Name'),
            address: Yup.string().required('Please Input Address'),
            sex: Yup.string().required('null'),
            email: Yup.string()
                .max(50, "Maximum 20 characters")
                .min(6, "Minimum 6 characters")
                .required("Please Input Email"),
            password: Yup.string()
                .required("Please Input Password"),
            confirmPassword: Yup.string()
                .required("Please Input Confirm Password").oneOf([Yup.ref('password')], 'Password Does not match')
        }),
        onSubmit: (values) => {
            const RegisterDTO = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                address: values.address,
                sex: values.sex,
            };
            mutate(RegisterDTO)
        },
    });
    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }
    return (
        <section className="flex items-center justify-center h-screen">
            <div
                className="bg-neutral-500 sm:w-[500px] sm:h-min[700px] max-sm:w-max-[400px] max-sm:h-max-[650px] flex justify-center rounded-md">
                <div className={'pl-7 pr-7 pt-5 pb-3 w-full'}>
                    {/*<div className={'pb-5 text-center font-bold'}>*/}
                    {/*    <LargeHeading size="sm" className={'text-center'}>Register</LargeHeading>*/}
                    {/*</div>*/}
                    <form className={'pb-2'} onSubmit={formik.handleSubmit}>
                        <div className={'grid grid-cols-2 gap-2.5'}>
                            <div>
                                <Label>First Name</Label>
                                <div className="pt-[4px] pb-[4px] text-black">
                                    <input type='text'
                                           placeholder='firstName'
                                           name='firstName'
                                           id="firstName"
                                           className={'w-full p-1 h-[32px]  rounded-[8px] '}
                                           required
                                           value={formik.values.firstName}
                                           onChange={formik.handleChange}
                                    />
                                    <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.firstName}</p>
                                </div>
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <div className="pt-[4px] pb-[4px] text-black">
                                    <input type='text'
                                           placeholder='lastName'
                                           name='lastName'
                                           id="lastName"
                                           className={'w-full p-1 h-[32px]  rounded-[8px] '}
                                           required
                                           value={formik.values.lastName}
                                           onChange={formik.handleChange}
                                    />
                                    <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.lastName}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'grid grid-cols-4 gap-2.5'}>
                            <div className={'col-span-3'}>
                                <Label>Address</Label>
                                <div className="pt-[4px] pb-[4px] text-black">
                                    <input type='text'
                                           placeholder='City'
                                           name='address'
                                           id="address"
                                           className={'w-full p-1 h-[32px] rounded-[8px] '}
                                           required
                                           value={formik.values.address}
                                           onChange={formik.handleChange}
                                    />
                                    <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.address}</p>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sex" className="max-md:text-[12px]">
                                    Sex:
                                </label>
                                <select id={'sex'} value={formik.values.sex} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className=" rounded-[8px] mt-[4px] h-[32px] text-black">
                                    <option value=''>Choose</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='LGBT'>LGBT</option>
                                </select>
                                <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.sex}</p>
                            </div>
                        </div>
                        <Label>Email</Label>
                        <div className="pt-[4px] pb-[4px] text-black">
                            <input type='text'
                                   placeholder='email'
                                   name='email'
                                   id="email"
                                   className={'w-full p-1 h-[32px]  rounded-[8px] '}
                                   required
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.email}</p>
                        </div>
                        <Label>Password</Label>
                        <div className="pt-[4px] pb-[4px] text-black">
                            <input type='password'
                                   placeholder='Password'
                                   name='password'
                                   id="password"
                                   className={'w-full p-1 h-[32px]  rounded-[8px] '}
                                   required
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.password}</p>
                        </div>
                        <Label>Confirm Password</Label>
                        <div className="pt-[4px] pb-[24px] text-black">
                            {showHidePassword ? <>
                                    <input type='password'
                                           id='confirmPassword'
                                           placeholder='confirmPassword'
                                           name='confirmPassword'
                                           color={'black'}
                                           className={'w-full p-1 h-[32px]  rounded-[8px] text-black '}
                                           required
                                           value={formik.values.confirmPassword}
                                           onChange={formik.handleChange}

                                    />
                                    <p className="absolute bottom-50 right-3 top-[24px] cursor-pointer"
                                       onClick={handleShowHidePassword}
                                    ><i style={{
                                        font: "normal normal normal 16px/1 FontAwesome",
                                        fontSize: "inherit",
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "black"
                                    }} className="fa-thin fa-eye-slash"/></p>
                                </> :
                                <>
                                    <input type='text' id='confirmPassword' placeholder='confirmPassword'
                                           value={formik.values.confirmPassword}
                                           onChange={formik.handleChange}/>
                                    <p className="absolute bottom-50 right-3 top-[24px] cursor-pointer"
                                       onClick={handleShowHidePassword}
                                    ><i style={{
                                        font: "normal normal normal 16px/1 FontAwesome",
                                        fontSize: "inherit",
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "black"
                                    }} className="fa-thin fa-eye"/></p>
                                </>
                            }
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.confirmPassword}</p>
                        </div>
                        {isLoading ?
                            <button
                                className="max-md:text-[15px] submit-button text-[18px] font-medium bg-zinc-700 rounded-xl flex justify-center shadow-md cursor-progress  pt-[5px] pb-[5px] w-full"
                                disabled
                                type={"submit"}
                            >
                                Loading...
                            </button>
                            :
                            <button
                                className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer  pt-[5px] pb-[5px] w-full"
                                type={"submit"}
                            >
                                Register
                            </button>
                        }
                    </form>
                    <div className={'w-full flex justify-center '}>
                        <Paragraph>You got a account?</Paragraph>
                        <Link className={'flex justify-center items-center mb-2 max-md:mb-2 text-blue-300 text-[17px] max-md:text-[12px]'}
                              href={"/login"}>Login here</Link>
                    </div>
                    {registerError && <Paragraph status={"error"} className={'text-center'}>{registerError}</Paragraph>}
                    {registerSuccess && <a className={'flex justify-center text-blue-300 text-[12px] font-bold'} href={'https://mail.google.com/mail/u/0/#inbox'}>{registerSuccess} </a>}
                </div>
            </div>
        </section>
    );
}

export default RegisterForm;
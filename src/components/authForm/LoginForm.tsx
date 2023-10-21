'use client';

import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from 'next/navigation';
import Paragraph from "@/components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import {bookingAPI, loginAPI, loginWithGoogle} from "@/util/api/apiReuqest";
import {setCookie} from "@/util/api/cookies";
import {logIn} from '@/redux/feature/auth-slice'
import {useDispatch} from 'react-redux'
import {AppDispatch} from "@/redux/store";
import GoogleIcon from '@mui/icons-material/Google';
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios";
import {toast} from "react-toastify";

const LoginForm: () => JSX.Element = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const [loginError, setLoginError] = useState("");
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)
    const {mutate:google, isLoading:googleLoading, data: googleData} = useMutation(
        async (accessToken:string) => {
            try {
                const res = loginWithGoogle(accessToken)
                return res
            } catch(e){
                throw new Error(e)
            }
        }, {
            onSuccess: (googleData) => {
                if(googleData.message){
                    return setLoginError(googleData.message)
                }
                const token = googleData?.token?.access
                setCookie('token', token)
                dispatch(logIn(googleData));
                router.push('/');
            },
            onError: (error) => {
                setLoginError(error.error);
            },
        }
    )
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const accessToken = tokenResponse.access_token;
            google(accessToken)
        },
        onError: (error) => toast.error('can not login Google')
    });
    const {mutate, isLoading, data: userData} = useMutation(loginAPI, {
        onSuccess: (userData) => {
            if(userData.error) return setLoginError(userData.error);
            const token = userData.token.access
            setCookie('token', token)
            dispatch(logIn(userData));
            router.push('/');
        },
        onError: (error) => {
            setLoginError(error.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(50, "Maximum 20 characters")
                .min(6, "Minimum 6 characters")
                .required("Please Input UserName"),
            password: Yup.string()
                .required("Please Input Password")
            // .matches(
            //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,19}$/,
            //     "Minimum 6 characters, at least one letter, one number, one special character"
            // ),
        }),
        onSubmit: (values) => {
            const loginDTO = {
                email: values.email,
                password: values.password,
            };
            mutate(loginDTO)
        },
    });
    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }
    React.useEffect(()=>{
        if(googleData?.message) {
            setLoginError(googleData.message)
        }
    },[googleData])
    return (
        <section className="flex items-center justify-center h-screen">
            <div
                className="bg-neutral-500 w-[93vw] sm:w-[420px] sm:h-min-[450px] flex justify-center rounded-md">
                <div className={'p-7 w-full'}>
                    <div className={'pb-7 text-center font-bold'}>
                        <LargeHeading size="sm">LOG IN</LargeHeading>
                    </div>
                    <form className={'pb-5'} onSubmit={formik.handleSubmit}>
                        <label className={'font-bold'}>Email</label>
                        <div className="pt-[8px] pb-[24px] text-black">
                            <input type='text'
                                   placeholder='email'
                                   name='email'
                                   id="email"
                                   className={'w-full h-[36px] p-1 rounded-[4px] '}
                                   required
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                            />
                            <Paragraph status={'error'}>{formik.errors.email}</Paragraph>
                        </div>
                        <label className={'font-bold'}>Password</label>
                        <div className="pt-[8px] pb-[24px] text-black">
                            {showHidePassword ? <>
                                    <input type='password'
                                           id='password'
                                           placeholder='Password'
                                           name='password'
                                           color={'black'}
                                           className={'w-full h-[36px] p-1 rounded-[4px] text-black '}
                                           required
                                           value={formik.values.password}
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
                                    <input type='text' id='password' placeholder='Password'
                                           value={formik.values.password}
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
                            <Paragraph status={'error'}>{formik.errors.password}</Paragraph>
                        </div>
                        <button
                            className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                            type={"submit"}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                        {loginError && <Paragraph status={"error"} className={'text-center'}>{loginError}</Paragraph>}
                    </form>
                    
                    <div className={'w-full flex justify-center p-1'}>
                        <div className="bg-white rounded-lg shadow-lg">
                            <button onClick={() => login()}
                                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                                <span className="material-icons rounded-full bg-white mr-2"><GoogleIcon sx={{color:'blue'}}/></span>
                                <span>Login with Google</span>
                            </button>
                        </div>
                    </div>
                    <div className={'w-full flex justify-center p-1'}>
                        <Paragraph>Do you have a account? </Paragraph>
                        <Link href="/register"
                              className={'flex items-center mb-2 max-md:mb-2 text-blue-300 text-[17px] max-md:text-[12px]'}>Register
                            here</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;

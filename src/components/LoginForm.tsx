'use client'
import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginAPI} from "@/util/api/auth";
import {useRouter} from 'next/navigation';
import Paragraph from "@/components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";
import {useMutation} from "react-query";
import useStorage from "@/components/hooks/UseStorage";
import Link from "next/link";
// interface Props{
//     setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>
// }

const LoginForm: () => JSX.Element = () => {
    // const { setSwitchForm } = props
    const router = useRouter()

    const [loginError, setLoginError] = useState("");
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)

    const { mutate, isLoading } = useMutation(loginAPI, {
        onSuccess: (userRq) => {
            localStorage.setItem('token',userRq.token)
            router.push('/');
        },
        onError: (error) => {
            setLoginError(error.message);
        },
    });

    // async function handleLogin(loginDTO) {
    //     await loginAPI(loginDTO)
    // }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(20, "Maximum 20 characters")
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
    return (
        <section className="flex items-center justify-center h-screen">
            <div
                className="bg-neutral-500 sm:w-[420px] sm:h-min-[450px] max-sm:w-max-[300px] max-sm:h-[450px] flex justify-center rounded-md">
                <div className={'p-7 w-full'}>
                    <div className={'pb-7 text-center font-bold'}>
                        <LargeHeading size="sm">LOG IN</LargeHeading>
                    </div>
                    <form className={'pb-5'} onSubmit={formik.handleSubmit}>
                        <label>Email</label>
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
                        <label>Password</label>
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
                        {loginError && <Paragraph status={"error"} className={'text-center'} >{loginError}</Paragraph>}
                    </form>
                    <div className={'w-full flex justify-center p-1'}>
                        <a href="#" className="text-blue-200 max-md:text-[12px]">Forgot password</a>
                    </div>
                    <div className={'w-full flex justify-center p-1'}>
                        <Paragraph>Do you have a account? </Paragraph>
                        <Link href="/register" className={'mb-2 max-md:mb-2 text-blue-300 text-[17px] max-md:text-[12px]'}>Register here</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
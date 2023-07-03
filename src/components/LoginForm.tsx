'use client'
import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginAPI} from "@/util/api/auth";
import {useRouter} from 'next/navigation';
import Paragraph from "@/components/ui/Paragraph";
import Link from "next/link";
import LargeHeading from "@/components/ui/LargeHeading";
interface Props{
    setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm: (props) => JSX.Element = (props) => {
    const { setSwitchForm } = props
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)
    // const [email,setEmail] = useState<string>('')
    // const [password,setPassword] = useState<string>('')
    const router = useRouter()

    async function handleLogin(loginDTO, router) {
        await loginAPI(loginDTO, router)
    }

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
            handleLogin(loginDTO, router)
        },
    });
    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }
    return (
        <section className="flex items-center justify-center h-screen">
            <div
                className="bg-neutral-500 sm:w-[420px] sm:h-[450px] max-sm:w-[300px] max-sm:h-[450px] flex justify-center rounded-md">
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
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.email}</p>
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
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.password}</p>
                        </div>
                        <button
                            className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                            type={"submit"}
                        >
                            Log in
                        </button>
                    </form>
                    <div className={'w-full flex justify-center p-1'}>
                        <a href="#" className="text-blue-200 max-md:text-[12px]">Forgot password</a>
                    </div>
                    <div className={'w-full flex justify-center p-1'}>
                        <Paragraph>Do you have a account? </Paragraph>
                        <button onClick={(e) => setSwitchForm(false) } className={'mb-2 max-md:mb-2 text-blue-300 text-[17px] max-md:text-[12px]'}>Register here</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
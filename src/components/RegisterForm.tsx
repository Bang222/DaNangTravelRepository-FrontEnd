'use client'
import React, {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {RegisterApi} from "@/util/api/auth";
import {useRouter} from 'next/navigation';
import Paragraph from "@/components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";
import Label from "@/components/ui/Label";
import Link from "next/link";
interface Props{
    setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm: (props) => JSX.Element = (props) => {
    const {setSwitchForm} = props;
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)
    // const [email,setEmail] = useState<string>('')
    // const [password,setPassword] = useState<string>('')
    const router = useRouter()

    const handleRegister = async (RegisterDTO, router) => {
        await RegisterApi(RegisterDTO, router)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Please Input First Name'),
            email: Yup.string()
                .max(20, "Maximum 20 characters")
                .min(6, "Minimum 6 characters")
                .required("Please Input Email"),
            password: Yup.string()
                .required("Please Input Password")
            // .matches(
            //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,19}$/,
            //     "Minimum 6 characters, at least one letter, one number, one special character"
            // ),
        }),
        onSubmit: (values) => {
            const RegisterDTO = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                dayOfBirth: values.dayOfBirth,
                place: values.place,
                phone: values.phone,
            };
            handleRegister(RegisterDTO, router)
        },
    });
    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }
    return (
        <section className="flex items-center justify-center h-screen">
            <div
                className="bg-neutral-500 sm:w-[500px] sm:h-min[700px] max-sm:w-max-[400px] max-sm:h-max-[650px] flex justify-center rounded-md">
                <div className={'p-7 w-full'}>
                    <div className={'pb-7 text-center font-bold'}>
                        <LargeHeading size="sm" className={'text-center'}>Register</LargeHeading>
                    </div>
                    <form className={'pb-5'} onSubmit={formik.handleSubmit}>
                        <div className={'grid grid-cols-2 gap-2.5'}>
                            <div>
                                <Label>First Name</Label>
                                <div className="pt-[8px] pb-[12px] text-black">
                                    <input type='text'
                                           placeholder='firstName'
                                           name='firstName'
                                           id="firstName"
                                           className={'w-full h-[36px] p-1 rounded-[4px] '}
                                           required
                                           value={formik.values.firstName}
                                           onChange={formik.handleChange}
                                    />
                                    <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.firstName}</p>
                                </div>
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <div className="pt-[8px] pb-[12px] text-black">
                                    <input type='text'
                                           placeholder='lastName'
                                           name='lastName'
                                           id="lastName"
                                           className={'w-full h-[36px] p-1 rounded-[4px] '}
                                           required
                                           value={formik.values.lastName}
                                           onChange={formik.handleChange}
                                    />
                                    <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.firstName}</p>
                                </div>
                            </div>
                        </div>
                        <Label className={'max-md:text-[12px]'}>Phone</Label>
                        <div className="pt-[8px] pb-[12px] text-black">
                            <input type='text'
                                   placeholder='phone'
                                   name='phone'
                                   id="phone"
                                   className={'w-full h-[36px] p-1 rounded-[4px] '}
                                   required
                                   value={formik.values.phone}
                                   onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.firstName}</p>
                        </div>
                        <Label>address</Label>
                        <div className="pt-[8px] pb-[12px] text-black">
                            <input type='text'
                                   placeholder='address'
                                   name='address'
                                   id="address"
                                   className={'w-full h-[36px] p-1 rounded-[4px] '}
                                   required
                                   value={formik.values.address}
                                   onChange={formik.handleChange}
                            />
                            <p className="errorMsg pl-[4px] text-red-600 text-[12px]">{formik.errors.firstName}</p>
                        </div>
                        <Label>Email</Label>
                        <div className="pt-[8px] pb-[12px] text-black">
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
                        <Label>Password</Label>
                        <div className="pt-[8px] pb-[12px] text-black">
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
                            className="submit-button max-md:text-[16px] text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"
                            type={"submit"}
                        >
                            Register
                        </button>
                    </form>
                    <div className={'w-full flex justify-center p-1'}>
                        <Paragraph>You got a account?</Paragraph>
                        <Link to={'/login'}  className={'mb-2 max-md:mb-2 text-blue-300 text-[17px] max-md:text-[12px]'} href={"/login"}>Login here</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterForm;
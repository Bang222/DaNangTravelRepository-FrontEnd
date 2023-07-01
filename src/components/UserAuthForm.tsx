'use client'
import {FC, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginAPI} from "@/util/api/auth";
import { useRouter } from 'next/navigation';

const UserAuthForm: () => JSX.Element = () =>{
    const [showHidePassword, setShowHidePassword] = useState<boolean>(true)
    // const [email,setEmail] = useState<string>('')
    // const [password,setPassword] = useState<string>('')
    const router = useRouter()
    async function handleLogin(loginDTO,router) {
        const res = await loginAPI(loginDTO,router)
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
             handleLogin(loginDTO,router)
        },
    });
    const handleShowHidePassword = () => {
        setShowHidePassword(!showHidePassword)
    }
    return (
        <div className="login-section">
            <div className="login-box">
                <h2>LOG IN</h2>
                <form onSubmit={formik.handleSubmit} >
                    <label>Email</label>
                    <div className="user-box">
                        <input type='text'
                               placeholder='email'
                               name='email'
                               id="email"
                               required
                               value={formik.values.email}
                               onChange={formik.handleChange}
                        />
                    </div>
                    <div className={"h-[12px]"}></div>
                    <p className="errorMsg">{formik.errors.email}</p>
                    <div className={"h-[20px]"}></div>
                    <label>Password</label>
                    <div className="user-box">
                        {showHidePassword ? <>
                                <input type='password'
                                       id='password'
                                       placeholder='Password'
                                       name='password'
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
                                    color: "white"
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
                                    color: "white"
                                }} className="fa-thin fa-eye"/></p>
                            </>
                        }
                        <div className={"h-[20px]"}></div>
                        <p className="errorMsg">{formik.errors.password}</p>
                    </div>
                    <button className="submit-button"
                            type={"submit"}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserAuthForm;
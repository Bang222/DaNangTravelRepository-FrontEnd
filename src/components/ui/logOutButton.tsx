import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import React, {FC} from "react";
import {toast} from "react-toastify";
import {logOut} from "@/redux/feature/auth-slice";
import {removeCookie} from "@/util/api/cookies";
import {AppDispatch} from "@/redux/store";
import {useRouter} from "next/navigation";
import {StatusCodeDTO} from "@/types/StatusCode";

interface LogOutButtonProps{
    logOutAPI: () => Promise<StatusCodeDTO>;
    setLoadingLogOut:React.Dispatch<React.SetStateAction<boolean>>
    dispatch: AppDispatch
}
export const LogOutButton:FC<LogOutButtonProps>  = ({logOutAPI,setLoadingLogOut,dispatch}) => {
    const router =useRouter()
    const handleClickLogOut = () => {
        setLoadingLogOut(true);
        logOutAPI().then((data)=>{
            if(data.statusCode > 200) {
                toast.error(data.message)
            }
            removeCookie('token')
            router.push('/login')
            dispatch(logOut())
            setLoadingLogOut(false)
            toast.success("GoodBye")
        } , error => toast.error("LogOut Again"))
    }
    return(
        <Typography onClick={handleClickLogOut}>
            <Tooltip title="Log out" sx={{color: 'white'}}>
                <IconButton>
                    <LogoutIcon/>
                </IconButton>
            </Tooltip>
        </Typography>
    )
}
export default LogOutButton
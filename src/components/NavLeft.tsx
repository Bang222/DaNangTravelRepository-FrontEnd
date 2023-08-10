'use client'
import React, {FC} from 'react';
import {Card, CardContent} from "@mui/material";
import Link from "next/link";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useSelector} from "react-redux";
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import LineCustom from "@/components/ui/LineCustom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

interface NavLeftProps {
}
interface navBarLeftInterface {
    name:string
    href:string
    icon:any
}
//bang

const NavLeft: FC<NavLeftProps> = ({}) => {
    const [navBarLeft, setNavBarLeft] = React.useState<navBarLeftInterface[]>([
        {name:'Account Seller', href:'#',icon: <StoreSharpIcon sx={{color:'white'}}/>},
        {name:'Follow Registered trip', href:'#',icon: <FlightTakeoffIcon sx={{color:'white'}}/>},
        {name:'Used Tours', href:'#',icon: <FlightLandIcon sx={{color:'white'}}/>},
        // {name:'Account Seller', href:''},
        // {name:'Account Seller', href:''},
        ])
    const user = useSelector((state) => state.auth.value?.user)
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    return isAuth ? (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                width: '100%',
                borderRadius: '10px',
                // mx: 'auto',
                overflow: 'auto',
                resize: 'none',
                paddingBottom: '12px'
            }}
        >
            <CardHeader
                avatar={
                    <Avatar src={user.profilePicture} alt={'user'} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                }
                title={`${user.firstName} ${user.lastName}`}
                subheader={'Your Profile'}
            />
            <LineCustom size={'100%'}/>
            <CardContent>
                <ul className={'m-3'}>
                    {navBarLeft.map((item, index:number)=> {return(
                        <li key={index} className={'mb-2'}>
                            <Link href={item.href}  className={'flex'}>
                                <div className={'mr-4 p-1 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-full'}>{item.icon} </div>
                                {item.name}
                            </Link>
                        </li>
                    )})}
                </ul>
            </CardContent>
        </Card>
    ): <div></div>;
}

export default NavLeft;
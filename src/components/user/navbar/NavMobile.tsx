'use client'
import React, {FC, useEffect} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import Link from "next/link";
import NavLeft from "@/components/user/navbar/NavLeft";
import {Card, CardContent} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import LineCustom from "@/components/ui/LineCustom";
import StoreSharpIcon from "@mui/icons-material/StoreSharp";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface NavMobileProps {
}

interface navBarLeftInterface {
    name: string
    href: string
    icon: any
}

const NavMobile: FC<NavMobileProps> = ({}) => {
    const [navBarLeft, setNavBarLeft] = React.useState<navBarLeftInterface[]>([
        {name: 'Account Seller', href: '/seller', icon: <StoreSharpIcon sx={{color: 'white'}}/>},
        // {name:'Account Seller', href:''},
        // {name:'Account Seller', href:''},
    ])
    const [sectionOpen, setSectionOpen] = React.useState<boolean>(true);
    const toggleSection = () => {
        setSectionOpen(!sectionOpen);
    };
    const [isSectionVisible, setSectionVisible] = React.useState(true);
    const [prevScrollPos, setPrevScrollPos] = React.useState(0);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Use smooth scrolling behavior
        });
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const scrollingUp = currentScrollPos < prevScrollPos;

            if (scrollingUp) {
                setSectionVisible(true);
            } else {
                setSectionVisible(false);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const user = useSelector((state) => state.auth.value?.user)
    const isAuth = useSelector((state) => state.auth.value?.isAuth)

    return (
        <>
            <section
                className={`fixed z-50 bottom-0 w-screen h-[50px] bg-gray-900 ${
                    isSectionVisible ? 'down' : 'up'
                } nh:hidden `}
            >
                <ul className={'flex justify-center items-center h-full'}>
                    <li>
                        <HomeIcon sx={{color: 'white', fontSize: '2rem',marginRight:'36px'}} onClick={scrollToTop}/>
                    </li>
                    <li>
                        <BorderAllIcon onClick={toggleSection}
                                       sx={{color: 'white', fontSize: '2rem',marginRight:'0'}}/>
                    </li>
                </ul>
            </section>
            <section
                className={`fixed z-[99999] w-[100vw] h-screen bottom-0 transition-transform transform ${sectionOpen ? 'translate-x-full' : '-translate-x-0'} nh:hidden`}>
                <Card
                    variant="outlined"
                    sx={{
                        maxHeight: 'max-content',
                        width: '100vw',
                        overflow: 'auto',
                        resize: 'none',
                        paddingBottom: '12px',
                        height: '100%'
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar src={user.profilePicture} alt={'user'} sx={{bgcolor: red[500]}}
                                    aria-label="recipe"/>
                        }
                        action={<IconButton>
                            <CloseIcon onClick={toggleSection}/>
                        </IconButton>
                        }
                        title={`${user.firstName} ${user.lastName}`}
                        subheader={'Your Profile'}
                    />
                    <LineCustom size={'100%'}/>
                    <CardContent>
                        <ul className={'m-3'}>
                            {navBarLeft.map((item, index: number) => {
                                return (
                                    <li key={index} className={'mb-6'}>
                                        <Link href={item.href} className={'flex items-center'}>
                                            <div
                                                className={'mr-4 p-1 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-full'}>{item.icon} </div>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
            </section>
            {/*<section*/}
            {/*    className={`fixed z-[1200] w-[100vw] h-screen bottom-0 transition-transform transform ${sectionOpen ? 'translate-x-full' : '-translate-x-0'} nh:hidden`}>*/}

            {/*</section>*/}
        </>
    );
}

export default NavMobile;

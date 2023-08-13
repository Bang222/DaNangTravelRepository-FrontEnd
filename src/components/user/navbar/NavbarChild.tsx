'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {NextPage} from "next";
import Link from "next/link"

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import TourIcon from '@mui/icons-material/Tour';
import MoodIcon from '@mui/icons-material/Mood';

const NavbarChild:NextPage = () => {
    const theme = useTheme();

    const [value, setValue] = React.useState();
    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };



    return (
        <Box
            sx={{
                position: 'relative',
                width:'80%'
            }}
        >
            <AppBar position="static" sx={{display:'flex',backgroundColor:'black', color:'white',width:'100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="white"
                    variant="fullWidth"
                    centered
                    selectionFollowsFocus={false}
                >
                    <Link href="/" passHref>
                        <Tab icon={<HomeIcon />} sx={{fontSize:'12px'}} label="Home" textColor="white" onClick={() => handleChangeIndex(0)}/>
                    </Link>
                    <Link href="/tour" passHref>
                        <Tab label="Tour" icon={<TourIcon />} sx={{fontSize:'12px'}} textColor="white" onClick={() => handleChangeIndex(1)}/>
                    </Link>
                    <Link href="/experience" passHref>
                        <Tab label="Experience" icon={<MoodIcon />} sx={{fontSize:'12px'}} textColor="white" onClick={() => handleChangeIndex(2)}/>
                    </Link>
                </Tabs>

            </AppBar>
        </Box>
    );
}
export default NavbarChild
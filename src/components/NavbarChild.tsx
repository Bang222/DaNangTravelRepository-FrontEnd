'use client'
import * as React from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import {NextPage} from "next";
import Link from "next/link";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index,...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Link sx={{ p: 3 }} href={children}>{children}</Link>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
        bgcolor: green[600],
    },
};

const NavbarChild:NextPage = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };


    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
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
                    <Link href="/feed" passHref>
                        <Tab icon={<PostAddIcon />} sx={{fontSize:'12px'}} label="Posts" textColor="white" onClick={() => handleChangeIndex(0)}/>
                    </Link>
                    <Link href="/" passHref>
                        <Tab label="home" icon={<PostAddIcon />} sx={{fontSize:'12px'}} textColor="white" onClick={() => handleChangeIndex(1)}/>
                    </Link>
                    <Link href="/#" passHref>
                        <Tab label="Experience" icon={<PostAddIcon />} sx={{fontSize:'12px'}} textColor="white" onClick={() => handleChangeIndex(2)}/>
                    </Link>
                    <Link href="/#" passHref>
                        <Tab label="Experience" icon={<PostAddIcon />} sx={{fontSize:'12px'}} textColor="white" onClick={() => handleChangeIndex(3)}/>
                    </Link>
                </Tabs>

            </AppBar>
        </Box>
    );
}
export default NavbarChild
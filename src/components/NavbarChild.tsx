import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import {NextPage} from "next";
import Link from "next/link";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    Link:string
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
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

    const fabs = [
        {
            color: 'primary' as 'primary',
            sx: fabStyle as SxProps,
            icon: <AddIcon />,
            label: 'Add',
        },
        {
            color: 'secondary' as 'secondary',
            sx: fabStyle as SxProps,
            icon: <EditIcon />,
            label: 'Edit',
        },
        {
            color: 'inherit' as 'inherit',
            sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
            icon: <UpIcon />,
            label: 'Expand',
        },
    ];

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                position: 'relative',
            }}
            className={'w-5/6 snap-mandatory snap-x'}
        >
            <AppBar position="static" className="bg-black text-white max-md:text-[12px]">
                <Tabs
                    value={value}
                    link={Link}
                    onChange={handleChange}
                    textColor="white"
                    variant="fullWidth"
                    noWrap
                    className={'snap-x'}
                >
                    <Tab label="blog" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
        </Box>
    );
}
export default NavbarChild
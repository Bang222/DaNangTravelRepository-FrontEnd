'use client'
import {NextPage} from "next";
import {useDispatch, useSelector} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import Paragraph from "@/components/ui/Paragraph";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {styled} from "@mui/system";
import {useEffect} from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    children: React.ReactNode;
    role: string
}

interface MenuItem {
    id: number;
    title: string;
    display: string;
    icon: JSX.Element;
    onClick: () => void;
    active: boolean; // Add this property
}

export default function LayoutComponent({children, ...props}: Props) {
    const user = useSelector((state) => state.auth.value?.user)
    const role = useSelector((state) => state.auth.value?.user.role)
    const {window} = props;
    const pathname = usePathname()
    const [selectedComponent, setSelectedComponent] = React.useState(pathname.split('/')[3] ?? 'home'); // Default selected component
    const router = useRouter()

    const MailContent = () => <div>Mail Component Content</div>;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = (component) => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (component) => {
        handleDrawerToggle(component);
        setSelectedComponent(component);
        if (role === 'admin') {
            if (component === 'admin') {
                return router.push(`/admin`)
            }
            router.push(`/admin/${component}`)
        }
        if (role === 'seller') {
            if (component === 'home') {
                return router.push(`/seller/manager`)
            }
            router.push(`/seller/manager/${component}`)
        }
    };
    const [menuItem, setMenuItem] = React.useState<MenuItem[]>([
            {
                id: 1,
                title: 'admin',
                display: "Home",
                icon: <HomeIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('admin'),
                active: selectedComponent === 'admin',
            },
            {
                id: 2,
                title: 'manager-store',
                display: "Store",
                icon: <StoreIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('manager-store'),
                active: selectedComponent === 'manager-store',
            },
            {
                id: 3,
                title: 'manager-user',
                display: "User",
                icon: <PersonIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('manager-user'),
                active: selectedComponent === 'manager-user',
            },
        ]
    )
    const [menuItemSeller, setMenuItemSeller] = React.useState<MenuItem[]>([
            {
                id: 1,
                title: 'home',
                display: "Home",
                icon: <HomeIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('home'),
                active: selectedComponent === 'home',
            },
            {
                id: 2,
                title: 'tour',
                display: "Tour",
                icon: <AirplanemodeActiveIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('tour'),
                active: selectedComponent === 'tour',
            },
            {
                id: 3,
                title: 'bill',
                display: "Bill",
                icon: <LocalAtmIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('bill'),
                active: selectedComponent === 'bill',
            },
        ]
    )

    useEffect(() => {
        if (role === props.role) {
            const updatedMenuItems = menuItem.map(item => ({
                ...item,
                active: item.title === selectedComponent,
            }));
            setMenuItem(updatedMenuItems);
            return;
        }
        if (role === 'seller') {
            const updatedMenuItems = menuItem.map(item => ({
                ...item,
                active: item.title === selectedComponent,
            }));
            setMenuItem(updatedMenuItems);
            return;
        } else {
            return router.push('/');
        }

    }, [selectedComponent])
    const drawer = (
        <div className={''}>
            <div className={'font-bold p-2'}>
                <Link href={'/'} className={'flex justify-center items-center'}>
                    <PeopleAltIcon sx={{marginRight: '4px'}}/>
                    <Paragraph size={'md'} className={'font-bold my-[12px] hover:text-blue-400 hover:underline'}>User
                        Page</Paragraph>
                </Link>
            </div>
            <Divider/>
            <List>
                {props.role === 'admin' && <> {menuItem.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            onClick={item.onClick}
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: '4px',
                                color: item.active ? theme => theme.palette.primary.main : theme => theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme => theme.palette.primary.main,
                                    color: theme => theme.palette.common.white,
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={(item.display)}/>
                        </ListItemButton>
                    </ListItem>
                ))} </>}
                {props.role === 'seller' && <> {menuItemSeller.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            onClick={item.onClick}
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: '4px',
                                color: item.active ? theme => theme.palette.primary.main : theme => theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme => theme.palette.primary.main,
                                    color: theme => theme.palette.common.white,
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={(item.display)}/>
                        </ListItemButton>
                    </ListItem>
                ))} </>}
            </List>
            <Divider/>
            {/*<List>*/}
            {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
            {/*        <ListItem key={text} disablePadding>*/}
            {/*            <ListItemButton>*/}
            {/*                <ListItemIcon>*/}
            {/*                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText primary={text}/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return role === props.role ? (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {lg: `calc(100% - ${drawerWidth}px)`},
                    ml: {lg: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {lg: 'none'},}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography width={'100%'} variant="h6" noWrap component="div">
                        <div className={'flex justify-between items-center'}>
                                <div className={props.role === 'admin' ? 'hidden':''}>
                                    {selectedComponent === 'home' && 'Home '}
                                    {selectedComponent === 'tour' && 'Tour '}
                                    {selectedComponent === 'bill' && 'Bill'}
                                </div>
                                <div className={props.role === 'seller' ? 'hidden':''}>
                                    {selectedComponent === 'admin' && 'Home'}
                                    {selectedComponent === 'manager-store' && 'Store'}
                                    {selectedComponent === 'manager-user' && 'User'}
                                </div>
                            <div className={'flex mr-6'}>
                                <div className={'ml-3 cursor-pointer hover:text-gray-950'}>
                                    <Avatar sx={{backgroundColor: 'red'}} alt="store" src={user?.store?.imgUrl}/>
                                </div>
                                <div className={'ml-3 flex items-center'}>
                                    {role === props.role && (
                                        <Paragraph className={'cursor-default mb-0 '}
                                                   size={'sm'}>Admin</Paragraph>
                                    )
                                    }
                                    {role === props.role && (
                                        <Paragraph className={'cursor-default mb-0 '}
                                                   size={'sm'}>{user?.store?.name}</Paragraph>
                                    )
                                    }
                                </div>
                                <div className={'ml-6 cursor-pointer hover:text-gray-950'}>
                                    <Tooltip title="Log out">
                                        <LogoutIcon/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: {lg: drawerWidth}, flexShrink: {lg: 0},
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', lg: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    container={container}
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', lg: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                {children}
            </Box>
        </Box>
    ) : (
        (() => {
            router.push('/'); // Redirect to the not-found page
            return null; // Return null if you use router.push to avoid rendering children
        })()
    );
}

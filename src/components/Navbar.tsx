'use client'
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from "react";
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Tooltip} from "@mui/material";
import NavbarChild from "@/components/NavbarChild";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            // open={isMobileMenuOpen}
            // onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    // aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box  sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={'bg-black'}>
                <Toolbar className={'w-full max-lg:justify-between container mx-auto max-sm:pl-2 max-sm:pr-2'}>
                    <Box className={'flex'}>
                        <Typography
                            variant="h6"
                            component="div"
                            className={' max-sm:flex  max-sm:items-center  max-sm:pr-3 max-sm:block sm:hidden'}
                        >
                            DN
                        </Typography>
                        <Typography
                            className={'sm:flex items-center block max-sm:hidden'}
                            variant="h6"
                            noWrap
                            component="div"
                            // sx={{display: {xs: 'none',sm: 'block',md: 'block'}}}
                        >
                            Danang Travel
                        </Typography>
                        <Search className={'rounded-[30px]'}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                className={'sm:w-[400px] lg:w-[250px]'}
                            />
                        </Search>
                    </Box >
                    <Toolbar className={'max-lg:hidden lg:flex w-full justify-between'}>
                        <NavbarChild/>
                    </Toolbar>
                    <Box className={'flex'}>
                        <Tooltip title="Cart" className={'text-white'}>
                            <IconButton>
                                <ShoppingCartIcon/>
                            </IconButton>
                        </Tooltip>
                        <Link href="/login" underline="hover">
                            <Tooltip title="Log In" className={'text-white'}>
                                <IconButton>
                                    <LoginIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Link href="/user/:id" underline="hover">
                            <Tooltip title="Profile" className={'text-white'}>
                                <IconButton>
                                    <AccountCircleIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Box>
                </Toolbar>
                <Toolbar className={'max-lg:flex lg:hidden justify-center'}>
                    <NavbarChild/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
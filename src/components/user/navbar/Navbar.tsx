"use client"

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
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, {useEffect} from "react";
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from "@mui/material";
import NavbarChild from "@/components/user/navbar/NavbarChild";
import {useUserDetailAPI} from "@/util/api/auth";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {logOut} from "@/redux/feature/auth-slice";
import {removeCookie} from "@/util/api/cookies";
import CartComponent from "@/components/user/CartComponent";
import {useQuery} from "@tanstack/react-query";
import {getToCartAPI} from "@/util/api/apiReuqest";
import {CartDTO} from "@/types";


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
}))

const PrimarySearchAppBar: React.FC = () => {
    const {isLoading, status} = useUserDetailAPI()
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [showCart, setShowCart] = React.useState<boolean>(false);
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [cart, setCart] = React.useState<CartDTO[]>();

    const {data: cartData, isLoading:isLoadingOfCart, isError:isErrorOfCart, isSuccess:isSuccessGetOfCart} = useQuery(['cart', userId], () =>
        getToCartAPI(accessToken, userId)
    );
    React.useEffect(() => {
        if (isSuccessGetOfCart) {
            setCart(cartData);
        }
    }, [cartData, isSuccessGetOfCart]);
    const toggleCart = () => {
        setShowCart(!showCart);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickLogOut = () => {
        dispatch(logOut())
        removeCookie('token')
        router.push('/')
    }
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black'
        }}>
            <AppBar position="fixed" sx={{backgroundColor: 'black'}}>
                <Toolbar sx={{ display: 'flex',width: '100%', backgroundColor: 'black', justifyContent: 'space-around'}}
                         // className={'max-lg:justify-between container mx-auto max-sm:pl-2 max-sm:pr-2'}
                >
                    <Box sx={{ display: 'flex'}}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{display: {xs: 'flex', sm: 'none'},alignItems:'center', paddingRight: '12px'
                        }}
                            // className={' max-sm:flex  max-sm:items-center  max-sm:pr-3 max-sm:block sm:hidden'}
                        >
                            <Link href={'/'}>DN</Link>
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none',sm: 'flex',md: 'flex'}}}
                        >
                            <Link href={'/'}>DaNang Travel</Link>
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
                    </Box>
                    <div className={'hidden sf7:flex justify-between w-[35%]'}>
                        <NavbarChild/>
                    </div>
                    <Box sx={{display: 'flex',}}>
                        <Tooltip title="Cart" sx={{ color: showCart ? '#3d3ded' : 'white' }} onClick={toggleCart}>
                            <IconButton>
                                <Badge color="error" badgeContent={cart?.length} max={10} >
                                <ShoppingCartIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                            { isAuth === true ?
                                <Box sx={{display:'flex'}}>
                                    <Link href="/user/:id" underline="hover">
                                        <Tooltip title="Profile" sx={{color: 'white'}}>
                                            <IconButton>
                                                <AccountCircleIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Typography onClick={handleClickLogOut}>
                                        <Tooltip title="Log out" sx={{color: 'white'}}>
                                            <IconButton>
                                                <LogoutIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>
                                </Box>
                                :
                        <Link href="/login" underline="hover">
                            <Tooltip title="Log In" sx={{color: 'white'}}>
                                <IconButton>
                                    <LoginIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                            }
                    </Box>
                </Toolbar>
                <div className={'flex sf7:hidden justify-around'}>
                    <NavbarChild/>
                </div>
                {showCart &&(<CartComponent
                    toggleCart ={toggleCart}
                    cart={cart}
                    accessToken={accessToken}
                    userId={userId}
                    setCart={setCart}
                    isLoadingOfCart={isLoadingOfCart}
                />)}
            </AppBar>
        </Box>
    );
}
export default PrimarySearchAppBar
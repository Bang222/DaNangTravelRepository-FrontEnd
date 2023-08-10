'use client'
import {FC} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';

interface NavMobileProps {
}

//bang

const NavMobile: FC<NavMobileProps> = ({}) => {

    return (
      <section className={'fixed z-50 bottom-0 w-screen h-[50px] bg-gradient-to-r from-cyan-500 to-blue-500 nh:hidden'}>
            <ul className={'flex justify-center items-center h-full'}>
                <li className={'mr-4'}>
                    <HomeIcon sx={{color: 'white',fontSize:'2rem'}}/>
                </li>
                <li>
                    <BorderAllIcon className={'ml-4'} sx={{color: 'white',fontSize:'2rem'}}/>
                </li>
            </ul>
      </section>
    );
}

export default NavMobile;
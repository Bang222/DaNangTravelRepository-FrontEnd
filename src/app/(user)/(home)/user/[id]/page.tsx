'use client'
import {FC} from 'react';
import * as React from 'react';
import {useSelector} from "react-redux";
import UserInformationCard from "@/components/user/userInformationCard";
import {useRouter} from "next/navigation";
import {Container} from "@mui/material";
import OrderHistory from "@/components/user/OrderHistory";
import {RootState} from "@/redux/store";

interface PageProps {
}

//bang

const Page: ({}: {}) => React.JSX.Element | void = ({}) => {
    const user = useSelector((state:RootState) => state.auth.value?.user)
    const isAuth = useSelector((state:RootState) => state.auth.value?.isAuth)
    const router = useRouter()
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        document.title = 'My Profile'
    }, [user.firstName, user.lastName])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return isAuth ?  (
        <section>
            <Container sx={{paddingY: "24px"}}>
            <UserInformationCard user={user}/>
                <div className={"h-[36px]"}></div>
                <OrderHistory user={user}/>
            </Container>
        </section>
    ) : router.push('/login');
}

export default Page;

'use client'
import {NextPage} from "next";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

interface PageProps {
}

//bang

const Page: NextPage<PageProps> = ({}) => {
    const role = useSelector((state) => state.auth.value?.user.role)
    const router = useRouter()
    return role === 'seller' ?   (
        <div> Page </div>
    ): router.push('/seller') ;
}

export default Page;
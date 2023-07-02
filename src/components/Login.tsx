import {FC} from 'react';
import UserAuthForm from "@/components/UserAuthForm";
import Paragraph from "@/components/ui/Paragraph";
import LargeHeading from "@/components/ui/LargeHeading";

interface SignInProps {
}

const Login: FC<SignInProps> = ({}) => {
    return (
        <>
            <section className={'w-full lg:grid grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:items-center max-sm:flex max-sm:justify-center max-sm:items-center'}>
                <div className='md:flex items-center h-screen max-sm:hidden sm:hidden'>
                    <div className={''}>
                        <Paragraph size={"lg"} className={'font-bold p-1'}>
                            You Love
                        </Paragraph>
                        <LargeHeading className={'p-1'}> Do you want to going travel? </LargeHeading>
                        <h2 className={'text-[30px] p-1'}>
                            Want to find out information about the destination?
                        </h2>
                        <Paragraph className={'pt-2 p-1 font-medium'}> With just a few taps, quickly log in to experience and feel our great
                            utilities. </Paragraph>
                    </div>
                </div>
                <UserAuthForm/>
            </section>
        </>
    );
}

export default Login;
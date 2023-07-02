import {FC} from 'react';
import UserAuthForm from "@/components/UserAuthForm";

interface SignInProps {
}

const Login: FC<SignInProps> = ({}) => {
    return (
        <>
            <section className={'w-full grid grid-cols-2 gap-2'}>
                <div className=''>
                    <h1>
                        hahaha
                    </h1>
                </div>
                <UserAuthForm/>
            </section>
        </>
    );
}

export default Login;
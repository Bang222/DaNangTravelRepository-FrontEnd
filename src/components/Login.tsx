import {FC} from 'react';
import UserAuthForm from "@/components/UserAuthForm";

interface SignInProps {
}

const Login: FC<SignInProps> = ({}) => {
    return (
        <>
            <div className={'flex justify-center'}>
                <div className='haha flex justify-center'>
                    <h1>
                        hahaha
                    </h1>
                </div>
                <UserAuthForm/>
            </div>
        </>
    );
}

export default Login;
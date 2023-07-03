import React, {FC} from 'react';
import AuthForm from "@/components/AuthForm";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    return (
        <section className={"relative flex w-screen container mx-auto px-4 z-50"}>
            <AuthForm/>
        </section>
    );
}

export default Page;
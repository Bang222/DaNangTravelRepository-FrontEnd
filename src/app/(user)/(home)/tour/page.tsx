import React, {FC} from 'react';
import TourComponent from "@/components/user/TourComponent";
import Introduction from "@/components/Introduction";
import NavLeft from "@/components/user/navbar/NavLeft";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    return (
        <section className={'pt-7 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-auto'}>
            <section className="hidden mt-[65px] lg:block">
             <div className={'fixed w-[20%] left-[2%]'}>
                <NavLeft/>
             </div>
            </section>
            <div className={'lg:col-span-2 col-span-4 w-6/6 p-3.5'}>
                <TourComponent/>
            </div>
            <section className={'hidden lg:block fixed lg:right-[2%]'}>
                <Introduction/>
            </section>
        </section>
    );
}

export default Page;
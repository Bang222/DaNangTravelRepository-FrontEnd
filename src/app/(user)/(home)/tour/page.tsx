import React, {FC} from 'react';
import TourComponent from "@/components/user/TourComponent";
import Introduction from "@/components/Introduction";
import NavLeft from "@/components/user/navbar/NavLeft";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    return (
        <section className={'pt-2 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-5'}>
            <section className="hidden mt-[65px] lg:block relative">
                <div className="sticky top-[10%]">
                <NavLeft/>
             </div>
            </section>
            <div className={'lg:col-span-2 col-span-4 w-6/6 p-3.5'}>
                <TourComponent/>
            </div>
            <section className={'hidden lg:block relative mt-[65px] '}>
                <div className="sticky top-[10%]">
                <Introduction/>
                </div>
            </section>
        </section>
    );
}

export default Page;
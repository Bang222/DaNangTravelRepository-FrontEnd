import React, {useEffect} from "react";
import Experience from "@/components/user/Expericence";
import CreateExperience from "@/components/user/CreateExperience";
import NavLeft from "@/components/user/navbar/NavLeft";
import Introduction from "@/components/user/Introduction";
import ButtonBackToTop from "@/components/buttonBackToTop/ButtonBackToTop";

export default async function Home() {
    return (
        <>
            <section className={'pt-7 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-3.5'}>
                <section className="hidden mt-[65px] lg:block">
                    <div className="sticky top-[10%]">
                        <NavLeft/>
                    </div>
                </section>
                <div className={'lg:col-span-2 col-span-4 w-6/6 p-3.5'}>
                    <CreateExperience/>
                        <Experience/>
                </div>
                <section className={'hidden lg:block relative mt-[65px] '}>
                    <div className="sticky top-[10%]">
                    </div>
                </section>
                <section className={'hidden lg:block'}>
                <ButtonBackToTop/>
            </section>
            </section>
        </>
    )
}

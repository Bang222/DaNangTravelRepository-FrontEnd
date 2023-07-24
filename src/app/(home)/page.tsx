import React from "react";
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";

export default async function Home() {
    return (
        <>
            <div className="md:block"></div>
            <div className={'md:col-span-2 col-span-4  w-6/6 p-3.5'}>
                <CreatePost/>
                <Post/>
            </div>
        </>
    )
}

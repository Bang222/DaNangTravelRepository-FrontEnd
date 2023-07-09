import React, {FC} from 'react';
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import {useRouter} from "next/router";

interface FeedProps {
}

//bang

const Page: FC<FeedProps> = ({}) => {
    return (
        <>
            <div></div>
            <div className={'col-span-2'}>
                <CreatePost/>
                <Post/>
            </div>
        </>

    );
}

export default Page;
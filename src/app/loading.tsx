'use client'
import { FC } from "react";
import {CircularProgress} from "@mui/material";

interface LoadingProps {
}

//bang

const Loading: FC<LoadingProps> = ({}) => {
    return (
        <div className={'flex justify-center items-center relative z-50 h-screen bg-light'}>
            <CircularProgress color="secondary" />
        </div>

    );
};

export default Loading;
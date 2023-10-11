import {FC} from 'react';
import {CircularProgress} from "@mui/material";

interface LoadingComponentProps {
}

//bang

const LoadingComponent: FC<LoadingComponentProps> = ({}) => {
    return (
        <div className={'flex justify-center w-screen items-center absolute z-100 h-screen bg-light'}>
            <CircularProgress color="secondary"/>
        </div>
    );
}

export default LoadingComponent;

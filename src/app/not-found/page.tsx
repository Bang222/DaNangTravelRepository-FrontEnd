import {FC} from 'react';
import NotFoundComponent from "@/components/NotFoundComponent";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    return (
        <NotFoundComponent/>
    );
}

export default Page;

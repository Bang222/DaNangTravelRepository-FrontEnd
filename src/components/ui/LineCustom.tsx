import * as React from "react";
import {FC} from "react";
interface LineCustomProps {
    size: string
}

const LineCustom:FC<LineCustomProps> = (props) => {
    return (
        <div className={'w-full flex justify-center'}>
            <div style={{backgroundColor: '#A9A9A9', width:`${props.size}`, height: '1px'}}></div>
        </div>
    );
}

export default LineCustom;
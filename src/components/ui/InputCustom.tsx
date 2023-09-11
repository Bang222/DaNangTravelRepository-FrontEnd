import {FC} from 'react';
import * as React from "react";
import {Input} from "@mui/material";

interface InputCustomProps {
    name:string
    data: any
    setData?: React.Dispatch<React.SetStateAction<any>>
    value: any
    id: any
    type:string
    disabled?:boolean

}

//bang

const InputCustom: FC<InputCustomProps> = ({name,setData,disabled, data, value, id,type }) => {
    return (
        <Input
            required={true}
            value={value}
            data={data}
            id={id}
            type={type}
            disabled={disabled ?? false}
            placeholder={`${name}`}
            onChange={(e) => setData ? setData(e.target.value) : ''}
        />
    );
}

export default InputCustom;
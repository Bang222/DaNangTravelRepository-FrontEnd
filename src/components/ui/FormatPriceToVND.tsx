'use client'
import {FC} from 'react';

interface FormatPriceToVndProps {
    price:number
}

//bang

const FormatPriceToVnd: FC<FormatPriceToVndProps> = ({price}) => {
    const optionVND = {style: 'currency', currency: 'VND'}
    const formattedVND = price.toLocaleString('vi',optionVND)
    return (
        <span> {formattedVND} </span>
    );
}

export default FormatPriceToVnd;

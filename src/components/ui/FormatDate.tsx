'use client'

import {FC} from 'react';

interface FormatDateProps {
    date: Date
}

//bang

const FormatDate: FC<FormatDateProps> = ({date}) => {
    const option: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    const newDate = new Date(date)
    const formattedDDate = newDate.toLocaleDateString('es-uk',option)
    return (
        <span>{formattedDDate}</span>
    );
}

export default FormatDate;

import React, {FC} from 'react';
import FormatDate from "@/components/ui/FormatDate";

interface TableUserProps {
    index: number
    email:string
    phone:string
    created:Date
    active:boolean
    emailValidated:boolean
}

//bang

const TableUser: FC<TableUserProps> = ({index,email,phone,created,active,emailValidated}) => {
    return (
        <tr className={'text-[10px] lg:text-[12px]'}>
            <td className={"p-2 border border-solid"}>{index + 1}</td>
            <td className={"p-2 border border-solid"}>{email}</td>
            <td className={"p-2 border border-solid"}>{phone}</td>
            <td className={"p-2 border border-solid"}><FormatDate date={created}/></td>
            <td className={"p-2 border border-solid"}>{String(active)}</td>
            <td className={"p-2 border border-solid"}>{String(emailValidated)}</td>
            <td className={"p-2 border border-solid"}>Ban</td>
        </tr>
    );
}

export default TableUser;

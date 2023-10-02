import {FC} from 'react';
import ModalUserContactRegisteredTour from "@/components/seller/modal/ModalUserContactRegisteredTour";
import {BillDTO, OrderDetailDTO, PassengerDTO} from "@/types/seller";

interface Passenger {
    id: string
    type: string,
    name: string,
    sex: string,
    dayOfBirth: number
    group: number
}

interface TablePassengerProps {
    passengers: PassengerDTO[] | undefined;
}

//ModalOfPassenger
const TablePassenger: FC<TablePassengerProps> = ({passengers}) => {
    return (
        <table className="text-left w-full border border-solid">
            <thead>
            <tr className="text-white bg-black text-[12px]">
                <th className="p-1 border">Name</th>
                <th className="border border-solid p-1">Type</th>
                <th className="border border-solid p-1">Sex</th>
                <th className="border border-solid p-1">AGE</th>
            </tr>
            </thead>
            <tbody>
            {passengers?.map((passenger, index) => {
                // const previousPassenger = order[index - 1];
                // const shouldDisplayGroup = passenger.group !== null && (index === 0 || passenger.group !== previousPassenger.group);
                return (
                    <tr key={passenger.id} className={'text-[10px]'}>
                        <td className="border border-solid p-1">{passenger.name}</td>
                        <td className="border border-solid p-1">{passenger.type}</td>
                        <td className="border border-solid p-1">{passenger.sex}</td>
                        <td className="border border-solid p-1">{passenger.dayOfBirth}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default TablePassenger;

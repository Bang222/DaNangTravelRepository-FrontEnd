import {FC} from 'react';
import ModalUserContactRegisteredTour from "@/components/modal/seller/ModalUserContactRegisteredTour";
import {OrderDetailDTO} from "@/types/seller";

interface Passenger {
    id: string
    type: string,
    name: string,
    sex: string,
    dayOfBirth: number
    group:number
}
interface TablePassengerProps {
    passengers: Passenger[]
    oderDetails: OrderDetailDTO[]
}

//ModalOfPassenger
const TablePassenger: FC<TablePassengerProps> = ({passengers,oderDetails}) => {
    return (
        <div className="overflow-y-scroll max-h-[80vh]">
            <table className="table-auto text-left w-full border border-solid">
                <thead>
                <tr className="text-white bg-black">
                    <th className="p-1 border">Name</th>
                    <th className="border border-solid p-1">Type</th>
                    <th className="border border-solid p-1">Sex</th>
                    <th className="border border-solid p-1">AGE</th>
                    <th className="border border-solid w-[300px] items-center"><span className={'flex flex-1 justify-around'}>Group Contact <ModalUserContactRegisteredTour
                        oderDetails = {oderDetails} /></span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {passengers?.map((passenger,index) => {
                    const previousPassenger = passengers[index - 1];
                    const shouldDisplayGroup = passenger.group !== null && (index === 0 || passenger.group !== previousPassenger.group);
                    return (
                        <tr key={passenger.id}>
                            <td className="border border-solid p-1">{passenger.name}</td>
                            <td className="border border-solid p-1">{passenger.type}</td>
                            <td className="border border-solid p-1">{passenger.sex}</td>
                            <td className="border border-solid p-1">{passenger.dayOfBirth}</td>
                            <td className={`${shouldDisplayGroup ? `border p-1` : ''}`}>
                                {shouldDisplayGroup ? passenger.group: passenger.group}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TablePassenger;
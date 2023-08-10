import {FC} from 'react';
import {CardContent} from "@mui/material";
import Paragraph from "@/components/ui/Paragraph";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface AccompaniedServiceProps {
    color:string
}

//bang

const AccompaniedService: FC<AccompaniedServiceProps> = ({color}) => {
    return (
        <CardContent>
            <div className={'grid grid-cols-2 gap-4'}>
                <div className={'col-span-1'}>
                    <Paragraph><DirectionsCarIcon sx={{color: color}}/> Transport
                    </Paragraph>
                    <Paragraph><AirplaneTicketIcon sx={{color: color}}/> Flight
                        tickets</Paragraph>
                    <Paragraph><SupervisorAccountIcon sx={{color: color}}/> Tour
                        Guide</Paragraph>
                    <Paragraph><HomeWorkIcon sx={{color: color}}/> Hotel</Paragraph>
                </div>
                <div className={'col-span-1'}>
                    <Paragraph><ConfirmationNumberIcon
                        sx={{color: color}}/> Tickets</Paragraph>
                    <Paragraph><LocalLibraryIcon sx={{color: color}}/> Local
                        Guide</Paragraph>
                    <Paragraph><SoupKitchenIcon sx={{color: color}}/> Food
                        Service</Paragraph>
                </div>
            </div>
        </CardContent>
    );
}

export default AccompaniedService;
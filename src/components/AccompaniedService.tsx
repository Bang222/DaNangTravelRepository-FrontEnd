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
}

//bang

const AccompaniedService: FC<AccompaniedServiceProps> = ({}) => {
    return (
        <CardContent>
            <div className={'grid grid-cols-2 gap-4'}>
                <div className={'col-span-1'}>
                    <Paragraph><DirectionsCarIcon sx={{color: 'blue'}}/> Transport
                    </Paragraph>
                    <Paragraph><AirplaneTicketIcon sx={{color: 'blue'}}/> Flight
                        tickets</Paragraph>
                    <Paragraph><SupervisorAccountIcon sx={{color: 'blue'}}/> Tour
                        Guide</Paragraph>
                    <Paragraph><HomeWorkIcon sx={{color: 'blue'}}/> Hotel</Paragraph>
                </div>
                <div className={'col-span-1'}>
                    <Paragraph><ConfirmationNumberIcon
                        sx={{color: 'blue'}}/> Tickets</Paragraph>
                    <Paragraph><LocalLibraryIcon sx={{color: 'blue'}}/> Local
                        Guide</Paragraph>
                    <Paragraph><SoupKitchenIcon sx={{color: 'blue'}}/> Food
                        Service</Paragraph>
                </div>
            </div>
        </CardContent>
    );
}

export default AccompaniedService;
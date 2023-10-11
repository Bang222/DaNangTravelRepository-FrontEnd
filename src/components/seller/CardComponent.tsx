import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FC} from "react";

interface HomeManagerProps {
    text:string;
    total:number;
}

//seller/pages

const CardComponent: FC<HomeManagerProps> = ({text,total}) => {
    const optionVND = {style: 'currency', currency: 'VND'}
    let VNDChange:string
    if(text === 'Total Income'){
        VNDChange= total?.toLocaleString('vi-VN', optionVND)
    }

    return (
        <Card sx={{ width: 200, backgroundColor:'#009933' }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{color: 'white'}}>
                    {text}
                </Typography>
                <Typography sx={{ fontSize: 20,color: 'white' }} gutterBottom>
                    { VNDChange ?? total}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardComponent;

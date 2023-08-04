'use client'
import * as React from 'react';
import {NextPage} from "next";

import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Unstable_Grid2';
import {Box} from "@mui/system";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import {Container} from "@mui/material";
import Link from "next/link";


interface BookingProps {
    params: {
        booking: string[]
    }
}

const Booking: NextPage<BookingProps> = ({params}) => {
    return (
        <Container fixed sx={{marginY: '48px'}}>
            <div className ={'my-5 pl-1 text-blue-400 hover:rounded-md hover:bg-neutral-400 hover:w-[50px] hover:text-white'}>
                <Link href={'/tour'}>Back</Link>
            </div>
            <Typography level="title-lg" startDecorator={<InfoOutlined/>}>
                Booking Tour
            </Typography>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            resize: 'none',
                        }}
                    >
                        <Typography level="title-lg" startDecorator={<PermIdentityIcon/>}>
                            Contact Info
                        </Typography>
                        <Divider inset="none"/>
                        <CardContent
                            sx={{
                                display: 'grid',
                                // gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder="Enter Email"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    placeholder="Enter First Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    placeholder="Enter Full Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    placeholder="Enter Address"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>phone</FormLabel>
                                <Input
                                    placeholder="Enter Phone"
                                />
                            </FormControl>
                            <FormControl sx={{gridColumn: '1/-1'}}>
                                <FormLabel>Card holder name</FormLabel>
                                <Input placeholder="Enter cardholder's full name"/>
                            </FormControl>
                            {/*<Checkbox label="Save card" sx={{gridColumn: '1/-1', my: 1}}/>*/}
                            {/*<CardActions sx={{gridColumn: '1/-1'}}>*/}
                            {/*    <Button variant="solid" color="primary">*/}
                            {/*        Add card*/}
                            {/*    </Button>*/}
                            {/*</CardActions>*/}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            resize: 'none',
                        }}
                    >
                        <Typography level="title-lg" startDecorator={<InfoOutlined/>}>
                            Add new card
                        </Typography>
                        <Divider inset="none"/>
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >
                            <FormControl sx={{gridColumn: '1/-1'}}>
                                <FormLabel>Card number</FormLabel>
                                <Input endDecorator={<CreditCardIcon/>}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Expiry date</FormLabel>
                                <Input endDecorator={<CreditCardIcon/>}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>CVC/CVV</FormLabel>
                                <Input endDecorator={<InfoOutlined/>}/>
                            </FormControl>
                            <FormControl sx={{gridColumn: '1/-1'}}>
                                <FormLabel>Card holder name</FormLabel>
                                <Input placeholder="Enter cardholder's full name"/>
                            </FormControl>
                            <Checkbox label="Save card" sx={{gridColumn: '1/-1', my: 1}}/>
                            <CardActions sx={{gridColumn: '1/-1'}}>
                                <Button variant="solid" color="primary">
                                    Add card
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
export default Booking
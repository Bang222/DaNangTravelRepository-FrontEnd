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
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Grid from '@mui/material/Unstable_Grid2';
import {Box} from "@mui/system";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GroupsIcon from '@mui/icons-material/Groups';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

import {Container, FormControlLabel, Input, Radio, RadioGroup} from "@mui/material";
import Link from "next/link";
import InputCustom from "@/components/ui/InputCustom";
import Label from "@/components/ui/Label";
import Paragraph from "@/components/ui/Paragraph";
import {useRouter} from "next/navigation";


interface BookingProps {
    params: {
        booking: string[]
    }
}

interface Passenger {
    name: string
    age: number
    type: string
    sex: string
}

const Booking: NextPage<BookingProps> = ({params}) => {
    const [adultCount, setAdultCount] = React.useState<number>(1)
    const [childCount, setChildCount] = React.useState<number>(0)
    const [toddlerCount, setToddlerCount] = React.useState<number>(0)
    const [infrantCout, setInfrantCount] = React.useState<number>(0)

    const [email, setEmail] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [fullName, setFullName] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [passengerError, setPassengerError] = React.useState<string>('')

    const [totalInformationPassenger, setTotalInformationPassenger] = React.useState<Passenger[]>([])
    const [nameAdult, setNameAdult] = React.useState<string>('')
    const [adults, setAdults] = React.useState<Passenger[]>([{name: "", sex: "", age: Number(''), type: ""}])
    const [child, setChild] = React.useState<Passenger[]>([{name: "", sex: "", age: Number(''), type: ""}])
    const [toddler, setToddler] = React.useState<Passenger[]>([{name: "", sex: "", age: Number(''), type: ""}])
    const [infrant, setInfrant] = React.useState<Passenger[]>([{name: "", sex: "", age: Number(''), type: ""}])
    const router = useRouter()

    const handleClick = e => {
        if (!(email && firstName && fullName && address && phone).trim()) {
            return setErrorMessage('Can not null information');
        }
        const validatedData = adults.map(item => {
            const newItem = { ...item };
            if (!newItem.name) {
                return false;
            }

            if (!newItem.age || newItem.age <= 0) {
                return false;
            }
            if (!newItem.name) {
                return false;
            }

            if (!newItem.sex) {
                return false;
            }
            if (!newItem.type) {
                return false;
            }
            return newItem;
        });
        console.log(validatedData)
        if (validatedData.includes(false)) {
            setPassengerError('Input Data');
            return false;
        }
        setErrorMessage('');
        setAdults([{name: "", sex: "", age: 0, type: ""}])
        setAdultCount(1)
        setToddlerCount(0)
        setChildCount(0)
        setInfrantCount(0)
        setFirstName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setFullName('')
        router.push('/payment')
    }
    const handleClickCount = (action: 'increase' | 'decrease', type: 'adultCount' | 'childCount' | 'toddlerCount' | 'infrantCout') => {
        if (type === 'infrantCout') {
            if (action === 'increase') {
                setInfrantCount(infrantCout + 1);
            } else if (action === 'decrease' && infrantCout > 0) {
                setInfrantCount(infrantCout - 1);
                // setAdults(adults.pop)
            }
        }
        if (type === 'adultCount') {
            if (action === 'increase') {
                setAdultCount(adultCount + 1);
            } else if (action === 'decrease' && adultCount > 1) {
                setAdultCount(adultCount - 1);
                adults.pop()
            }
        }
        if (type === 'toddlerCount') {
            if (action === 'increase') {
                setToddlerCount(toddlerCount + 1);
            } else if (action === 'decrease' && toddlerCount > 0) {
                setToddlerCount(toddlerCount - 1);
            }
        }
        if (type === 'childCount') {
            if (action === 'increase') {
                setChildCount(childCount + 1);
            } else if (action === 'decrease' && childCount > 0) {
                setChildCount(childCount - 1);
            }
        }
    };
    // const handleRemovePassenger = (index: number, field: string, value: string) => {
    //     if(adults[index]){
    //         console.log('lakaka')
    //     }
    // }
    const handleAdultChange = (type: 'adult' | 'child' | 'toddler' | 'infant',index: number, field: string, value: string) => {
        if(type === 'adult') {
            setAdults(prevAdults => {
                const updatedAdults = [...prevAdults];
                if (updatedAdults[index]) {
                    updatedAdults[index][field] = value;
                    updatedAdults[index]["type"] = 'Adult';

                } else {
                    const newAdult = {
                        name: field === 'name' ? value : '',
                        sex: field === 'sex' ? value : '',
                        age: field === 'age' ? value : 0,
                        type: 'Adult'
                    };
                    if (!(newAdult.age && !newAdult.name && !newAdult.type && !newAdult.sex && Number(newAdult.age)) === 0) {
                        setPassengerError('Can not null')
                    }
                    updatedAdults.push(newAdult as Passenger)
                }
                return updatedAdults;
            });
        }

    };
    return (
        <Box sx={{backgroundColor: '#ccc'}}>
            <Box sx={{paddingY: '48px'}}>
                <Container fixed>
                    <div
                        className={'pl-1 font-bold mb-3 w-fit text-blue-400 hover:rounded-md hover:bg-neutral-400 hover:w-[50px] hover:text-white'}>
                        <Link href={'/tour'}>Back</Link>
                    </div>
                    <Typography sx={{fontSize: '30px', fontWeight: 'bold', marginBottom: '12px'}}
                                startDecorator={<InfoOutlined/>}>
                        Booking Tour
                    </Typography>
                    <Grid container spacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
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
                                <Typography level="title-lg" startDecorator={<ContactsIcon/>}>
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
                                        <Label>Email</Label>
                                        <InputCustom
                                            name={'Email'}
                                            id={email}
                                            data={email}
                                            value={email}
                                            type={'text'}
                                            setData={setEmail}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Label>First Name</Label>
                                        <InputCustom
                                            name={'First Name'}
                                            id={firstName}
                                            data={firstName}
                                            value={firstName}
                                            type={'text'}
                                            setData={setFirstName}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Label>Full Name</Label>
                                        <InputCustom
                                            name={'Full Name'}
                                            id={fullName}
                                            data={fullName}
                                            value={fullName}
                                            type={'text'}
                                            setData={setFullName}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Label>Address</Label>
                                        <InputCustom
                                            name={'Address'}
                                            id={address}
                                            data={address}
                                            value={address}
                                            type={'text'}
                                            setData={setAddress}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Label>Phone</Label>
                                        <InputCustom
                                            name={'Phone'}
                                            id={phone}
                                            data={phone}
                                            value={phone}
                                            type={'text'}
                                            setData={setPhone}
                                        />
                                    </FormControl>
                                </CardContent>
                                {errorMessage ? <Paragraph
                                    className={'text-red-600 font-bold pt-4'}>{errorMessage}</Paragraph> : ''}
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
                                <Typography level="title-lg" startDecorator={<GroupsIcon/>}>
                                    Number of passengers
                                </Typography>
                                <Divider inset="none"/>
                                <CardContent>
                                    <FormControl>
                                        <div className={'nh:flex nh:w-full'}>
                                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                <Grid item xs={6}>
                                                    <Label className={'font-bold'}>Adult</Label>
                                                    <div className={'flex'}>
                                                        <button className={'w-fit pl-2'}
                                                                onClick={() => handleClickCount('decrease', 'adultCount')}>
                                                            <RemoveCircleIcon/></button>
                                                        <InputCustom data={adultCount} value={adultCount}
                                                                     id={adultCount} name={'number'} type={'number'}
                                                                     sx={{outline: 'none'}}/>
                                                        <button className={'w-fit pr-2'}
                                                                onClick={() => handleClickCount('increase', 'adultCount')}>
                                                            <AddCircleIcon/></button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Label className={'font-bold'}>Child</Label>
                                                    <div className={'flex'}>
                                                        <button className={'w-fit pl-2'}
                                                                onClick={() => handleClickCount('decrease', 'childCount')}>
                                                            <RemoveCircleIcon/></button>
                                                        <InputCustom data={childCount} value={childCount}
                                                                     id={childCount} type={'number'} name={'number'}
                                                                     sx={{outline: 'none', paddingX: '4px'}}/>
                                                        <button className={'w-fit pr-2'}
                                                                onClick={() => handleClickCount('increase', 'childCount')}>
                                                            <AddCircleIcon/></button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                <Grid item xs={6}>
                                                    <Label className={'font-bold'}>Toddler</Label>
                                                    <div className={'flex justify-center items-center text-center'}>
                                                        <button className={'w-fit pl-2'}
                                                                onClick={() => handleClickCount('decrease', 'toddlerCount')}>
                                                            <RemoveCircleIcon/></button>
                                                        <InputCustom
                                                            id={toddlerCount}
                                                            type={'number'}
                                                            name={'number'}
                                                            value={toddlerCount}
                                                            data={toddlerCount}
                                                            sx={{outline: 'none', textAlign: 'center!important'}}
                                                        />
                                                        <button className={'w-fit pr-2'}
                                                                onClick={() => handleClickCount('increase', 'toddlerCount')}>
                                                            <AddCircleIcon/></button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Label className={'font-bold'}>Infant</Label>
                                                    <div className={'flex'}>
                                                        <button className={'w-fit pl-2'}
                                                                onClick={() => handleClickCount('decrease', 'infrantCout')}>
                                                            <RemoveCircleIcon/></button>
                                                        <InputCustom sx={{outline: 'none'}} id={'infrantCout'}
                                                                     value={infrantCout} data={infrantCout}
                                                                     type={'number'}
                                                                     name={'number'}/>
                                                        <button className={'w-fit pr-2'}
                                                                onClick={() => handleClickCount('increase', 'infrantCout')}>
                                                            <AddCircleIcon/></button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>

                                    </FormControl>
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
                                <Typography level="title-lg" startDecorator={<PermContactCalendarIcon/>}>
                                    Information Passenger
                                </Typography>
                                <Divider inset="none"/>
                                <CardContent sx={{width: '100%'}}>
                                    {[...Array(adultCount)].map((item, index) => (
                                        <FormControl key={item}>
                                            <Label className={'font-bold pb-0'}>Information Adult {index + 1} </Label>
                                            <Input placeholder={'Name'} sx={{outline: 'none', width: '100%'}}
                                                   data={adults[index]?.name}
                                                // id={index}
                                                   value={adults[index]?.name}
                                                   type={"text"}
                                                   onChange={(e) => handleAdultChange('adult',index, "name", e.target.value)}
                                                //
                                            />
                                            <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
                                                   data={adults[index]?.age}
                                                // id={index}
                                                   value={adults[index]?.age}
                                                   type={"number"}
                                                   onChange={(e) => handleAdultChange('adult',index, "age", e.target.value)}
                                                //
                                            />
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                // defaultValue="Men"
                                                name="radio-buttons-group"
                                                value={adults[index]?.sex}
                                                onChange={(e) => handleAdultChange('adult',index, "sex", e.target.value)}
                                            >
                                                <FormControlLabel value="Men" control={<Radio/>} label="Male"/>
                                                <FormControlLabel value="Women" control={<Radio/>} label="Female"/>
                                            </RadioGroup>
                                            <Paragraph
                                                className={'text-red-600 font-bold pt-2'}>{passengerError}</Paragraph>
                                        </FormControl>
                                    ))}
                                    {[...Array(childCount)].map((item, index) => (
                                        <FormControl key={item}>
                                            <Label className={'font-bold pb-0'}>Information
                                                children {index + 1} </Label>
                                            <InputCustom name={'Name'} sx={{outline: 'none', width: '100%'}}/>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="Men"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="Men" control={<Radio/>} label="Male"/>
                                                <FormControlLabel value="Women" control={<Radio/>} label="Female"/>
                                            </RadioGroup>
                                        </FormControl>
                                    ))}
                                    {[...Array(toddlerCount)].map((item, index) => (
                                        <FormControl key={item}>
                                            <Label className={'font-bold pb-0'}>Information toddler {index + 1} </Label>
                                            <InputCustom name={'Name'} sx={{outline: 'none', width: '100%'}}/>
                                            <FormLabel sx={{paddingTop: '12px', fontWeight: 'bold'}}
                                                       id="demo-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="Men"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="Men" control={<Radio/>} label="Female"/>
                                                <FormControlLabel value="Women" control={<Radio/>} label="Male"/>
                                            </RadioGroup>
                                        </FormControl>
                                    ))}
                                    {[...Array(infrantCout)].map((item, index) => (
                                        <FormControl key={item}>
                                            <Label className={'font-bold pb-0'}>Information
                                                Infant {index + 1} </Label>
                                            <InputCustom name={'Name'} sx={{outline: 'none', width: '100%'}}/>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                // defaultValue={gender}
                                                onChange={(e) => handleAdultChange(index, "sex", e.target.value)}
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="Women" control={<Radio/>} label="Female"/>
                                                <FormControlLabel value="Men" control={<Radio/>} label="Male"/>
                                            </RadioGroup>
                                        </FormControl>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                        <CardActions sx={{gridColumn: '1/-1'}}>
                            <Button variant="solid" color="primary" onClick={(e) => handleClick(e.target.value)}>
                                Payment
                            </Button>
                        </CardActions>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
export default Booking
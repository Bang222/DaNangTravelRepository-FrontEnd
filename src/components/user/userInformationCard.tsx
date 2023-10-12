import {FC} from 'react';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {UserDTO} from "@/types";

interface UserInformationCardProps {
    user:UserDTO
}

//bang

const UserInformationCard: FC<UserInformationCardProps> = ({user}) => {
    return (
        <Card
            sx={{width: "100%", display: "flex", justifyContent: "center", paddingY: "24px",backgroundColor: "#A9A9A9", boxShadow: '0 2px 4px 0 black'}}>
            <Box sx={{width: "80%"}}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Avatar
                            alt="Avatar"
                            src={user.profilePicture}
                            sx={{width: 150, height: 150, backgroundColor: "red"}}
                        />
                        <Box sx={{
                            marginLeft: "12px",
                            marginBottom: "12px",
                            marginTop: "12px",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "500"
                        }}>
                            <Typography gutterBottom color={"inherit"} variant="h5" component="div">
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2" color="inherit">
                                Email : {user.email}
                            </Typography>
                            <Typography variant="body2" color="inherit">
                                Phone : {user.phone}
                            </Typography>
                            <Typography variant="body2" color="inherit">
                                Address : {user.address}
                            </Typography>
                        </Box>
                    </Box>
                    <div className={"py-3"}>
                        <div className={'w-full flex justify-center'}>
                            <div className={"lg:w-1/2 sm:w-full"} style={{backgroundColor: 'white', height: '1px'}}></div>
                        </div>
                    </div>
            </Box>
        </Card>
    );
}

export default UserInformationCard;

import {FC, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import Paragraph from "@/components/ui/Paragraph";
import * as React from "react";
import {useSelector} from "react-redux";

interface CommentOfTourProps {
    user: {
        profilePicture:string
        firstName:string;
        lastName: string;
    }
    id:string
    content :string
}

//bang

const CommentOfTour: FC<CommentOfTourProps> = ({...comment}) => {
    return (
        <>
            <CardHeader
                sx={{paddingRight: 0, paddingLeft: 0}}
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} alt={comment.user.firstName}
                            src={comment.user.profilePicture} aria-label="recipe">
                    </Avatar>
                }
            ></CardHeader>
            <div className={'bg-zinc-300 p-2 rounded-[10px]'}>
                <Paragraph
                    className={'font-bold m-0 text-[10px]'}> {comment.user.firstName} {comment.user.lastName} </Paragraph>
                <Paragraph className={'text-[8px]'}> {comment.content}</Paragraph>
            </div>
        </>
    );
}

export default CommentOfTour;
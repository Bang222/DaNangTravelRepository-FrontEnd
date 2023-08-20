import {FC, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import Paragraph from "@/components/ui/Paragraph";
import * as React from "react";
import {useSelector} from "react-redux";

interface CommentOfTourProps {
    user: {
        profilePicture: string
        firstName: string;
        lastName: string;
    }
    id: string
    content: string
}

// ModalComments

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
            <div className={'bg-zinc-300 p-2 rounded-[10px] w-[500px] w-full overflow-auto'}>
                <div>
                    <span
                        className={'font-bold m-0'}> {comment.user.firstName} {comment.user.lastName} </span>
                </div>
                <div className={''}><span className={'text-[13px] nh:text-[18px] break-words'}> {comment.content}</span></div>
            </div>
        </>
    );
}

export default CommentOfTour;
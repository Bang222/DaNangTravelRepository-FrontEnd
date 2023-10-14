'use client'
import React, {FC, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import {useSelector} from "react-redux";
import Paragraph from "@/components/ui/Paragraph";
import FormatDate from "@/components/ui/FormatDate";

interface PageProps {
}

//bang

const Page: FC<PageProps> = ({}) => {
    const user = useSelector((state) => state.auth.value?.user)
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedName, setEditedName] = React.useState<String|undefined>(user.store.name);
    const [editedPayPalId, setEditedPayPalId] = React.useState(user.store.paymentId);
    const handleOnCliclked = () => {
        setIsEditing(!isEditing)
    }
    useEffect(() => {
        document.title = `Profile`
    }, [])
    return (
        <section className={"container mx-auto px-auto h-[84vh]"}>
            <div>
            <button className={ isEditing ? " p-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full": "p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"} onClick={()=> handleOnCliclked()}>
                {isEditing ? "Save" : "Edit"}
            </button>
            </div>
            <div className={"h-[50%]"}>
                <div className={'grid grid-cols-5 h-full gap-4 content-center'}>
                    <div className={'col-span-2'}>
                        <Avatar alt="Remy Sharp" src={user.profilePicture}
                                sx={{width: '200px', height: '200px', backgroundColor: 'red'}}/>
                    </div>
                    <div className={"col-span-1 font-bold flex items-center flex-wrap"}>
                        <div>
                            <Paragraph>Name</Paragraph>
                            <Paragraph>Create</Paragraph>
                            <Paragraph>Email</Paragraph>
                            <Paragraph>PayPalId</Paragraph>
                        </div>
                    </div>
                    <div className={"col-span-2 flex items-center flex-wrap "}>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <Paragraph>
                                    <FormatDate date={user.store.createdAt} />
                                </Paragraph>
                                <Paragraph>{user.email}</Paragraph>
                                <input
                                    type="text"
                                    value={editedPayPalId}
                                    onChange={(e) => setEditedPayPalId(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <Paragraph>{editedName}</Paragraph>
                                <Paragraph>
                                    <FormatDate date={user.store.createdAt} />
                                </Paragraph>
                                <Paragraph>{user.email}</Paragraph>
                                <Paragraph>{editedPayPalId}</Paragraph>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;

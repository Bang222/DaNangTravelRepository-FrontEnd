'use client'
import * as React from 'react';
import {FC} from "react";
import {Card} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableTour from "@/components/seller/table/TableTour";
import ModalCreateTour from "@/components/modal/seller/ModalCreateTour";

interface TourManagerProps {
}

const TourManager: FC<TourManagerProps> = ({}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                resize: 'none',
            }}
        >
            <section className={'w-full'}>
                <div>
                    <ModalCreateTour/>
                </div>
                <div class="flex items-center justify-center">
                    <div class="overflow-scroll">
                        <div class=" w-[89vw] lg:w-[80vw] ">
                            <TableTour/>
                        </div>
                    </div>
                </div>
            </section>
        </Card>
    );
}
// <tr>

// </tr>
// </thead>
// <tbody>

// </tr>

export default TourManager;
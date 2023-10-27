import {FC, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAxios, createUpExperienceVoteAPI} from "@/util/api/apiReuqest";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useRouter} from "next/navigation";

interface UpvoteExperienceProps {
    accessToken:string
    userId:string
    experienceId:string
    experienceUpvote:string[]
    isAuth: boolean
}

//bang

const UpvoteExperience: FC<UpvoteExperienceProps> = ({accessToken,userId,experienceId,experienceUpvote,isAuth}) => {
    const [upvote, setUpvote] = useState<number>(experienceUpvote.length)

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state:RootState) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const router = useRouter()

    const queryClient = useQueryClient()
    const {mutate: mutateUpVote, isLoading: isLoadingUpVote, data: dataUpVote, status, isSuccess} = useMutation(
        async (experienceId: string) => {
            try {
                const res = await createUpExperienceVoteAPI(accessToken, userId, experienceId,axiosJWT)
                return res
            } catch (e:any) {
                throw new Error(e)
            }
        }, {
            onSuccess(dataUpVote) {
                return setUpvote(upvote + dataUpVote.total)
            },
            onError(err:any) {
                toast.error(err)
            }
        }
    )
    const handleSubmitUpvote = (experienceId:string) => {
        isAuth ?  mutateUpVote(experienceId) : router.push("/login")
    };
    return (
        <>
            <span className={'text-[18px]'}>{upvote - 1}</span>
            <IconButton aria-label="add to favorites" sx={{color: 'black', marginRight: '12px'}}>
                {(dataUpVote?.status ? dataUpVote?.status.includes(userId) :
                    experienceUpvote?.includes(userId))
                     ?
                    <Tooltip title="like" placement="top" sx={{color: 'black'}}
                             onClick={() => handleSubmitUpvote(experienceId)}>
                        <FavoriteIcon sx={{color: 'red'}}/>
                    </Tooltip>
                    :
                    <Tooltip title="like" placement="top" sx={{color: 'black'}}
                             onClick={() => handleSubmitUpvote(experienceId)}>
                        <FavoriteIcon/>
                    </Tooltip>
                }
            </IconButton>
        </>

    );
}

export default UpvoteExperience;
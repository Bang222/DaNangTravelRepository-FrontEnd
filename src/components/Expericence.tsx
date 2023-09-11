'use client'
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import LoginIcon from "@mui/icons-material/Login";
import {CircularProgress, Tooltip} from "@mui/material";
import ModalCommentOfTour from "@/components/modal/user/ModalCommentOfTour";
import {useSelector} from "react-redux";
import {
    createCommentPost,
    createUpExperienceVoteAPI,
    getAllFeedsPost, getAllFeedsPostPage,
    getToCartAPI
} from "@/util/api/apiReuqest";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ModalCommentExpericence from "@/components/modal/user/ModalCommentExpericence";
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import {toast} from "react-toastify";
import {useEffect, useRef} from "react";
import {useIntersection} from "@mantine/hooks";
import {userExperience} from "@/types";
import UpvoteExperience from "@/components/user/UpvoteExperience";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export default function Experience() {
    const userId = useSelector((state) => state.auth.value?.user.id)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [expandedItemId, setExpandedItemId] = React.useState(null);

    const toggleContent = (itemId) => {
        setExpandedItemId((prevExpandedItemId) => {
            return prevExpandedItemId === itemId ? null : itemId;
        });
    };
    const [expanded, setExpanded] = React.useState(false);
    const {
        data: dataExperiencePages,
        isLoading: isLoadingExperience,
        isError: isErrorExperience,
        hasNextPage:hasNextPageExperience,
        isFetchingNextPage: isFetchingNextPageExperience,
        fetchNextPage: fetchNextPageExperience,
        error: experienceError
    } = useInfiniteQuery(['experienceExperiencePage', userId],
            async ({pageParam = 1}) => {
                try {
                    const res = await getAllFeedsPostPage(pageParam)
                    return res
                } catch (e) {
                    return e
                }
            },
        {
            getNextPageParam: (data, pages) => {
                if (data.length > 2) {
                    return pages.length + 1;
                } else {
                   return undefined
                }
            },

            cacheTime: 5000,
        }
    );
    const lastExperienceRef = useRef<HTMLElement>(null)
    const {ref, entry} = useIntersection({
        root: lastExperienceRef.current,
        threshold:1
    })
    useEffect(()=>{
        if(entry?.isIntersecting) fetchNextPageExperience()
    },[entry])

    const dataExperience= dataExperiencePages?.pages.flatMap((page) => page)

    React.useEffect(() => {
        if (isErrorExperience) {
            if (experienceError?.status === 429) {
                toast.error('Too many requests. Please wait and try again later.');
            } else {
                toast.error('An error occurred while fetching experiences.');
            }
        }
    }, [experienceError, isErrorExperience])
    const handleExpandClick = (experienceId) => {
        setExpanded(!expanded);
    };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    return isLoadingExperience ? <div>Loading...</div> : (
        <>
            {
                dataExperience?.map((item, index) => {
                    if (index === dataExperience.length - 1) {
                        return <div key={item.id} ref={ref}></div>
                    }
                    const createAt = new Date()
                    const formatCreateAt = createAt.toLocaleDateString('es-uk', options)
                    const words = item?.content
                    const truncated = words?.slice(0, 300);
                    const hasMore = words?.length > 300;
                    const isExpanded = expandedItemId === item.id;
                    return (
                        <Card sx={{maxWidth: '100%', marginY: '24px'}} key={item.id}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe" src={item.user.profilePicture}
                                            alt={'avatar'}>
                                    </Avatar>
                                }

                                action={
                                    userId === item?.userId ?
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                        : ''
                                }
                                title={`${item.user.firstName} ${item.user.lastName}`}
                                subheader={<div>{formatCreateAt} <PublicSharpIcon sx={{fontSize: '14px'}}/></div>}
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.primary">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {isExpanded ? item.content : truncated}
                                    {hasMore && (
                                        <button onClick={() => toggleContent(item.id)}>
                                            {isExpanded ? (
                                                <span className={'text-blue-400'}>Collapse</span>
                                            ) : (
                                                <span>...<span className={'text-blue-400'}>See More</span></span>
                                            )}
                                        </button>
                                    )}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                height="194"
                                image={item.imgUrl}
                                alt={item.user.firstName}
                                sx={{height: '400px', width: '100%'}}
                            />
                            <CardActions>
                                <UpvoteExperience
                                userId={userId}
                                experienceId={item.id}
                                 accessToken={accessToken}
                                experienceUpvote={item.upVote}/>
                                <Typography sx={{display: 'flex', alignItems: 'center'}}>
                                    <span className={'text-[18px]'}>{item.comments.length}</span>
                                    <Tooltip title="comment" placement="top" sx={{color: 'black', cursor: 'pointer'}}>
                                        <ModalCommentExpericence
                                            comments={item.comments} experienceId={item.id}/>
                                    </Tooltip>
                                </Typography>
                            </CardActions>
                        </Card>
                    )
                })}
            <button onClick={()=> fetchNextPageExperience()} disabled={isFetchingNextPageExperience} className={'flex justify-center w-full'}>
              {isFetchingNextPageExperience ? (
                  <CircularProgress color="secondary" />
              ) : (
                 hasNextPageExperience ? 'load more' : 'No More Data'
              )}
          </button>
        </>
    );

}
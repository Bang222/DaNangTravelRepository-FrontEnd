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
import {Tooltip} from "@mui/material";
import ModalCommentOfTour from "@/components/modal/user/ModalCommentOfTour";
import {useSelector} from "react-redux";
import {
    createCommentPost,
    createUpExperienceVoteAPI,
    createUpVoteAPI,
    getAllFeedsPost,
    getToCartAPI
} from "@/util/api/apiReuqest";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ModalCommentExpericence from "@/components/modal/user/ModalCommentExpericence";
import {toast} from "react-toastify";


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
    const user = useSelector((state) => state.auth.value?.user)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [isUpvoting, setIsUpvoting] = React.useState(false);
    const [cooldown, setCooldown] = React.useState(false);
    // const[upvoteEx,setUpVoteEx] = React.useState()
    const [expanded, setExpanded] = React.useState(false);
    const queryClient = useQueryClient()
    const {
        data: dataExperience,
        isLoading: isLoadingExperience,
        isError: isErrorExperience,
        isSuccess: isSuccessExperience
    } = useQuery(['experienceExperience', userId], () =>
        getAllFeedsPost()
    );
    const {mutate: mutateUpVote, isLoading: isLoadingUpVote,data:dataUpVote, status, isSuccess} = useMutation(
        async (experienceId:string) => {
            try {
                const res = await createUpExperienceVoteAPI(accessToken, userId, experienceId)
                return res
            } catch(e){
                throw new Error(e)
            }
        },{
            onSuccess(dataUpVote){
                queryClient.invalidateQueries(['experienceExperience', userId]);
                setIsUpvoting(false);
                setCooldown(true);
                setTimeout(() => {
                    setCooldown(false);
                }, 1000);
            },
            onError(err){
                toast.error(err)
            }
        }

    )

    const handleExpandClick = (experienceId) => {
        setExpanded(!expanded);
    };
    const handleSubmitUpvote = (experienceId) => {
        if (!isUpvoting && !cooldown) {
            setIsUpvoting(true);
            mutateUpVote(experienceId);
        }
        mutateUpVote(experienceId)
    };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    return isLoadingExperience ? <div>Loading...</div> : (
        <>
            {dataExperience?.map((item, index) => {
                const createAt = new Date()
                const formatCreateAt = createAt.toLocaleDateString('es-uk', options)
                return (
                    <Card sx={{maxWidth: '100%', marginY: '24px'}} key={item.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe" src={item.user.profilePicture}>
                                </Avatar>
                            }

                            action={
                                userId === item.userId ?
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                    : ''
                            }
                            title={`${item.user.firstName} ${item.user.lastName}`}
                            subheader={formatCreateAt}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.content}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.imgUrl}
                            alt={item.user.firstName}
                        />
                        <CardActions>
                            <span className={'text-[18px]'}>{item.upVote.length - 1}</span>
                            <IconButton aria-label="add to favorites" sx={{color: 'black', marginRight: '12px'}}>
                                {item.upVote.includes(userId) ?
                                    <Tooltip title="like" placement="top" sx={{color: 'black'}} onClick={()=>handleSubmitUpvote(item.id)}>
                                        <FavoriteIcon sx={{color: 'red'}}/>
                                    </Tooltip>
                                    :
                                    <Tooltip title="like" placement="top" sx={{color: 'black'}} onClick={()=>handleSubmitUpvote(item.id)}>
                                        <FavoriteIcon/>
                                    </Tooltip>
                                }
                            </IconButton>
                            <Typography sx={{display: 'flex', alignItems:'center'}}>
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
        </>
    );

}
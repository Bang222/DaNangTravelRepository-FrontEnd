'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LargeHeading from "@/components/ui/LargeHeading";
import LineCustom from "@/components/ui/LineCustom";
import {Card, CardHeader, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";
import {useDispatch, useSelector} from "react-redux";
import {userDTO} from "@/types";
import {useFormik} from "formik";
import * as Yup from "yup";
import Paragraph from "@/components/ui/Paragraph";
import CloseIcon from '@mui/icons-material/Close';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAxios, createExperience} from "@/util/api/apiReuqest";
import {toast} from "react-toastify";
import {AppDispatch} from "@/redux/store";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100vw', lg: '500px'},
    height: '90vh',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    overflow: 'auto',
    p: 2,
};

const CreateExperience: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const user = useSelector<userDTO>((state) => state.auth.value?.user)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const queryClient = useQueryClient()

    const [previewImage, setPreviewImage] = React.useState<>()
    const {mutate: mutateCreateTour, isLoading: isLoadingCreateTour} = useMutation(
        async (data: any) => {
            try {
                const res = await createExperience(accessToken, userId, data ,axiosJWT )
            } catch (e) {
                throw new Error(e)
            }
        }, {
            onSuccess() {
                handleClose();
                queryClient.invalidateQueries(['experienceExperiencePage', userId]);
                toast.success('OKEE')
                formik.resetForm();
                setPreviewImage(null)

            },
            onError(e) {
                toast.error(e)
            }
        }
    )

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            file: "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, "Maximum 20 characters")
                .min(6, "Minimum 6 characters")
                .required("Please Input title"),
            content: Yup.string()
                .required("Please Input content"),
            file: Yup.mixed().required("Please upload a Image")
        }),
        onSubmit: async (values) => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('file', values.file);
            mutateCreateTour(formData)
        },
    });


    return (
        <Card sx={{borderRadius:'23px', marginBottom:'48px'}}>
            <div className={'pt-5'}>
                <div className={''}>
                    <span className={'ml-2 p-1 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-700'} onClick={handleOpen}>
                    Share Experience
                </span>
                </div>
                <div className={'mt-2'}>
                    <div className={'w-full flex justify-center'}>
                        <div style={{backgroundColor: '#ccc', width:`100%`, height: '1px'}}></div>
                    </div>
                </div>
                <div className={'text-center shadow-lg'}>
                    <Button onClick={handleOpen}
                            sx={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize:'12px',
                                opacity:'0.7',
                            }}
                    >
                        Share your travel experience</Button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{borderRadius: '10px'}}
            >
                <Box sx={style}>
                    <section>
                        <div className={'flex justify-between items-center mb-3'}>
                            <div></div>
                            <div>
                                <LargeHeading size={'xs'}>Experience</LargeHeading>
                            </div>
                            <div onClick={handleClose} className={'cursor-pointer'}><CloseIcon
                                sx={{color: '#ccc', '&:hover': {color: 'black'}}}/></div>
                        </div>
                        <LineCustom size={'100%'}/>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: red[500]}} src={user.profilePicture} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <PublicSharpIcon/>
                                </IconButton>
                            }
                            title={`${user.firstName} ${user.lastName}`}
                            sx={{marginBottom: '12px', paddingX: '0'}}
                        />
                        <form onSubmit={formik.handleSubmit} className={'w-full'}>
                            <div className={'mb-4'}>
                                <label htmlFor="file" className="block h-300px w-full cursor-pointer">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {previewImage ? <img
                                            className={'h-[52vh] w-full object-cover'}
                                            src={previewImage}
                                            alt={'image'}/>

                                        :
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={'https://static.hahalolo.com/common/defaults/noThumbImage.svg?_v=1306113061'}
                                            alt={'image'}
                                            className={"w-full"}
                                        />
                                    }

                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept="image/*"
                                    hidden
                                    onChange={event => {
                                        formik.setFieldValue("file", event.target.files[0]);
                                        setPreviewImage(URL.createObjectURL(event.target.files[0]));
                                    }}
                                />
                                <Paragraph size={'sx'} status={'error'}>{formik.errors.file}</Paragraph>
                            </div>
                            <div className={'mb-6'}>
                                <div className={'flex items-center'}>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder={'Title Experience'}
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        className={'border-solid border-1 border-gray-300 rounded-md w-full focus:border-blue-500 focus:outline-none'}
                                    />
                                </div>
                                <div className={'w-full flex justify-center mt-1'}>
                                    <div style={{backgroundColor: '#A9A9A9', width: `100%`, height: '1px'}}></div>
                                </div>
                                {formik.touched.title && formik.errors.title && (
                                    <Paragraph size={'sx'} status={'error'}>{formik.errors.title}</Paragraph>
                                )}
                            </div>
                            <div>
                                <div className={'flex items-center'}>
                                    <textarea
                                        id="content"
                                        name="content"
                                        placeholder={'Share your experience with your friends'}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        className={'resize-none h-[30px] w-full rounded-md border-solid border-1 border-gray-300 focus:border-blue-500 focus:outline-none'}
                                    />
                                </div>
                                {formik.touched.content && formik.errors.content && (
                                    <Paragraph size={'sx'} status={'error'}>{formik.errors.content}</Paragraph>
                                )}
                            </div>
                            {isLoadingCreateTour ?
                                <div className={'mb-5 mt-6 flex justify-center w-full items-center'}>
                                    <CircularProgress color="secondary"/>
                                </div>
                                : <button className={'mb-5 mt-6 w-full text-center bg-blue-600 rounded-full text-white'}
                                          type="submit">Submit</button>

                            }
                        </form>
                    </section>
                </Box>
            </Modal>
        </Card>
    );
}
export default CreateExperience

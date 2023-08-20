import {FC, useEffect} from 'react';
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import Paragraph from "@/components/ui/Paragraph";
import LineCustom from "@/components/ui/LineCustom";
import {CreateStoreDTO, informationStoreDTO} from "@/types/seller";
import {useMutation} from "@tanstack/react-query";
import {createStoreAPI} from "@/util/api/apiReuqest";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";
import PolicyCreateStore from "@/components/seller/PolicyCreateStore";
import {toast} from "react-toastify";

interface ModalCreateStoreProps {
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', md: '400px', lg: '600px'},
    bgcolor: '#ccc',
    border: '2px solid #000',
    boxShadow: 24,
    opacity: 0.8,
    p: 4,
};
const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
};

const ModalCreateStore: FC<ModalCreateStoreProps> = ({}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const user = useSelector((state) => state.auth.value?.user)
    const router = useRouter()

    const userId = useSelector((state) => state.auth.value?.user.id)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const [dataStore, setDataStore] = React.useState<informationStoreDTO>()
    const [errorData, setErrorData] = React.useState<string>('')
    const {
        mutate: mutateCreateStore,
        isLoading: isLoadingCreate,
        status,
        isSuccess,
        data: dataCreateStore
    } = useMutation(
        async (createStore: CreateStoreDTO) => {
            try {
                const res = await createStoreAPI(createStore, accessToken, userId)
                return res;
            } catch (error) {
                throw error;
            }
        }, {
            onSuccess: () => {
                toast.success('Please Login Again')
                setDataStore(dataCreateStore)
            },
            onError: (error) => {
                setErrorData('Can not Create Please Try to Another Account')
            },
        });

    const formik = useFormik({
        initialValues: {
            name: "",
            slogan: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, "Maximum 50 characters")
                .min(6, "Minimum 6 characters")
                .required("Please Input Name Store"),
            slogan: Yup.string()
                .required("Please Input Slogan")
            // .matches(
            //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,19}$/,
            //     "Minimum 6 characters, at least one letter, one number, one special character"
            // ),
        }),
        onSubmit: (values) => {
            const createStore = {
                name: values.name,
                slogan: values.slogan,
            };
            mutateCreateStore(createStore)
        },
    });
    useEffect(() => {
        if (isSuccess) {
            router.push('/login')
        }
    }, [isSuccess])
    return (
        <div>
            <button className=" mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-fit rounded-full" onClick={handleOpen}>Create Store</button>
            <Modal
                sx={{left: '5%', right: '5%'}}
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {isLoadingCreate  ? <div style={overlayStyle}>
                        <div className={'flex justify-center items-center h-full'}>
                            <CircularProgress color="secondary"/>
                        </div>
                    </div> : ''}
                    <Typography id="modal-modal-title" sx={{fontWeight: 'bold', textAlign: 'center'}} variant="h6"
                                component="h2">
                        Create a business account
                    </Typography>
                    <LineCustom size={'100%'}/>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form className={'pb-5'} onSubmit={formik.handleSubmit}>
                            <label className={'font-bold text-black'}>Name Store</label>
                            <div className="pt-[8px] pb-[24px] text-black">
                                <input type='text'
                                       placeholder='name'
                                       name='name'
                                       id="name"
                                       className={'w-full h-[36px] px-3 rounded-[4px] border-solid border-1 border-gray-400 focus:border-blue-500'}
                                       required
                                       value={formik.values.name}
                                       onChange={formik.handleChange}
                                />
                                <Paragraph status={'error'}>{formik.errors.name}</Paragraph>
                            </div>
                            <label className={'font-bold text-black'}>Slogan</label>
                            <div className="pt-[8px] pb-[24px] text-black">
                                <input type='text'
                                       placeholder='slogan'
                                       name='slogan'
                                       id="slogan"
                                       className={'w-full h-[36px] px-3 rounded-[4px] border-solid border-1 border-gray-400 focus:border-blue-500'}
                                       required
                                       value={formik.values.slogan}
                                       onChange={formik.handleChange}
                                />
                                <Paragraph status={'error'}>{formik.errors.slogan}</Paragraph>
                            </div>
                            <PolicyCreateStore handleSubmit={formik.handleSubmit} formErrors={formik.errors} />

                            {/*<button*/}
                            {/*    className="max-md:text-[15px] submit-button text-[18px] font-medium bg-sky-500 rounded-xl flex justify-center shadow-md cursor-pointer p-1 pt-[5px] pb-[5px] w-full"*/}
                            {/*    type={"submit"}*/}
                            {/*>*/}
                            {/*    Register Store*/}
                            {/*</button>*/}
                            {errorData ? <Paragraph status={'error'}>{errorData}</Paragraph> : ''}
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalCreateStore;
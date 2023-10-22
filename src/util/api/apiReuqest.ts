import {
    BookingDTO, CartDTO,
    CommentsDTO, createExperienceCommentDTO,
    LoginDTO,
    RegisterDTO, SendBackEndDTO,
    TourDetailInterface,
    TourIdEndToken,
    UserDTO, userExperience,
    UserRequestDTO,
    voteDTO
} from "@/types";
import {endPointAPI} from "../../../constants";
import {TourDTO} from "@/types/tourDTO";
import {useQuery} from "@tanstack/react-query";
import {getCookie, setCookie} from "@/util/api/cookies";
import {
    BillDTO,
    BillTotalPagesDTO,
    CreateStoreDTO, DataDashBoardDTO, DataDashBoardEachMonthDTO,
    dataTourOfStore,
    informationStoreDTO, orderHistoryUser,
    TourOfStore
} from "@/types/seller";
// import {createAxios} from '@/createInstance'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {logIn, logOut} from "@/redux/feature/auth-slice";
import {toast} from "react-toastify";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";

export const refreshToken = async (data: { token: any; user?: any; }) => {
    try {
        const refreshToken = data?.token?.refresh
        const userId = data.user?.id
        const res = await axios.post('http://localhost:4000/api/refresh-token', {}, {
            headers: {
                "x-client-id": userId,
                " x-client-rf": refreshToken,
            }
        })
        return res.data;
    } catch (err) {
        throw new Error("Token refresh failed"); // Handle this error appropriately
    }
}
export const createAxios = (dataRedux: { token: { access: string; }; }, dispatch: Dispatch<AnyAction>) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            const current = new Date();
            const decodedToken = jwt_decode(dataRedux?.token.access);
            // @ts-ignore
            if (decodedToken.exp < current.getTime() / 1000) {
                try {
                    console.log("Axios",decodedToken)
                    const data = await refreshToken(dataRedux);
                    config.headers["Authorization"] = "Bearer " + data.token.access;
                    config.headers["x-client-id"] = data.user.id;
                    dispatch(logIn(data))
                    setCookie('token',data.token.access)
                } catch (error) {
                    dispatch(logOut)
                }
            }
            return config;
        },
        (err) => {
            dispatch(logOut());
            return Promise.reject(err);
        }
    );

    return newInstance;
};
////////////////////////////////////
export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', loginDTO)
        const data = res.data;
        return data
    } catch (err) {
        // @ts-ignore
        return err;
    }
}
export const RegisterApi = async (registerDTO: RegisterDTO) => {
    try {
        const res =  await axios.post('http://localhost:4000/api/auth/register', registerDTO)
        const data =res.data
        return data
    } catch (e) {
        throw new Error('Email Registered')
    }
}
export const GetAllTourApi = async (currentPage:number,name?:string,start?:string,minPrice?:number,maxPrice?:number,startDay?:Date,endDate?:Date) => {
    // @ts-ignore
    const queryParams = new URLSearchParams({
        name: name || '',
        start: start || '',
        min: Number(minPrice) || 1  ,
        max: Number(maxPrice) || 999999999,
        'start-day': startDay ? startDay : '',
        'end-day': endDate ? endDate : '',
    });
    try {
        const res = await axios.get(
            `http://localhost:4000/api/tour/page=${currentPage}/search=?${queryParams}`
        )
        return res.data as TourDTO[]
    } catch (e) {
        throw e
    }
}
export const upVoteTourApi = async (tourId: string, accessToken: string, axiosJWT: any,userIdRedux:string) => {
    try {
        const userId = localStorage.getItem('userId') ?? userIdRedux;
        const res = await axiosJWT.post('http://localhost:4000/api/tour/upvote', {tourId: tourId}, {
            headers: {
                "Authorization": `bearer ${getCookie('token') ? getCookie('token') : accessToken}`,
                "x-client-id": userId
            }
        })
        const data = res.data;
        return data as voteDTO
    } catch (err) {
       throw err
    }
}
export const getCommentsOfTour = async (tourId: string, axiosJWT: any) => {
    try {
        const res = await axiosJWT.post('http://localhost:4000/api/tour/comments', {tourId: tourId})
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const postCommentsOfTour = async (commentDTO: CommentsDTO, userIdStore: string, accessToken: string,axiosJWT:any) => {
    try {
        const userId = localStorage.getItem('userId');
        const token = getCookie('token') ? getCookie('token') : accessToken
        const res = await axiosJWT.post('http://localhost:4000/api/tour/create/comment', commentDTO, {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const useGetWeather = () => {
    try {
        return useQuery({
            queryKey: ['weather'],
            queryFn: async () => {
                const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=DaNang&units=metric&APPID=05e07e9af78ffd8691289b6165e7423a')
                return data.data
            },
            cacheTime: 1000
        })
    } catch (err) {
        console.log('sorry Weather Data not found');
    }
}
export const getTourById = async (tourIdEndToken: TourIdEndToken,axiosJWT:any) => {
    try {
        const userId = localStorage.getItem('userId');
        const res = await axiosJWT.post('http://localhost:4000/api/tour-by-id', {tourId: tourIdEndToken.tourId}, {
            headers: {
                Authorization: `Bearer ${tourIdEndToken.token}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as TourDetailInterface
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const bookingAPI = async (bookingDTO: BookingDTO, accessToken: string, userId: string, tourId: string, axiosJWT: any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/booking/${tourId}`, bookingDTO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as TourDetailInterface
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}

export const createStoreAPI = async (createStoreDTO: CreateStoreDTO, accessToken: string, userId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/store/create`, createStoreDTO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as informationStoreDTO
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const addToCartAPI = async (tourId: string, accessToken: string, userId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/cart`, {tourId: tourId}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as CartDTO
    } catch (err) {
        throw new Error('sorry can not found cart');
    }
}
export const getToCartAPI = async (accessToken: string, userId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/get-cart`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as CartDTO[]
    } catch (err) {
        throw new Error('sorry can not found cart');
    }
}
export const deleteOneValueCartByTourIdOfUserIdAPI = async (tourId: string, accessToken: string, userId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/delete-cart-by-id`, {tourId: tourId}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as CartDTO
    } catch (err) {
        throw new Error('sorry can not found cart');
    }
}
export const deleteAllValueCartAPI = async (accessToken: string, userId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/delete-all-cart`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Tour is null');
    }
}
export const getTourOfStore = async (accessToken: string ,userId: string ,axiosJWT: any,page:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/store/list-tour/page=${page}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as dataTourOfStore
    } catch (err) {
        throw new Error('Error');
    }
}
export const createTourAPI = async (accessToken: string, userId: string, formData: any,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/tour/create`,
            formData
            , {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}
export const updateTourAPI = async (accessToken: string, userId: string, formData: any,axiosJWT:any,tourId:string) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/tour/update/${tourId}`,
            formData
            , {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}

export const deleteTourAPI = async (accessToken: string, userId: string, tourId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/tour/delete`,
            {tourId: tourId}
            , {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}
export const getAllFeedsPost = async () => {
    try {
        // const axios = createAxios()
        const res = await axios.get(`http://localhost:4000/api/experience/all`)
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as userExperience[]
    } catch (err) {
        throw new Error('Error');
    }
}
export const getAllFeedsPostPage = async (currentPage: number,title?:string)=> {
    try {

        const res = await axios.get(`http://localhost:4000/api/experience/page=${currentPage}/search=?title=${title ? title :''}`)
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as userExperience[]
    } catch (err) {
        throw new Error('Error');
    }
}
export const createCommentPost = async (accessToken: string, userId: string, experienceId: string, content: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/experience/create/comment`, {
                experienceId: experienceId,
                content: content
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            }
        )
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as createExperienceCommentDTO
    } catch (err) {
        throw new Error('Error');
    }
}
export const getBillOfStore = async (axiosJWT:any,accessToken:string,userId:string,page:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/store/bill/page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            }
        )
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as BillTotalPagesDTO
    } catch (err) {
        throw new Error('Error');
    }
}
export const createUpExperienceVoteAPI = async (accessToken: string, userId: string, experienceId: string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/experience/upvote`, {
                experienceId: experienceId,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            }
        )
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as voteDTO
    } catch (err) {
        throw new Error('Error');
    }
}
export const createExperience = async (accessToken: string, userId: string,formData:any,axiosJWT:any) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/experience/create`,formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-client-id": userId
                }
            }
        )
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}

export const loginWithGoogle = async (accessToken: string) => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login/google', {accessToken: accessToken})
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}

export const DashboardDataManagerAMonth = async (accessToken: string,userId:string,axiosJWT:any,month:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/store/dash-board/data/month=${month}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as DataDashBoardDTO
    } catch (err) {
        throw new Error('Error');
    }
}

export const userOrderHistory = async (accessToken: string,axiosJWT:any,userId:string) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/user/get-order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as orderHistoryUser[]
    } catch (err) {
        throw new Error('Error');
    }
}

export const DashboardDataManagerEachMonth = async (accessToken: string,userId:string,axiosJWT:any) => {
    try {
        const res = await axiosJWT.get('http://localhost:4000/api/store/data-each-month', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as DataDashBoardEachMonthDTO[]
    } catch (err) {
        throw new Error('Error');
    }
}

export const PaymentAPI = async (sendBackEndDTO:SendBackEndDTO) => {
    try {
        const res = await axios.get('http://localhost:4000/api/payment',
            {headers:{
                    Authorization: `Bearer ${sendBackEndDTO.accessToken}`,
                    "x-client-id": sendBackEndDTO.userId
                }}
        )
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Error');
    }
}

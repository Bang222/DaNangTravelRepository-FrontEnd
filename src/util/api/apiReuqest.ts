import {
    BookingDTO, CartDTO,
    CommentsDTO, createExperienceCommentDTO,
    LoginDTO,
    RegisterDTO,
    TourDetailInterface,
    TourIdEndToken,
    UserDTO, userExperience,
    UserRequestDTO,
    voteDTO
} from "@/types";
import axios from "axios";
import {endPointAPI} from "../../../constants";
import {TourDTO} from "@/types/tourDTO";
import {useQuery} from "@tanstack/react-query";
import {getCookie} from "@/util/api/cookies";
import {CreateStoreDTO, informationStoreDTO, TourOfStore} from "@/types/seller";

export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', loginDTO)
        const data = res.data;
        return data
    } catch (err) {
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
export const GetAllTourApi = async (currentPage:number) => {
    try {
        console.log(currentPage)
        const res = await axios.get(`http://localhost:4000/api/tour/all/page=${currentPage}`)
        return res.data as TourDTO[]
    } catch (e) {
        throw new Error(e)
    }
}
export const upVoteTourApi = async (tourId: string, accessToken: string) => {
    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.post('http://localhost:4000/api/tour/upvote', {tourId: tourId}, {
            headers: {
                Authorization: `bearer ${getCookie('token') ? getCookie('token') : accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not find tour");
        }
        const data = res.data;
        return data as voteDTO
    } catch (err) {
       throw err
    }
}
export const getCommentsOfTour = async (tourId: string) => {
    try {
        const res = await axios.post('http://localhost:4000/api/tour/comments', {tourId: tourId})
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const postCommentsOfTour = async (commentDTO: CommentsDTO, userIdStore: string, accessToken: string) => {
    try {
        const userId = localStorage.getItem('userId');
        const token = getCookie('token') ? getCookie('token') : accessToken
        const res = await axios.post('http://localhost:4000/api/tour/create/comment', commentDTO, {
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
export const getTourById = async (tourIdEndToken: TourIdEndToken) => {
    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.post('http://localhost:4000/api/tour-by-id', {tourId: tourIdEndToken.tourId}, {
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
export const bookingAPI = async (bookingDTO: BookingDTO, accessToken: string, userId: string, tourId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/booking/${tourId}`, bookingDTO, {
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

export const createStoreAPI = async (createStoreDTO: CreateStoreDTO, accessToken: string, userId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/store/create`, createStoreDTO, {
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
export const addToCartAPI = async (tourId: string, accessToken: string, userId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/cart`, {tourId: tourId}, {
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
export const getToCartAPI = async (accessToken: string, userId: string) => {
    try {
        const res = await axios.get(`http://localhost:4000/api/get-cart`, {
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
export const deleteOneValueCartByTourIdOfUserIdAPI = async (tourId: string, accessToken: string, userId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/delete-cart-by-id`, {tourId: tourId}, {
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
export const deleteAllValueCartAPI = async (accessToken: string, userId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/delete-all-cart`, {}, {
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
export const getTourOfStore = async (accessToken: string, userId: string) => {
    try {
        const res = await axios.get(`http://localhost:4000/api/store/list-tour`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as TourOfStore[]
    } catch (err) {
        throw new Error('Error');
    }
}
export const createTourAPI = async (accessToken: string, userId: string, formData: any) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/tour/create`,
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

export const deleteTourAPI = async (accessToken: string, userId: string, tourId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/tour/delete`,
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
export const getAllFeedsPostPage = async (currentPage: number)=> {
    try {
        const res = await axios.get(`http://localhost:4000/api/experience/page=${currentPage}`)
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data as userExperience[]
    } catch (err) {
        throw new Error('Error');
    }
}
export const createCommentPost = async (accessToken: string, userId: string, experienceId: string, content: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/experience/create/comment`, {
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
export const createUpExperienceVoteAPI = async (accessToken: string, userId: string, experienceId: string) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/experience/upvote`, {
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
export const createExperience = async (accessToken: string, userId: string,formData:any) => {
    try {
        const res = await axios.post(`http://localhost:4000/api/experience/create`,formData,
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

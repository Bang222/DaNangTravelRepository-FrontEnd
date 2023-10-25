import {
    dataAllStoreAdminDTO,
    dataEachMonthOfAdmin,
    getAllUserDTO,
    getDataAMonthOfAdmin,
    getProfileAMonthDTO
} from "@/types/admin";

export const adminGetAllStore = async (accessToken: string, axiosJWT: any,userId:string,page:number,month:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/get-all-store/page=${page}/month=${month}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find Store");
        }
        const data = res.data;
        return data as dataAllStoreAdminDTO
    } catch (err) {
        throw err
    }
}
export const adminGetAllUser = async (accessToken: string, axiosJWT: any,userId:string,page:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/get-all-user/page=${page}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find Store");
        }
        const data = res.data;
        return data as getAllUserDTO
    } catch (err) {
        throw err
    }
}

export const banStoreAdmin = async (accessToken: string, axiosJWT: any,userId:string,storeId:string) => {
    try {
        const res = await axiosJWT.put(`http://localhost:4000/api/admin/ban/store-id=${storeId}`,{},{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find Store");
        }
        const data = res.data;
        return data as getAllUserDTO
    } catch (err) {
        throw err
    }
}
export const banUserAdmin = async (accessToken: string, axiosJWT: any,userId:string,userBanId:string) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/ban/user=${userBanId}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error(res.message);
        }
        const data = res.data;
        return data
    } catch (err) {
        throw err
    }
}
export const unBanUserAdmin = async (accessToken: string, axiosJWT: any,userId:string,userBanId:string) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/un-ban/user=${userBanId}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error(res.message);
        }
        const data = res.data;
        return data
    } catch (err) {
        throw err
    }
}
export const getDataProfitAdminAMonth = async (accessToken: string, axiosJWT: any,userId:string,month:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/get-profit-a-month/month=${month}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error(res.message);
        }
        const data = res.data;
        return data as getDataAMonthOfAdmin
    } catch (err) {
        throw err
    }
}
export const getDataProfitAdminEachMonth = async (accessToken: string, axiosJWT: any,userId:string) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/get-profit-each-month`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error(res.message);
        }
        const data = res.data;
        return data as dataEachMonthOfAdmin[]
    } catch (err) {
        throw err
    }
}
export const unBanStoreAdmin = async (accessToken: string, axiosJWT: any,userId:string,storeId:string) => {
    try {
        const res = await axiosJWT.put(`http://localhost:4000/api/admin/un-ban/store-id=${storeId}`,{},{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find Store");
        }
        const data = res.data;
        return data as getAllUserDTO
    } catch (err) {
        throw err
    }
}

export const adminGetProfit = async (accessToken: string, axiosJWT: any,userId:string,page:number,month:number) => {
    try {
        const res = await axiosJWT.get(`http://localhost:4000/api/admin/get-profit-store/page=${page}/month=${month}`,{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find Store");
        }
        const data = res.data;
        return data as getProfileAMonthDTO
    } catch (err) {
        throw err
    }
}
export const adminUpdateProfit = async (accessToken: string, axiosJWT: any,userId:string,storeId:string,month:number) => {
    try {
        const res = await axiosJWT.post(`http://localhost:4000/api/admin/confirm-payment`,{
            storeId:storeId,
            month:month,
        },{
            headers: {
                "Authorization": `bearer ${accessToken}`,
                "x-client-id": userId
            }
        })
        if (res.message) {
            throw new Error("can not find");
        }
        return res.data
    } catch (err) {
        throw err
    }
}

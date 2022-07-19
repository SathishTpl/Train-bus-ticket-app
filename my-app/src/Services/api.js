import axios from "axios"
import { APIs } from "../Configs/apis";
// import { authService } from "./auth";
import { toast } from 'react-toastify';

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(undefined, (err)=> {
    toast.error(err.message);
    return err;
  }
);

export function getAPIConfig(endpoint) {
    return APIs[endpoint];
}

export const makeAPICall = async (options) => {
    console.log("outside",options);
    const { endpoint, body = {}, query = '', pathParam = '' } = options
    const { url, method = false } = getAPIConfig(endpoint)

    const response = await axiosInstance({
        url: `${url}${pathParam ? pathParam : ''}${query ? query : ''}`,
        method,
        ...(method === 'get' ? {} : { data: body }),
        
    })
    return response.data;
} 
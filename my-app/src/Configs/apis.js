
import { API_BASE_URL } from "."
const USER_BASE_URL = `${API_BASE_URL}/user`
const TRAIN_BASE_URL = `${API_BASE_URL}/train`    

const USER_APIS = {
    userLogin: {
        url: `${USER_BASE_URL}/login`,
        method: 'post',
        
    },
    usercreateUser: {
        url: `${USER_BASE_URL}/createUser`,
        method: 'post',
        
    },}
const TRAIN_APIS = {
    trainGetendpoint: {
        url:`${TRAIN_BASE_URL}/getEndPoint`,
        method: 'get',
    },
    trainAvaiableList:{
        url:`${TRAIN_BASE_URL}/getTrains`,
        method: 'post'
    },
    bookTrain:{
        url:`${TRAIN_BASE_URL}/bookTrain`,
        method: 'post'
    },
    getBookingDetails:{
        url:`${TRAIN_BASE_URL}/getBookingDetails`,
        method: 'post'
    },
    cancelTrain:{
        url:`${TRAIN_BASE_URL}/cancelTrain`,
        method: 'post'
    },
}




export const APIs = {
    ...USER_APIS,
    ...TRAIN_APIS,
}
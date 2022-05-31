import { REFRESH, NOTIFICATION, GET_USER_DATA } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' })

export function getUserData(address) {
    return (dispatch) => {
        instance.post('/api/userController/getUserData', { address }).then((res) => {
            dispatch({
                type: GET_USER_DATA,
                data: res.data
            })
        })
    }
};

export function setNotification({ title, detail, type }) {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION,
            data: { title, detail, type }
        })
    }
}

export function updateUser(_id, username, bio, email, site, twitter, instagram, avatar) {
    return (dispatch) => {
        instance.post('/api/userController/updateUser', { _id, username, bio, email, site, twitter, instagram, avatar }).then((res) => {
            if (res.data.success) {
                dispatch({
                    type: NOTIFICATION,
                    data: {
                        title: 'Success',
                        detail: res.data.msg,
                        type: 'success',
                    }
                })
                dispatch({
                    type: REFRESH,
                })
            }
            else {
                dispatch({
                    type: NOTIFICATION,
                    data: {
                        title: 'Failed',
                        detail: res.data.msg,
                        type: 'error',
                    }
                })
            }
        })
    }
}



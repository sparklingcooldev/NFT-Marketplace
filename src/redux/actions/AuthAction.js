import { REFRESH, NOTIFICATION, LOGOUT } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' })

export function login(username, password, address) {
    return (dispatch) => {
        instance.post('/api/authController/login', { username, password, address }).then((res) => {
            if (res.data.success) {
                localStorage.setItem('account', res.data.data.address);
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
};

export function logout() {
    return (dispatch) => {
        localStorage.setItem('account', null);
        dispatch({
            type: LOGOUT,
        })
    }
};

export function register(username, email, password, address) {
    return (dispatch) => {
        instance.post('/api/authController/register', { username, email, password, address }).then((res) => {
            if (res.data.success) {
                dispatch({
                    type: NOTIFICATION,
                    data: {
                        title: 'Success',
                        detail: res.data.msg,
                        type: 'success',
                    }
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
        });
    }
};


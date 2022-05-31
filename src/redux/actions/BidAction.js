import { CREATE_BID, NOTIFICATION, LOAD_BID } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' })

export function acceptBid({
    _mid,
    bidder,
    price,
    _bidid
}) {
    return (dispatch) => {
        instance.post('/api/bidController/acceptbid', {
            _mid,
            bidder,
            price,
            _bidid
        }).then((res) => {
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
            else
                dispatch({
                    type: NOTIFICATION,
                    data: {
                        title: 'Failed',
                        detail: res.data.msg,
                        type: 'error',
                    }
                })
        })
    }
}

export function createBid({
    _mid,
    bidder,
    price,
    type = false
}) {
    return (dispatch) => {
        instance.post('/api/bidController/createBid', {
            _mid,
            bidder,
            price,
        }).then((res) => {
            if (res.data.success) {
                if (type) {
                    instance.post('/api/bidController/acceptbid', {
                        _mid,
                        bidder,
                        price,
                        _bidid: res.data._id
                    }).then((res) => {
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
                        else
                            dispatch({
                                type: NOTIFICATION,
                                data: {
                                    title: 'Failed',
                                    detail: res.data.msg,
                                    type: 'error',
                                }
                            })
                    })
                }
                else
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
        })
    }
}

export function loadBid(_mid) {
    return (dispatch) => {
        instance.post('/api/bidController/loadBid', { _mid }).then((res) => {
            dispatch({
                type: LOAD_BID,
                payload: res.data.data
            })
        });
    }
}


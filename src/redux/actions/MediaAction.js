import { REFRESH, NOTIFICATION, GET_USER_DATA, LOAD_ALL_MEDIA, LOAD_MEDIA } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000' })

export function createMedia({
    title,
    description,
    price,
    media_url,
    metadata_url,
    mimeType,
    creator,
    contentHash,
    metadataHash,
    tokenId,
    chainId
}) {
    return (dispatch) => {
        instance.post('/api/mediaController/create', {
            title,
            description,
            price,
            media_url,
            metadata_url,
            mimeType,
            creator,
            contentHash,
            metadataHash,
            tokenId,
            chainId
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
export function loadAllMedia(chainId, criteria) {
    return (dispatch) => {
        instance.post('/api/mediaController/loadAllMedia', { chainId, criteria }).then((res) => {
            dispatch({
                type: LOAD_ALL_MEDIA,
                payload: res.data.data
            })
        });
    }
};

export function loadMedia(_id) {
    return (dispatch) => {
        instance.post('/api/mediaController/loadMedia', { _id }).then((res) => {
            dispatch({
                type: LOAD_MEDIA,
                payload: res.data.data
            })
        });
    }
}

export function setAsk({
    _mid,
    price
}) {
    return (dispatch) => {
        instance.post('/api/mediaController/setAsk', {
            _mid,
            price
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
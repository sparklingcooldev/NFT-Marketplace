import { LOAD_ALL_MEDIA, LOAD_MEDIA } from '../actions/types';

const initState = {
    medias: null,
    media: null
};

export default function todo(state = initState, action) {

    switch (action.type) {
        case LOAD_ALL_MEDIA:
            return {
                ...state,
                medias: action.payload
            }
        case LOAD_MEDIA:
            return{
                ...state,
                media : action.payload
            }
        default:
            return state
    }
}
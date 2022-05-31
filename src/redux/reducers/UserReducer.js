import { LOGIN, GET_USER_DATA, LOGOUT } from '../actions/types';

const initState = {
    user: null
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                user: action.data
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}
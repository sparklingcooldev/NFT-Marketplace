import { NOTIFICATION, REFRESH } from '../actions/types';

const initState = {
    notification: null,
    refresh: false,
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case NOTIFICATION:
            console.log(action.data);
            return {
                ...state,
                notification: action.data
            }
        case REFRESH: {
            return {
                ...state,
                refresh: !state.refresh
            }
        }
        default:
            return state
    }
}
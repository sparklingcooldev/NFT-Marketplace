import { LOAD_BID } from '../actions/types';

const initState = {
    bids: null
};

export default function todo(state = initState, action) {

    switch (action.type) {
        case LOAD_BID:
            return {
                ...state,
                bids: action.payload
            }
        default:
            return state
    }
}
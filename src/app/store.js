import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../redux/reducers/AuthReducer'
import NotificationReducer from '../redux/reducers/NotificationReducer';
import UserReducer from '../redux/reducers/UserReducer';
import MediaReducer from '../redux/reducers/MediaReducer';
import BidReducer from '../redux/reducers/BidReducer';

export default configureStore({
    reducer: {
        AuthReducer: AuthReducer,
        NotificationReducer: NotificationReducer,
        UserReducer: UserReducer,
        MediaReducer: MediaReducer,
        BidReducer: BidReducer
    }
})
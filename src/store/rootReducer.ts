import { combineReducers } from 'redux';
import directionReducer from '../modules/direction/store/directionSlice';
import mainReducer from '../modules/main/store/mainSlice';

let directions = ['covid19', 'therapy'];

const rootReducer = combineReducers({
    main: mainReducer,
    direction: directionReducer,
});



export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;

import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import messages from "./messages";

export default combineReducers({
    messages,
    form
});

import * as types from '../actions/types'

export default (messages: any = [], action: any) => {
    switch (action.type) {
        case types.GET_MESSAGES:
            return [...messages, action.message];
        case types.POST_MESSAGE:
            return [...messages];
        default:
            return messages;
    }
};

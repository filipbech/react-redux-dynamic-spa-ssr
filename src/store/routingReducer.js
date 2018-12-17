const initialState = {};

export const routingReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PAGE_RESPONDED':
            return {
                ...state,
                loading:false,
                page: action.payload
            }
        case 'PAGE_REQUESTED':
            return {
                ...state, 
                loading:true
            }

        default:
            return state;
    }
};

const initialState = {};

export const navigationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NAVIGATION_RESPONDED':
            return {
                ...state,
                pages: action.payload.categories
            }

        default:
            return state;
    }
};

const initialState = {};

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SETTINGS_RESPONDED':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};

// Action Type Imports
import {SET_SETTINGS} from "../actions/settings-actions";

const initialState = {
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
        fontSize: 17,
    },
    palette : {
        primary: {
            light: '#3f51b5',
            main: '#3f51b5',
            dark: '#3f51b5',
            //contrastText: '#fff',
        },
        secondary: {
            light: '#009688',
            main: '#009688',
            dark: '#009688',
            //contrastText: '#fff',
        },
        type: 'light',
    },

};
// Settings Reducer
export default function settingsReducer(state=initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

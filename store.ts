/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import {configureStore} from '@reduxjs/toolkit';

// Reducer
import layoutReducer from 'slice/layoutSlice';

/* -------------------------------------------------------------------------- */
/*                               Configure store                              */
/* -------------------------------------------------------------------------- */
export const store = configureStore({
    reducer: {
        layout: layoutReducer
    }
});
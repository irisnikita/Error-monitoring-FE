import {createSlice} from '@reduxjs/toolkit';

interface ILayoutState {
    user: Record<string, unknown>
}

const initialState: ILayoutState = {
    user: {}
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user += action.payload;
        }
    }
});

export const {setUser} = layoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: ILayoutState) => state.user;

export default layoutSlice.reducer;
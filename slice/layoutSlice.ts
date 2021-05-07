import {createSlice} from '@reduxjs/toolkit';

interface ILayoutState {
    user: Record<string, unknown>,
    emailRegister: String,
    isClickTryFree: Boolean
}

const initialState: ILayoutState = {
    user: {},
    emailRegister: '',
    isClickTryFree: false
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setEmailRegister(state, action) {
            state.emailRegister = action.payload;
        },
        setTryFree(state, action) {
            state.isClickTryFree = action.payload;
        }
    }
});

export const {setUser, setTryFree, setEmailRegister} = layoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: any) => state.layout.user;
export const selectEmailRegister = (state: any) => state.layout.emailRegister;
export const selectTryFree = (state: any) => state.layout.isClickTryFree;

export default layoutSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    theme : 'light',
}

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        toogletheme : (state)=>{
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})

export const { toogletheme } = themeSlice.actions;
export default themeSlice.reducer;
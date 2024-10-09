import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    month: 3,
    nextPage: false,
    prevPage: false,
    perPage: 10,
    dashboard: false,
    search: ''
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            state.page += 1
        },
        prevPage: (state, action) => {
            state.page -= 1
        },
        toggleMonth: (state, action) => {
            state.month = action.payload.month
            state.page = 1
        },
        checkNextPage: (state, action) => {
            state.nextPage = action.payload.nextPage
        },
        checkPrevPage: (state, action) => {
            state.prevPage = action.payload.prevPage
        },
        toggleDashboard: (state, action) => {
            state.dashboard = action.payload.dashboard
        },
        setSearchString: (state, action) => {
            const newSearchString = action.payload.search
            state.search = newSearchString
            state.page = 1
        }
    }
})

export const { nextPage, prevPage, toggleMonth, checkNextPage, checkPrevPage, toggleDashboard, setSearchString } = paginationSlice.actions
export default paginationSlice.reducer

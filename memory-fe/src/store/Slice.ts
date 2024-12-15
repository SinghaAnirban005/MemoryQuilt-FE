import { createSlice } from "@reduxjs/toolkit";

// interface ApplicationInterface {
//     status: boolean,
    
// }

const initialState = {
    status: false,
    userBrains: [],
}

const BrainSlice = createSlice({
    name: "brains",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userBrains = action.payload
        },
        logout: (state) => {
            state.status = false,
            state.userBrains = []
        }, // TODO --> ADD BRAINS reducer
    }
})

export const { login, logout } = BrainSlice.actions
export default BrainSlice.reducer
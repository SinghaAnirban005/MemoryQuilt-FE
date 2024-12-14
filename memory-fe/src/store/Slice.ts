import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

// interface ApplicationInterface {
//     status: boolean,
    
// }

const initialState = {
    status: false,
    userBrains: [{
        tweets: [],
        videos: []
    }],
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
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
        },
        addBrains:(state, action) => {
            if(state.status === true){
                //@ts-ignore
                state.userBrains = [...state.userBrains, action.payload]
            }
        },
        deleteBrains:(state, action) => {
            if(state.status === true){
                state.userBrains = state.userBrains.filter((x: any) => x._id !== action.payload)
            }
        }
    }
})

export const { login, logout, addBrains, deleteBrains } = BrainSlice.actions
export default BrainSlice.reducer
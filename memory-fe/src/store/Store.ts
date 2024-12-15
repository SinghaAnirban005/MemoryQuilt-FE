import { configureStore } from "@reduxjs/toolkit";
import  BrainSlice from "./Slice"

const store = configureStore({
    reducer: BrainSlice
})

export type RootState = ReturnType<typeof store.getState>
export default store
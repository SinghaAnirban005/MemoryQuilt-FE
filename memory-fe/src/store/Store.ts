import { configureStore } from "@reduxjs/toolkit";
import  BrainSlice from "./Slice"

const store = configureStore({
    reducer: BrainSlice
})

export default store
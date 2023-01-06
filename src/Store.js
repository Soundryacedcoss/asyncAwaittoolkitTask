import { configureStore } from "@reduxjs/toolkit";
import dataslice from './Slice/DataSlice'
const store = configureStore({
    reducer:{
        fetchingData:dataslice
    }
})

export default store
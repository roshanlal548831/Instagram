import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState:{
        onlineUser:[]
    },

    reducers:{
        setOnlineUsers:(state,action) =>{
            state.onlineUser = action.payload
        }
    }
});

export const {setOnlineUsers} = chatSlice.actions;
export default chatSlice.reducer
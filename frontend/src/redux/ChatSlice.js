import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState:{
        onlineUser:[],
        message:[]
    },

    reducers:{
        setOnlineUsers:(state,action) =>{
            state.onlineUser = action.payload
        },
        setMessages:(state,action) => {
            state.message = action.payload
        }
    }
});

export const {setOnlineUsers,setMessages} = chatSlice.actions;
export default chatSlice.reducer
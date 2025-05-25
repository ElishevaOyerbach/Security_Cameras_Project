import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    _id:"",
    name:"user",
    role: "user",
    email:"",
}

const UserSlice= createSlice({
    name:"User",
    initialState: initialValue,
    reducers:{
        Create_User:(state,action)=>{
            state._id= action.payload._id
            state.name= action.payload.name
            state.role= action.payload.role
            state.email= action.payload.email
        }
    }
})
export const {Create_User} = UserSlice.actions
export default UserSlice.reducer
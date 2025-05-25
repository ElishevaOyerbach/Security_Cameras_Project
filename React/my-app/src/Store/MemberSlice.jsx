import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    _id:"",
    name:"Member",
    email:"",
    phone:"",
    password:"",
    role: "Member",
    administartorID: "",
    AccessPermissions: [] 
}

const MemberSlice= createSlice({
    name:"Member",
    initialState: initialValue,
    reducers:{
        Create_Member:(state,action)=>{
            state.name= action.payload.name
            state.email= action.payload.email
            state.phone= action.payload.phone
            state.password= action.payload.password
            state.role= action.payload.role
            state.AccessPermissions = action.payload.AccessPermissions;
            state.administartorID= action.payload.administartorID
        }
    }
})
export const {Create_Member} = MemberSlice.actions
export default MemberSlice.reducer
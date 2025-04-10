import { createSlice } from "@reduxjs/toolkit";
const initialValue={
    name:"Administrator",
    email:"",
    phone:"",
    password:"",
    role: "Administrator",
    arrMembers:[],
    arrSecurityCameras:[],
    arrAnalysisSchema:[],
}

const AdministratorSlice= createSlice({
    name:"Administrator",
    initialState: initialValue,
    reducers:{
        Create_Administrator:(state,action)=>{
            state.name= action.payload.name
            state.email= action.payload.email
            state.phone= action.payload.phone
            state.password= action.payload.password
            state.role= action.payload.role
            state.arrMembers= action.payload.arrMembers
            state.arrSecurityCameras= action.payload.arrSecurityCameras
            state.arrAnalysisSchema= action.payload.arrAnalysisSchema
        }
    }
})
export const {Create_Administrator} = AdministratorSlice.actions
export default AdministratorSlice.reducer
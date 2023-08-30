import { Admin } from "../../Models/userType";
import { createSlice } from "@reduxjs/toolkit";
type AdminType = {
    admin:Admin
}
const initialState:AdminType = {
    admin:{
        email:'',
        password:'',
        photoUrl:''
    }
}

const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        registerAdmin:(state, action) =>{
            state.admin = action.payload
        }
    }

})

export const { registerAdmin } = AdminSlice.actions
export default AdminSlice.reducer
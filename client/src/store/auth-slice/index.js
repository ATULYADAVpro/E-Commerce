/*========= IMPORTING ======== */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//------ Create a InitialState
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

// createAsyncThunk
export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData, { withCredentials: true })
        return response.data;
    }
)
//for login
export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true })
        return response.data;
    }
)

//for checkAuth
export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', 
            { withCredentials: true,
                headers:{
                    'Cache-Control':'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
             })
             return response.data;
    }
)

//------- Create Slice ------
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
            // for login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })

            // for checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            }).addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            }).addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
    }

})


//------- Exporting -------
export const { setUser } = authSlice.actions;
export default authSlice.reducer
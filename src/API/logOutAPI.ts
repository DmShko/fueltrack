import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { LogoutArgs } from '../types/authTypes';

// const URL='https://pill-server.onrender.com/api/auth/logout';
const URL='http://localhost:3000/api/auth/logout';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const logOutAPI = createAsyncThunk<any, LogoutArgs,{rejectValue: string}>(
  'logout/logOutAPI', 
  async function (arg, {rejectWithValue}) { 

    const options = {
      headers: {'Authorization':`Bearer ${arg.token}`},
    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.post<string, any>(URL, options)
    .then((res) => {
      // Signed up 
     
      return res;
      // ...
    })
    .catch((error) => {
      if(error.response !== undefined) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      };
      
    });
});

export default logOutAPI
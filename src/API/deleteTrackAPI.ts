import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { DeleteTrackArgs } from '../types/types';

// const URL='https://pill-server.onrender.com/api/auth/logout';
const URL='http://localhost:3000/api/track/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const deleteTrackAPI = createAsyncThunk<any, DeleteTrackArgs,{rejectValue: string}>(
  'deletetrack/DeleteTrackAPIs', 
  async function (arg, {rejectWithValue}) { 
 
    const config = {
      headers: {'Authorization':`Bearer ${arg.token}`},
    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.delete<string, any>(`${URL}?id=${arg.id}`, config)
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

export default deleteTrackAPI;
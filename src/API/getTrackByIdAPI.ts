import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { GetTrackByIdArgs } from '../types/types';

// const URL='https://pill-server.onrender.com/api/auth/logout';
const URL='http://localhost:3000/api/track/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const getTrackByIdAPI = createAsyncThunk<any, GetTrackByIdArgs,{rejectValue: string}>(
  'getTrackById/getTrackByIdAPI', 
  async function (arg, {rejectWithValue}) { 
 
    const options = {

      headers: {'Authorization':`Bearer ${arg.token}`},

    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.get<string, any>(`${URL}?id=${arg.id}`, options)
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

export default getTrackByIdAPI;
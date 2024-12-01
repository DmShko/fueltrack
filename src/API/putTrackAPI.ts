import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { PutTrackArgs } from '../types/types';

const URL='http://localhost:3000/api/track/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const putTrackAPI = createAsyncThunk<any, PutTrackArgs, {rejectValue: string}>(
  'putTracks/putTrackAPI', 
  async function (arg, {rejectWithValue}) {
  
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: arg.data,

    };   

   // axios.post<URL type, response type, config type>
   return await axios.put<string, any>(`${URL}?id=${arg.id}`, config)
    .then((res) => {
     
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default putTrackAPI;
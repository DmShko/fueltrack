import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { GetCollabsByIdArgs } from '../types/types';

// const URL='https://pill-server.onrender.com/api/auth/logout';
const URL='http://localhost:3000/api/collabo';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const getCollabsByIdAPI = createAsyncThunk<any, GetCollabsByIdArgs,{rejectValue: string}>(
  'getCollabsById/getCollabsByIdAPIs', 

  async function (arg, {rejectWithValue}) { 
 
    const options = {

      headers: {'Authorization':`Bearer ${arg.token}`},

    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.get<string, any>(`${URL}/${arg.id}`, options)
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

export default getCollabsByIdAPI;
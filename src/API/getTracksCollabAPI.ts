import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { GetTracksCollabArgs } from '../types/types';

// const URL='https://pill-server.onrender.com/api/auth/logout';
const URL='http://localhost:3000/api/collabo';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const getTracksCollabAPI = createAsyncThunk<any, GetTracksCollabArgs,{rejectValue: string}>(
  'getTrackCollab/getTrackCollabAPIs', 
  async function (arg, {rejectWithValue}) { 
 
    const options = {

      headers: {'Authorization':`Bearer ${arg.token}`,
                'x-owner-id': arg.owner,},
      

    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.get<string, any>(URL, options)
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

export default getTracksCollabAPI;
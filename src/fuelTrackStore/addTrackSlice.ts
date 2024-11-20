import { createSlice } from '@reduxjs/toolkit'

import addTrackAPI  from '../API/addTrackAPI';

// types
import { addTrackInitialState } from '../types/types';

const addTrackSliceInitialState: addTrackInitialState = {

  isLoading: false,
  error: '',
  token: '',
 
};

const addTrackSlice = createSlice({
  name: 'addCourse',
  initialState: addTrackSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addTrackAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(addTrackAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;

        // some actions with 'action'...
      });
            
      builder.addCase(addTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default addTrackSlice.reducer;
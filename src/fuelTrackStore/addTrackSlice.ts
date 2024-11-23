import { createSlice } from '@reduxjs/toolkit'

import addTrackAPI  from '../API/addTrackAPI';

// types
import { addTrackInitialState } from '../types/types';

const addTrackSliceInitialState: addTrackInitialState = {

  isLoading: false,
  error: '',
  isAdd: false
 
};

const addTrackSlice = createSlice({
  name: 'addTracks',
  initialState: addTrackSliceInitialState,

  reducers: {
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addTrackAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
        state.isAdd = false;
      });
            
      builder.addCase(addTrackAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isAdd = true;
        // some actions with 'action'...
      });
            
      builder.addCase(addTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isAdd = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default addTrackSlice.reducer;
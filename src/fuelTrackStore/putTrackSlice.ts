import { createSlice } from '@reduxjs/toolkit'

import patchTrackAPI  from '../API/getTrackAPI';

// types
import { patchTrackInitialState } from '../types/types';

const patchTracksSliceInitialState: patchTrackInitialState = {

  isLoading: false,
  error: '',
 
};

const putTrackSlice = createSlice({
  name: 'patchTrack',
  initialState: patchTracksSliceInitialState,
    reducers: { 
        
    },

  extraReducers:  
    builder => {
      builder.addCase(patchTrackAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(patchTrackAPI.fulfilled, (state) => {

        state.isLoading = false;
        // some actions with 'action'...
      });
            
      builder.addCase(patchTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default putTrackSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

import deleteTrackAPI  from '../API/deleteTrackAPI';

// types
import { deleteTrackInitialState } from '../types/types';

const deleteTrackSliceInitialState: deleteTrackInitialState = {

  isLoading: false,
  error: '',
  isDeleted: false,

};

const deleteTrackSlice = createSlice({
  name: 'deleteTracks',
  initialState: deleteTrackSliceInitialState,

  reducers: {

  },

  extraReducers:  
    builder => {
      builder.addCase(deleteTrackAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
        state.isDeleted = false;
      });
            
      builder.addCase(deleteTrackAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isDeleted = true;
        // some actions with 'action'...
      });
            
      builder.addCase(deleteTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default deleteTrackSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

import deleteCollabAPI  from '../API/deleteCollabAPI';

// types
import { deleteCollabAPIInitialState } from '../types/types';

const deleteTrackSliceInitialState: deleteCollabAPIInitialState = {

  isLoading: false,
  error: '',
  isDeleted: false,

};

const deleteCollabSlice = createSlice({
  name: 'deleteCollab',
  initialState: deleteTrackSliceInitialState,

  reducers: {

  },

  extraReducers:  
    builder => {
      builder.addCase(deleteCollabAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
        state.isDeleted = false;
      });
            
      builder.addCase(deleteCollabAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isDeleted = true;
        // some actions with 'action'...
      });
            
      builder.addCase(deleteCollabAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default deleteCollabSlice.reducer;
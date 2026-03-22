import { createSlice } from '@reduxjs/toolkit'

import deleteCollabAPI  from '../API/deleteCollabAPI';

// types
import { deleteCollabAPIInitialState } from '../types/types';

const deleteTrackSliceInitialState: deleteCollabAPIInitialState = {

  isLoading: false,
  isDeleted: false,
  message: '',
};

const deleteCollabSlice = createSlice({
  name: 'deleteCollab',
  initialState: deleteTrackSliceInitialState,

  reducers: {

  },

  extraReducers:  
    builder => {
      builder.addCase(deleteCollabAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
        state.isDeleted = false;
      });
            
      builder.addCase(deleteCollabAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isDeleted = true;
        state.message = 'Collaborate removed!';
        // some actions with 'action'...
      });
            
      builder.addCase(deleteCollabAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isDeleted = false;
        state.message = action.payload as string;
        
      });
    },
  }
);

export default deleteCollabSlice.reducer;
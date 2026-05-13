import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import deleteTrackAPI  from '../API/deleteTrackAPI';

// types
import { deleteTrackInitialState } from '../types/types';
import { ActionDelTrack } from '../types/authTypes';

const deleteTrackSliceInitialState: deleteTrackInitialState = {

  isLoading: false,
  message: '',
  isDeleted: false,

};

const deleteTrackSlice = createSlice({
  name: 'deleteTracks',
  initialState: deleteTrackSliceInitialState,

  reducers: {

     changeDelTrack(state, action: PayloadAction<ActionDelTrack>) {
          switch(action.payload.operation){
            case 'clearMessage':
                state.message = '';
                break;
            case 'clearIsDel':
                state.isDeleted = false;
                break;
            default: break;
          }
        },

  },

  extraReducers:  
    builder => {
      builder.addCase(deleteTrackAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
        state.isDeleted = false;
      });
            
      builder.addCase(deleteTrackAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isDeleted = true;
        state.message = 'Trak deleted'
        // some actions with 'action'...
      });
            
      builder.addCase(deleteTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isDeleted = false;
        state.message = action.payload as string;
        
      });
    },
  }
);

export const {
  changeDelTrack,
} = deleteTrackSlice.actions;

export default deleteTrackSlice.reducer;
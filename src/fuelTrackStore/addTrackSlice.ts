import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import addTrackAPI  from '../API/addTrackAPI';

// types
import { addTrackInitialState } from '../types/types';
import { ActionAddTrack } from '../types/authTypes';

const addTrackSliceInitialState: addTrackInitialState = {

  isLoading: false,
  isAdd: false,
  message: '',
 
};

const addTrackSlice = createSlice({
  name: 'addTracks',
  initialState: addTrackSliceInitialState,

  reducers: {

    changeTrack(state, action: PayloadAction<ActionAddTrack>) {
          switch(action.payload.operation){
            case 'clearMessage':
                state.message = '';
                break;
            default: break;
          }
        },
    
  },

  extraReducers:  
    builder => {
      builder.addCase(addTrackAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
        state.isAdd = false;
      });
            
      builder.addCase(addTrackAPI.fulfilled, (state) => {

        state.isLoading = false;
        state.isAdd = true;
        state.message = 'Day added!';
        // some actions with 'action'...
      });
            
      builder.addCase(addTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.isAdd = false;
        state.message = action.payload as string;
        
      });
    },
  }
);

export const {
  changeTrack,
} = addTrackSlice.actions;

export default addTrackSlice.reducer;
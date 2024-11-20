import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import getTrackAPI  from '../API/getTrackAPI';

// types
import { getTrackInitialState, ActionTracks, } from '../types/types';

const getTrackSliceInitialState: getTrackInitialState = {

  isLoading: false,
  error: '',
  token: '',
  fuelDays: [],
};

const getTrackSlice = createSlice({
  name: 'getTracks',
  initialState: getTrackSliceInitialState,
    reducers: { 
        
        tracks(state, action: PayloadAction<ActionTracks>) {

            switch (action.payload.mode) {

                // clear all tracks
                case "clearTrack":
                state.fuelDays = [];
                break;
                default:
                break;
            }
        }
    },

  extraReducers:  
    builder => {
      builder.addCase(getTrackAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(getTrackAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;
        state.fuelDays = [...action.payload.data]
        // some actions with 'action'...
      });
            
      builder.addCase(getTrackAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export const {tracks} = getTrackSlice.actions;
export default getTrackSlice.reducer;
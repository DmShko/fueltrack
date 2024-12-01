import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import getTrackAPI  from '../API/getTrackAPI';

// types
import { getTrackInitialState, ActionTracks, PayType} from '../types/types';

const getTrackSliceInitialState: getTrackInitialState = {

  isLoading: false,
  error: '',
  token: '',
  fuelDays: [],
  selectedDay: 
  {
    _id: '',
    liters: '',
    marck: '',
    price: '',
    km: '',
    pay: PayType.company,
    burn: '',
    date: '',
    selected: false,
  }
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
                // clear all tracks
                case "clearSelectedDay":
                  state.selectedDay = {
                    _id: '',
                    liters: '',
                    marck: '',
                    price: '',
                    km: '',
                    pay: PayType.company,
                    burn: '',
                    date: '',
                    selected: false,
                  };
                  break;
                // reset all selected fields
                case "resetSelected":
                state.fuelDays.map(element => element.selected = false);
                break;
                case "selectedTrack":
                // reset all selected
                state.fuelDays.map(element => element.selected = false);

                const  changedTrack = state.fuelDays.find(element =>  element._id === action.payload.data.id);

                state.fuelDays.map(element => 
                  {
                    if(element._id === action.payload.data.id) element.selected = action.payload.data.value;
                      
                  });

                if(changedTrack !== undefined)
                  state.selectedDay = changedTrack;  

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
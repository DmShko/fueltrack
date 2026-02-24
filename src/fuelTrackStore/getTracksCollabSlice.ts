import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import getTracksCollabAPI  from '../API/getTracksCollabAPI';

// types
import { getTracksCollabsInitialState, PayType, ActionCollabsDay } from '../types/types';

const getTracksCollabsSliceInitSt: getTracksCollabsInitialState = {

  isLoading: false,
  error: '',
  fuelCollabDays: [],
  selectedCollabDay: 
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

const getTracksColabsSlice = createSlice({
  name: 'getTracksCollab',
  initialState: getTracksCollabsSliceInitSt,

    reducers: { 
      changeSelectedCollabDay(state, action: PayloadAction<ActionCollabsDay>) {
        switch(action.payload.mode) {
          case 'freshDay':
            state.selectedCollabDay = {...action.payload.data.value}
          break;
          default:
          break;
        }
      }
    },

  extraReducers:  
    builder => {
      builder.addCase(getTracksCollabAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(getTracksCollabAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.fuelCollabDays = [...action.payload.data]
        console.log(action.payload.data)
        // some actions with 'action'...
      });
            
      builder.addCase(getTracksCollabAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
       
        state.error = action.payload as string;
        
      });
    },
  }
);

export const { changeSelectedCollabDay } = getTracksColabsSlice.actions;
export default getTracksColabsSlice.reducer;
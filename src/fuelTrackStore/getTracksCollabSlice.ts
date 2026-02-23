import { createSlice } from '@reduxjs/toolkit'

import getTracksCollabAPI  from '../API/getTracksCollabAPI';

// types
import { getTracksCollabsInitialState, PayType } from '../types/types';

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

export default getTracksColabsSlice.reducer;
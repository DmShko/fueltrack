import { createSlice } from '@reduxjs/toolkit'

import getTrackByIdAPI  from '../API/getTrackByIdAPI';

// types
import { getTrackByIdInitialState, PayType } from '../types/types';

const getTrackByIdSliceInitialState: getTrackByIdInitialState = {

  isLoading: false,
  error: '',
  token: '',
  dayById: {
    _id: '',
    liters: '',
    marck: '',
    price: '',
    km: '',
    pay: PayType.company,
    burn: '',
    date: '',
  },
};

const getTrackByIdSlice = createSlice({
  name: 'getTracksById',
  initialState: getTrackByIdSliceInitialState,
    reducers: { 
        
    },

  extraReducers:  
    builder => {
      builder.addCase(getTrackByIdAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(getTrackByIdAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;
        state.dayById = action.payload.data
        // some actions with 'action'...
      });
            
      builder.addCase(getTrackByIdAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
        
      });
    },
  }
);

export default getTrackByIdSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import getCollabsByIdAPI  from '../API/getCollabsByIdAPI';

// types
import { getCollabsByIdInitialState, ActionCollabs } from '../types/types';

const getCollabsByIdSliceInitialState: getCollabsByIdInitialState = {

  isLoading: false,
  error: '',
  token: '',
  collabsById: [],
};

const getTrackByIdSlice = createSlice({
  name: 'getCollabsById',
  initialState: getCollabsByIdSliceInitialState,
    reducers: { 

      changeSelected(state, action: PayloadAction<ActionCollabs>) {
         switch (action.payload.mode) {
        
                        // clear all selected fields
                        case "clearSelAll":
                       
                           for(const c in state.collabsById) {

                              if (state.collabsById.length != 0) state.collabsById[c].selected = false;
                              
                            }

                        break;
                        case "setSel":

                            const collabsId = state.collabsById.find(element => element._id === action.payload.data.id)

                            for(const c in state.collabsById) {

                              if (state.collabsById[c]._id === collabsId?._id) state.collabsById[c].selected = action.payload.data.value;

                            }

                        break;
                        case "setSelAll":
                       
                          for(const c in state.collabsById) {

                              if (state.collabsById.length != 0) state.collabsById[c].selected = true;
                              
                            }

                        break;
                        default:
                        break;
                    }
      }
    },

  extraReducers:  
    builder => {
      builder.addCase(getCollabsByIdAPI.pending, (state) => {
        state.isLoading = true; state.error = '';
      });
            
      builder.addCase(getCollabsByIdAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;
        state.collabsById = action.payload.data
        // some actions with 'action'...
      });
            
      builder.addCase(getCollabsByIdAPI.rejected, (state, action) => {
                    
        state.isLoading = false;
        state.error = action.payload as string;
      
      });
    },
  }
);

export const {changeSelected} = getTrackByIdSlice.actions;
export default getTrackByIdSlice.reducer;
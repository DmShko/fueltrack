import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

import singInAPI  from '../API/signInAPI';

// types
import { SingInInitialState } from '../types/authTypes';
import { ActionSignIn } from '../types/authTypes';

const singInSliceInitialState: SingInInitialState = {

  company: '',
  isLoading: false,
  isLogIn: false,
  message: '',
  token: '',
  id: '',
  name: '',
};

const singInSlice = createSlice({
  name: 'singIn',
  initialState: singInSliceInitialState,

  reducers: {
    changeSingIn(state, action: PayloadAction<ActionSignIn>) {
      switch(action.payload.operation){
        case 'clearMessage':
            state.message = '';
            break;
        case 'clearToken':
            state.token = '';
            break;
        case 'changeIsLogIn':
            state.isLogIn = (action.payload.data as boolean);
            break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(singInAPI.pending, (state) => {
        state.isLoading = true; state.message = '';
      });
            
      builder.addCase(singInAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.token = action.payload.data.token;
        state.company = action.payload.data.company;
        state.id = action.payload.data.id;
        state.isLogIn = true;
        state.message = 'User is logined';
        state.name = action.payload.data.name;
        // some actions with 'action'...
      });
            
      builder.addCase(singInAPI.rejected, (state, action) => {
          
        state.isLoading = false;

        if(action.payload) {
          state.message = action.payload as string;
        } else {
          state.message = 'The server is not responding. Check your internet connection.';
        };
       
        
      });
    },
  }
);

export const {
  changeSingIn,
} = singInSlice.actions;

export default singInSlice.reducer;
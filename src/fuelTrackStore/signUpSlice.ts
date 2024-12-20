import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import singUpAPI  from '../API/signUpAPI';

// types
import { SingUpInitialState } from '../types/authTypes';
import { ActionSignUp } from '../types/authTypes';

const singUpSliceInitialState: SingUpInitialState = {

  isLoading: false,
  isSignUp: false,
  message: '',
  email:'',
  userName:'',
 
};

const signUpSlice = createSlice({
  name: 'singUp',
  initialState: singUpSliceInitialState,

  reducers: {
    changeSingUp(state, action: PayloadAction<ActionSignUp>) {
      switch(action.payload.operation){
        case 'changeUserName':
          state.userName = action.payload.data;
          break;
        case 'changeUserEmail':
          state.email = action.payload.data;
          break;
        case 'clearMessage':
            state.message = '';
            break;
        default: break;
      }
    },
  },

  extraReducers:  
    builder => {
      builder.addCase(singUpAPI.pending, (state) => {
        state.isLoading = true; state.message = ''; state.isSignUp = false;
      });
            
      builder.addCase(singUpAPI.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSignUp = true;
        state.email = action.payload.data.user.email;
        state.message = 'Account created successfully. Wait for the verification letter';
        // some actions with 'action'...
      });
            
      builder.addCase(singUpAPI.rejected, (state, action) => {
                    
        state.isLoading = false; state.isSignUp = false;
       
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
  changeSingUp
} = signUpSlice.actions;
export default signUpSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// custom types
import {
  TracksInitialState,
  LightModeAction,
  LightModeType,
  LangType,
  LangModeAction,
} from "../types/types";

const TracksInitialState: TracksInitialState = {
  lightMode: LightModeType.light,
  language: LangType.en
};

const trackSlice = createSlice({
  name: "trackStorage",
  initialState: TracksInitialState,
  reducers: {

        changeLightMode(state, action: PayloadAction<LightModeAction>) {
      
          state.lightMode = action.payload.data;
    
        },

        changeLangMode(state, action: PayloadAction<LangModeAction>) {
      
          state.language = action.payload.data;
    
        },
    }
});

export const {changeLightMode, changeLangMode} = trackSlice.actions;
export default trackSlice.reducer;
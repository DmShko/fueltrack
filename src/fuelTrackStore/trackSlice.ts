import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// custom types
import {
  TracksInitialState,
  ActionTracks,
  LightModeAction,
  LightModeType,
  LangType,
  LangModeAction,
} from "../types/types";

const TracksInitialState: TracksInitialState = {
  fuelDays: [],
  lightMode: LightModeType.light,
  language: LangType.en
};

const trackSlice = createSlice({
  name: "trackStorage",
  initialState: TracksInitialState,
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
        },

        changeLightMode(state, action: PayloadAction<LightModeAction>) {
      
          state.lightMode = action.payload.data;
    
        },

        changeLangMode(state, action: PayloadAction<LangModeAction>) {
      
          state.language = action.payload.data;
    
        },
    }
});

export const {tracks, changeLightMode, changeLangMode} = trackSlice.actions;
export default trackSlice.reducer;
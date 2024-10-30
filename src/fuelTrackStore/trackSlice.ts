import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// custom types
import {
  TracksInitialState,
  ActionTracks
} from "../types/types";

const TracksInitialState: TracksInitialState = {
  fuelDays: [],
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
        }
    }
});

export const {tracks,} = trackSlice.actions;
export default trackSlice.reducer;

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer,} from 'redux-persist'
// FLUSH,
// REHYDRATE,
// PAUSE,
// PERSIST,
// PURGE,
// REGISTER, 
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// my reducers
import trackReducer from './trackSlice.ts';
import signUpReducer from './signUpSlice.ts';
import signInReducer from './signInSlice.ts';
import logOutReducer from './logOutSlice.ts';
import reVerifyReducer from './reVerifySlice.ts';
import addTrackReducer from './addTrackSlice.ts';
import getTrackReducer from './getTrackSlice.ts';

const rootReducer = combineReducers({
  
  ser: trackReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  logOut: logOutReducer,
  reVerify: reVerifyReducer,
  addTrack: addTrackReducer,
  getTrack: getTrackReducer,
});

const persistConfig = {
    // 'key' is indeficate of one or more storage
    key: 'root',
    storage,
};

// basic reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    }
);
//{
//ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, ],
//},

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// create own dispatch hook - "usePmDispatch" or add type to each useDispatch

// export const usePmDispatch: () => useDispatch<AppDispatch>();
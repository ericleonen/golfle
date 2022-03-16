import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../features/appSlice';
import playerDataSlice from '../features/playerDataSlice';

export const store = configureStore({
    reducer: {
        playerData: playerDataSlice,
        app: appSlice
    }
});
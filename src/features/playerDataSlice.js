import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlayerData } from './firebase';

const initialState = {
    playerNames: [],
    playerData: {},
};

export const fetchPlayerData = createAsyncThunk('playerData/fetchPlayerData', async () => {
    const playerData = await getPlayerData();
    return playerData;
});

const playerDataSlice = createSlice({
    name: 'playerData',
    initialState,
    extraReducers: {
        [fetchPlayerData.pending]: (state, action) => {
            state.isLoading = true;
            state.failedToLoad = false;
        },
        [fetchPlayerData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.failedToLoad = false;

            state.playerNames = Object.keys(action.payload);
            state.playerData = action.payload;
        },
        [fetchPlayerData.rejected]: (state, action) => {
            state.isLoading = false;
            state.failedToLoad = true;
        }
    }
});

export const selectPlayerData = (name) => {
    return (state) => state.playerData.playerData[name];
}
export const selectPlayerNames = (state) => Object.keys(state.playerData.playerData);

export const selectIsDataReady = (state) => state.playerData.playerNames.length > 0;

export default playerDataSlice.reducer;
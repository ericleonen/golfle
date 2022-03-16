import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isStatsModal: false,
    isHowToPlayModal: false,
    isAnswerModal: false,
    isSilhouetteModal: false,
    guesses: [],
    numGuesses: 1,
    playerAnswer: 'Maverick McNealy',
    gameStatus: 'still playing',
    guessData: {}
};

const setDailyStorage = (guesses, gameStatus) => {
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('gameStatus', gameStatus);
    localStorage.setItem('lastPlayed', new Date());
};

const addGamesPlayed = (didWin) => {
    if (localStorage.hasOwnProperty('gamesPlayed')) {
        localStorage.setItem('gamesPlayed', Number(localStorage.getItem('gamesPlayed')) + 1);
    }
    else {
        localStorage.setItem('gamesPlayed', 1);
    }

    if (didWin) {
        if (localStorage.hasOwnProperty('wins')) {
            localStorage.setItem('wins', Number(localStorage.getItem('wins')) + 1);
        }
        else {
            localStorage.setItem('wins', 1);
        }
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addGuess: (state, action) => {
            if (state.numGuesses <= 8) {
                state.guesses.push(action.payload);
            }

            state.numGuesses += 1;

            if (action.payload === state.playerAnswer) {
                state.isAnswerModal = true;
                state.gameStatus = 'win';

                addGamesPlayed(true);
            }

            else if (state.numGuesses === 9) {
                state.isAnswerModal = true;
                state.gameStatus = 'lose';

                addGamesPlayed(false);
            }

            setDailyStorage(state.guesses, state.gameStatus);
        },
        setDailyData: (state, action) => {
            state.guesses = localStorage.hasOwnProperty('guesses') ? JSON.parse(localStorage.getItem('guesses')) : [];
            state.numGuesses = localStorage.hasOwnProperty('guesses') ? JSON.parse(localStorage.getItem('guesses')).length + 1 : 1;
            state.gameStatus = localStorage.hasOwnProperty('gameStatus') ? localStorage.getItem('gameStatus') : 'still playing';
        },
        toggleModal: (state, action) => {
            state['is' + action.payload + 'Modal'] = !state['is' + action.payload + 'Modal'];
        },
        addGuessData: (state, action) => {
            if (!state.guessData.hasOwnProperty(action.payload.n)) {
                state.guessData[action.payload.n] = {};
            }
            state.guessData[action.payload.n][action.payload.category] = action.payload.value;
        }
    }
});

export const selectGuesses = (state) => state.app.guesses;
export const selectNumGuesses = (state) => state.app.numGuesses;
export const selectPlayerAnswer = (state) => state.playerData.playerData[state.app.playerAnswer];

export const selectIsAnswerModal = (state) => state.app.isAnswerModal;
export const selectIsStatsModal = (state) => state.app.isStatsModal;
export const selectIsHowToPlayModal = (state) => state.app.isHowToPlayModal;
export const selectIsSilhouetteModal = (state) => state.app.isSilhouetteModal;
export const selectGuessData = (state) => state.app.guessData;

export const selectGameStatus = (state) => state.app.gameStatus;

export const { addGuess, toggleModal, setDailyData, addGuessData } = appSlice.actions;

export default appSlice.reducer;
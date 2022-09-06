import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ParseGameState from '../../app/ParseGameState';
import InitialGameState from './InitialGameState';
import GameInfo from '../GameInfo';
import GameState from '../GameState';
import Card from '../Card';

export const nextTurn = createAsyncThunk(
  'game/nextTurn',
  async (params: GameInfo) => {
    const queryURL = `http://localhost/FaBOnline/GetNextTurn3.php?gameName=${params.gameID}&playerID=${params.playerID}`;
    // const queryURL = `https://www.fleshandbloodonline.com/FaBOnline2/GetNextTurn3.php?gameName=${params.gameID}&playerID=${params.playerID}`;
    try {
      const response = await fetch(queryURL, {
        method: 'GET',
        headers: {}
      });
      const data = await response.text();
      const gameState: GameState = ParseGameState(data);
      return gameState;
    } catch (e) {
      console.error(e);
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: InitialGameState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPopUp: (
      state,
      action: PayloadAction<{
        cardNumber: string;
        xCoord?: number;
        yCoord?: number;
      }>
    ) => {
      state.popup = {
        popupOn: true,
        xCoord: action.payload.xCoord,
        yCoord: action.payload.yCoord,
        popupCard: { cardNumber: action.payload.cardNumber }
      };
    },
    clearPopUp: (state) => {
      state.popup = { popupOn: false, popupCard: undefined };
    },
    setPlayCardMessage: (state) => {
      state.playCardMessage = {
        popUpOn: true,
        message: 'Release to play this card'
      };
    },
    clearPlayCardMessage: (state) => {
      state.playCardMessage = { popUpOn: false };
    },
    setCardListFocus: (
      state,
      action: PayloadAction<{
        cardList?: Card[];
        name?: string;
      }>
    ) => {
      state.cardListFocus = {
        active: true,
        cardList: action.payload.cardList,
        name: action.payload.name
      };
    },
    clearCardListFocus: (state) => {
      state.cardListFocus = undefined;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(nextTurn.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        return state;
      }
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
      state.activeCombatChain = action.payload.activeCombatChain;
      state.activeLayers = action.payload.activeLayers;
      state.oldCombatChain = action.payload.oldCombatChain;
      return state;
    });
  }
});

// export const {} = gameSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default gameSlice.reducer;

const { actions } = gameSlice;
export const { setPopUp, clearPopUp, setCardListFocus, clearCardListFocus } =
  actions;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IScreenState {
  name: string;
  spacingTop?: boolean;
  spacingRight?: boolean;
  spacingBottom?: boolean;
  spacingLeft?: boolean;
}

const initialState: IScreenState = {
  name: '',
  spacingTop: false,
  spacingRight: false,
  spacingBottom: false,
  spacingLeft: false
};

const slice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen(state, action: PayloadAction<IScreenState>) {
      state.name = action.payload.name;

      state.spacingTop = action.payload.spacingTop ?? false;
      state.spacingRight = action.payload.spacingRight ?? false;
      state.spacingBottom = action.payload.spacingBottom ?? false;
      state.spacingLeft = action.payload.spacingLeft ?? false;
    }
  }
});

export default slice;

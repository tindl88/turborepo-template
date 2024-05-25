import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IAppState {
  ready: boolean;
  modalProcessing?: string;
}

const slice = createSlice({
  name: 'app',
  initialState: {
    ready: false
  } as IAppState,
  reducers: {
    setAppReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
    setModalProcessing(state, action: PayloadAction<string>) {
      state.modalProcessing = action.payload;
    }
  }
});

export default slice;

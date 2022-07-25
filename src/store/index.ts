import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CardSliceReducer from "./slices/cards";

export const index = configureStore({
  reducer: {
    cards:CardSliceReducer
  },
});

export type AppDispatch = typeof index.dispatch;
export type RootState = ReturnType<typeof index.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

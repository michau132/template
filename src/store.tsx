import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/favourites";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;

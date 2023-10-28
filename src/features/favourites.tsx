import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: [-1] },
  reducers: {
    change_x: (state, action) => {
      const currentIndex = state.value.indexOf(action.payload);
      if (currentIndex === -1) {
        state.value.push(action.payload);
      } else {
        state.value.splice(currentIndex, 1);
      }
    },
  },
});
export const selectCount = (state: RootState) => state.counter.value;
export const { change_x } = counterSlice.actions;
export default counterSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const breadCrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: ["home"],
  reducers: {
    setNavigation: (_state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return action.payload.split("/").filter((item) => item);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNavigation } = breadCrumbSlice.actions;

export default breadCrumbSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import breadCrumbReducer from "./components/breadcrumb/breadCrumbSlice";

export const store = configureStore({
  reducer: {
    breadcrumb: breadCrumbReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

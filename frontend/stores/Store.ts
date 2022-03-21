import { nanoid } from "nanoid";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { ObjectId } from "bson";

const setSession = () => {
  const token = localStorage.getItem("sessionId");
  if (token) return token;
  const id = new ObjectId().toString();
  localStorage.setItem("sessionId", id);
  return id;
};

const AuthAction = createSlice({
  name: "authAction",
  initialState: {
    token: "",
    sessionId: setSession(),
  },
  reducers: {
    setAuthToken: (state, data) => {
      state.token = data.payload;
    },
  },
});

export const AuthStore = configureStore({
  reducer: AuthAction.reducer,
});
const { setAuthToken } = AuthAction.actions;

export const setToken = (token: string) => {
  AuthStore.dispatch(setAuthToken(token));
};

import { createSlice } from "@reduxjs/toolkit";
import { setToken, removeToken } from "@/utils/auth";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    id: 0,
    name: "",
  },
  reducers: {
    handleProfile: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.id = payload.id;
      state.name = payload.name;
      setToken(payload.tokenId);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = 0;
      state.name = "";
      removeToken();
    },
  },
});

const { handleProfile, logout } = userSlice.actions;

const userReducer = userSlice.reducer;

export { handleProfile, logout };
export default userReducer;

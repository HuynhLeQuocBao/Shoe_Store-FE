import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
});

export const persistor = persistStore(store);

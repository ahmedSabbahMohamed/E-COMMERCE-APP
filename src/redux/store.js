import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import storage from "redux-persist-indexeddb-storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { handleLogout } from "../Auth/store";

const baseReducers = combineReducers(reducers);
const encryptionKey = "Auti_Society_M17";
const transforms = [
  encryptTransform({
    secretKey: encryptionKey,
    onError: function (error) {},
  }),
];
const persistedReducer = persistReducer(
  {
    key: "root",
    transforms: transforms,
    storage: storage("AutiSociety"),
  },
  baseReducers
);

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "API_CALL_FAILURE" && action.payload?.status === 403) {
    store.dispatch(handleLogout());
    window.location.pathname = "/login";
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }).concat(authMiddleware);
  },
});

export const persistor = persistStore(store);

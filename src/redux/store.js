import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import storage from "redux-persist-indexeddb-storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    });
  },
});

export const persistor = persistStore(store);
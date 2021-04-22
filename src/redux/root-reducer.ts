import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dataReducer from "./data/data.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const appReducer = combineReducers({
  data: dataReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "DESTROY_SESSION") state = undefined;

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);

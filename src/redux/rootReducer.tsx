import { combineReducers } from "redux";

import charactersSlice from "./charactersData/charactersSlice";
import locationsSlice from "./locationsData/locationsSlice";
import episodesData from "./episodeData/episodesSlice";

export const rootReducer = combineReducers({
  characters: charactersSlice,
  location: locationsSlice,
  episodes: episodesData,
});

export type RootState = ReturnType<typeof rootReducer>;

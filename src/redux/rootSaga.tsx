import { fork } from "redux-saga/effects";
import { charactersSaga } from "./charactersData/saga";
import { episodesSaga } from "./episodeData/saga";
import { locationsSaga } from "./locationsData/saga";

export function* rootSaga() {
  yield fork(charactersSaga);
  yield fork(episodesSaga);
  yield fork(locationsSaga);
}

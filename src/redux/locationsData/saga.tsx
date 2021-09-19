import { call, put, takeLatest, all } from "redux-saga/effects";

import webApi from "../../services/webApi";
import { fetchCharactersError } from "../charactersData/charactersSlice";
import {
  fetchLocations,
  fetchLocationsError,
  fetchLocationsSuccess,
} from "../locationsData/locationsSlice";

type LocationsParams = {
  payload: {
    filter: {
      name: string;
      type: string;
      dimension: string;
    };
    page: number;
  };
};

function* getLocations({ payload }: LocationsParams) {
  try {
    // @ts-ignore
    const { data } = yield call(webApi.locations.getLocations, payload);

    yield put(fetchLocationsSuccess(data));
  } catch (e) {
    yield put(fetchCharactersError(JSON.stringify(e)));
  }
}

export function* locationsSaga() {
  yield all([takeLatest<any>(fetchLocations, getLocations)]);
}

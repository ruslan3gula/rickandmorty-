import { call, put, takeLatest, all } from "redux-saga/effects";

import webApi from "../../services/webApi";
import {
  fetchCharacters,
  fetchCharactersSuccess,
  fetchCharactersError,
} from "../charactersData/charactersSlice";

type CharactersParams = {
  payload: {
    filter: {
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
    };
    page: number;
  };
};

function* getCharacters({ payload }: CharactersParams) {
  try {
    // @ts-ignore
    const { data } = yield call(webApi.characters.getCharacters, payload);

    yield put(fetchCharactersSuccess(data));
  } catch (e) {
    yield put(fetchCharactersError(JSON.stringify(e)));
  }
}

export function* charactersSaga() {
  yield all([takeLatest<any>(fetchCharacters, getCharacters)]);
}

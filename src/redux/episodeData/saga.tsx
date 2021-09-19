import { call, put, takeLatest, all } from "redux-saga/effects";

import webApi from "../../services/webApi";
import {
  fetchEpisodes,
  fetchEpisodesError,
  fetchEpisodesSuccess,
} from "../episodeData/episodesSlice";

type EpisodesParams = {
  payload: {
    filter: {
      name: string;
      episode: string;
    };
    page: number;
  };
};

function* getEpisodes({ payload }: EpisodesParams) {
  try {
    // @ts-ignore
    const { data } = yield call(webApi.episodes.getEpisodes, payload);

    yield put(fetchEpisodesSuccess(data));
  } catch (e) {
    yield put(fetchEpisodesError(JSON.stringify(e)));
  }
}

export function* episodesSaga() {
  yield all([takeLatest<any>(fetchEpisodes, getEpisodes)]);
}

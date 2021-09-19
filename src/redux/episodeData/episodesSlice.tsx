import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
interface IEpisodesData {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: IEpisode[];
}

interface IEpisodesState {
  isLoading: boolean;
  episodesData: IEpisodesData;
  error: string | null;
}

interface IFetchEpisodesParametr {
  page: number;
  name?: string;
}

const initialState: IEpisodesState = {
  isLoading: false,
  episodesData: {
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [],
  },
  error: null,
};

const episodesSlice = createSlice({
  name: "episodesData",
  initialState,
  reducers: {
    fetchEpisodes: (
      state: IEpisodesState,
      action: PayloadAction<IFetchEpisodesParametr>
    ) => {
      state.isLoading = true;
    },
    fetchEpisodesSuccess: (
      state: IEpisodesState,
      action: PayloadAction<IEpisodesData>
    ) => {
      state.isLoading = false;
      state.episodesData = action.payload;
    },
    fetchEpisodesError: (
      state: IEpisodesState,
      action: PayloadAction<string | null>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default episodesSlice.reducer;

export const { fetchEpisodes, fetchEpisodesError, fetchEpisodesSuccess } =
  episodesSlice.actions;

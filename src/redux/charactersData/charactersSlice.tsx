import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };

  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharactersData {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

interface ICharactersState {
  isLoading: boolean;
  charactersData: ICharactersData | null;
  error: string | null;
}

interface IFetchCharactersParametr {
  page: number;
  species?: string;
  status?: string;
  gender?: string;
}

const initialState: ICharactersState = {
  isLoading: false,
  charactersData: null,
  error: null,
};

const charactersSlice = createSlice({
  name: "charactersData",
  initialState,
  reducers: {
    fetchCharacters: (
      state: ICharactersState,
      action: PayloadAction<IFetchCharactersParametr>
    ) => {
      state.isLoading = true;
    },
    fetchCharactersSuccess: (
      state: ICharactersState,
      action: PayloadAction<ICharactersData>
    ) => {
      state.isLoading = false;
      state.charactersData = action.payload;
    },
    fetchCharactersError: (
      state: ICharactersState,
      action: PayloadAction<string | null>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default charactersSlice.reducer;

export const { fetchCharacters, fetchCharactersError, fetchCharactersSuccess } =
  charactersSlice.actions;
